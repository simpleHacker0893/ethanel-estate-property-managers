{{/*
D-34 gate 4. Default-deny both directions, then an explicit allow list.

The ingress side is deliberately narrow: a Deployment accepts traffic only from
what its values name. The egress side is the one that matters for a
schema-per-service architecture -- ARCHITECTURE §10 sets it per Deployment, and
`worker` being able to reach a provider that `docs-worker` cannot is part of how
blast radius stays bounded.

DNS is allowed unconditionally. Every other rule is written by the caller, and
`_validate.tpl` refuses to render if the list is absent. An intentionally empty
list is fine -- it just has to be intentional.
*/}}
{{- define "ethanel.networkpolicy" -}}
{{- if .Values.networkPolicy.enabled -}}
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: {{ include "ethanel.fullname" . }}
  labels:
    {{- include "ethanel.labels" . | nindent 4 }}
spec:
  podSelector:
    matchLabels:
      {{- include "ethanel.selectorLabels" . | nindent 6 }}
  policyTypes:
    - Ingress
    - Egress
  ingress:
    {{- with .Values.networkPolicy.ingress }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
  egress:
    - ports:
        - port: 53
          protocol: UDP
        - port: 53
          protocol: TCP
      to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
    {{- with .Values.networkPolicy.egress }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
{{- end -}}
{{- end -}}
