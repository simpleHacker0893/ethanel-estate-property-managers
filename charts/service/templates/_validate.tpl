{{/*
D-34's go-live gates, made structural.

READINESS.md §1a is the row-by-row table, and D-65 settled which of the eight
gates can live here: five. Rows 6 to 8 are enforced elsewhere and a Helm chart
cannot render any of them -- image scanning is a CI step, graceful worker
shutdown is a packages/chassis behaviour, per-namespace resource quotas are a
namespace manifest.

The promise D-34 makes is that a Deployment which omits one of rows 1 to 5 "must
not be renderable" -- not "should be caught in review". Two mechanisms deliver
that, and the difference matters:

  * Gate 5 (non-root, read-only root filesystem) is HARD-CODED in
    _deployment.tpl and not overridable. A value that cannot be set cannot be
    set wrong.
  * Gates 1 to 4 need per-app values -- a probe path, a memory limit, an egress
    allow list -- so they are enforced by `fail` here. Rendering stops with a
    message naming the gate and the decision.

`helm unittest` asserts each of the five, by removing it and expecting the
render to fail. Those tests are the evidence for 002/acceptance.md's D-34 rows.
*/}}

{{- define "ethanel.validate" -}}
{{- $ := .root -}}
{{- $v := $.Values -}}
{{- $name := include "ethanel.name" $ -}}

{{/* ---- Gate 1: readiness and liveness probes ---- */}}
{{- if not $v.probes -}}
{{- fail (printf "[D-34 gate 1] %s: .Values.probes is required. A Deployment without probes cannot be rendered." $name) -}}
{{- end -}}
{{- range $kind := list "readiness" "liveness" -}}
{{- $p := index $v.probes $kind -}}
{{- if not $p -}}
{{- fail (printf "[D-34 gate 1] %s: .Values.probes.%s is required. Rolling updates are gated on readiness (ARCHITECTURE §11.2); without it a half-started pod takes traffic." $name $kind) -}}
{{- end -}}
{{- if not (or $p.httpGet $p.exec $p.tcpSocket) -}}
{{- fail (printf "[D-34 gate 1] %s: .Values.probes.%s needs one of httpGet, exec or tcpSocket." $name $kind) -}}
{{- end -}}
{{- end -}}

{{/* ---- Gate 2: CPU and memory requests AND limits ---- */}}
{{- if not $v.resources -}}
{{- fail (printf "[D-34 gate 2] %s: .Values.resources is required." $name) -}}
{{- end -}}
{{- range $side := list "requests" "limits" -}}
{{- $r := index $v.resources $side -}}
{{- if not $r -}}
{{- fail (printf "[D-34 gate 2] %s: .Values.resources.%s is required. Requests without limits let one pod starve its neighbours; limits without requests break scheduling." $name $side) -}}
{{- end -}}
{{- range $dim := list "cpu" "memory" -}}
{{- if not (index $r $dim) -}}
{{- fail (printf "[D-34 gate 2] %s: .Values.resources.%s.%s is required." $name $side $dim) -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/* ---- Gate 3: PodDisruptionBudget, 2+ replicas for web and gateway ---- */}}
{{- if not (hasKey $v "podDisruptionBudget") -}}
{{- fail (printf "[D-34 gate 3] %s: .Values.podDisruptionBudget is required. Set enabled=false only for a fixed-replica worker, and say why in the values file." $name) -}}
{{- end -}}
{{- if $v.podDisruptionBudget.enabled -}}
{{- if not (or $v.podDisruptionBudget.minAvailable $v.podDisruptionBudget.maxUnavailable) -}}
{{- fail (printf "[D-34 gate 3] %s: podDisruptionBudget needs minAvailable or maxUnavailable." $name) -}}
{{- end -}}
{{- end -}}
{{- if has $name (list "web" "gateway") -}}
{{- if not $v.podDisruptionBudget.enabled -}}
{{- fail (printf "[D-34 gate 3] %s: web and gateway require a PodDisruptionBudget. Named explicitly in D-34." $name) -}}
{{- end -}}
{{- $min := int (default 0 $v.autoscaling.minReplicas) -}}
{{- $fixed := int (default 0 $v.replicaCount) -}}
{{- if lt (max $min $fixed) 2 -}}
{{- fail (printf "[D-34 gate 3] %s: web and gateway run at min 2 replicas. A PDB over a single replica blocks every node drain instead of protecting availability." $name) -}}
{{- end -}}
{{- end -}}

{{/* ---- Gate 4: default-deny NetworkPolicy with an explicit allow list ---- */}}
{{- if not $v.networkPolicy -}}
{{- fail (printf "[D-34 gate 4] %s: .Values.networkPolicy is required." $name) -}}
{{- end -}}
{{- if not $v.networkPolicy.enabled -}}
{{- fail (printf "[D-34 gate 4] %s: networkPolicy.enabled must be true. Default-deny is the gate; there is no opt-out." $name) -}}
{{- end -}}
{{- if not $v.networkPolicy.egress -}}
{{- fail (printf "[D-34 gate 4] %s: networkPolicy.egress must be an explicit allow list. ARCHITECTURE §10 names it per Deployment: web to Valkey and Neon; gateway to Neon; worker to Neon, S3 and providers; docs-worker to Neon and S3 only. An empty list is also an answer -- write it." $name) -}}
{{- end -}}
{{- end -}}
