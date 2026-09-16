# One artifact, four entrypoints (ARCHITECTURE.md §4).
#
# `web`, `gateway`, `worker` and `docs-worker` are the same image. Which one a
# pod becomes is `command:` in deploy/helm/<app>/values.yaml -- configuration,
# not a separate build. That is what makes "add a fifth Deployment" a values file
# rather than a pipeline, which is the promise D-54 makes.
#
# Pinned base tag, never :latest. Multi-stage. Non-root. The final stage carries
# no package manager, no compiler and no source it does not run.

# Pin by digest, not just by tag: a tag is mutable, and an image rebuilt from a
# moved tag is not the image CI tested. CI passes the digest it resolved.
ARG NODE_IMAGE=node:24.11.1-alpine3.22
ARG PNPM_VERSION=11.21.0

# ---------------------------------------------------------------- base --------
FROM ${NODE_IMAGE} AS base
ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app

# ---------------------------------------------------------------- deps --------
# Only the manifests, so a source-only change does not re-resolve the graph.
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/web/package.json                 apps/web/
COPY apps/gateway/package.json             apps/gateway/
COPY apps/worker/package.json              apps/worker/
COPY apps/docs-worker/package.json         apps/docs-worker/
COPY packages/config/package.json          packages/config/
COPY packages/contracts/package.json       packages/contracts/
COPY packages/ui/package.json              packages/ui/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --------------------------------------------------------------- build --------
FROM deps AS build
COPY . .
# `next build` is the only build in the repo. The three service shells run
# `node src/main.ts` -- Node 24 strips types natively, and tsconfig.base.json
# sets verbatimModuleSyntax and erasableSyntaxOnly to keep them strippable.
# See 001/requirements.md Notes.
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @ethanel/web build

# ---------------------------------------------------------- deps-prod --------
# A second, production-only resolution. Keeps eslint, vitest, turbo and the
# TypeScript compiler out of the shipped image entirely.
FROM base AS deps-prod
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/gateway/package.json             apps/gateway/
COPY apps/worker/package.json              apps/worker/
COPY apps/docs-worker/package.json         apps/docs-worker/
COPY packages/config/package.json          packages/config/
COPY packages/contracts/package.json       packages/contracts/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod --ignore-scripts \
      --filter @ethanel/gateway... \
      --filter @ethanel/worker... \
      --filter @ethanel/docs-worker...

# -------------------------------------------------------------- runner --------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Fail fast on an unhandled rejection rather than limping on in an unknown
# state. A worker that keeps polling after a failed handler is how a duplicate
# posting gets written.
ENV NODE_OPTIONS=--unhandled-rejections=strict

# uid/gid 1001 matches the securityContext hard-coded in charts/service
# (_deployment.tpl). If these ever disagree, the pod cannot read its own files.
RUN addgroup -g 1001 -S ethanel && adduser -u 1001 -S ethanel -G ethanel

# --- web: Next.js output:'standalone'. Self-contained, including its own
# --- node_modules, which is why it is copied as a unit and resolves before the
# --- root one.
COPY --from=build --chown=1001:1001 /app/apps/web/.next/standalone      ./
COPY --from=build --chown=1001:1001 /app/apps/web/.next/static          ./apps/web/.next/static
COPY --from=build --chown=1001:1001 /app/apps/web/public                ./apps/web/public

# --- gateway / worker / docs-worker: source plus a production-only install.
COPY --from=deps-prod --chown=1001:1001 /app/node_modules               ./node_modules
COPY --from=build     --chown=1001:1001 /app/apps/gateway/src           ./apps/gateway/src
COPY --from=build     --chown=1001:1001 /app/apps/worker/src            ./apps/worker/src
COPY --from=build     --chown=1001:1001 /app/apps/docs-worker/src       ./apps/docs-worker/src
COPY --from=build     --chown=1001:1001 /app/apps/gateway/package.json  ./apps/gateway/
COPY --from=build     --chown=1001:1001 /app/apps/worker/package.json   ./apps/worker/
COPY --from=build     --chown=1001:1001 /app/apps/docs-worker/package.json ./apps/docs-worker/
COPY --from=build     --chown=1001:1001 /app/packages/config            ./packages/config
COPY --from=build     --chown=1001:1001 /app/packages/contracts         ./packages/contracts

USER 1001
EXPOSE 3000

# No HEALTHCHECK. Kubernetes owns liveness and readiness here, via the probes
# charts/service refuses to render without (D-34 gate 1). A second, disagreeing
# health definition baked into the image is a way to be down and healthy at once.

# Overridden per Deployment by `command:` in deploy/helm/<app>/values.yaml.
# The default is web, because that is the only one a human runs by hand.
CMD ["node", "apps/web/server.js"]
