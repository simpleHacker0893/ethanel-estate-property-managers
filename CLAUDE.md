# CLAUDE.md

Claude-specific adapter. **`AGENTS.md` is the canonical instruction file for this
repo — read it first and treat it as authoritative.** Nothing about scope,
vocabulary or engineering rules is duplicated here; if the two ever disagree,
`AGENTS.md` wins.

Do not use this file as a dumping ground for project history or sprint detail.
Status goes in `.docs/STATE.md`, durable choices in `.docs/DECISIONS.md`, sprint
scope in `.docs/sprints/<current>/`.

## Start every session by reading

1. `AGENTS.md`
2. `.docs/STATE.md`
3. `.docs/DECISIONS.md` (including the superseding entries at the bottom)
4. `.docs/DOMAIN.md`
5. `.docs/SERVICE-TOPOLOGY.md`
6. `.docs/sprints/<current>/` — `requirements.md`, `blueprint.md`, `acceptance.md`

## Execution layer

Sprint work runs through the mattpocock-skills loop, documented in
`.docs/PLAYBOOK.md`: `/grill-with-docs` then `/to-spec` then `/to-tickets` in one
unbroken window, `/clear` between every `/implement`, one ticket per session.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
