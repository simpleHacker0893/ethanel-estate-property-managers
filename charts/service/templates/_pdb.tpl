{{- define "ethanel.pdb" -}}
{{- if .Values.podDisruptionBudget.enabled -}}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "ethanel.fullname" . }}
  labels:
    {{- include "ethanel.labels" . | nindent 4 }}
spec:
  {{- with .Values.podDisruptionBudget.minAvailable }}
  minAvailable: {{ . }}
  {{- end }}
  {{- with .Values.podDisruptionBudget.maxUnavailable }}
  maxUnavailable: {{ . }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "ethanel.selectorLabels" . | nindent 6 }}
{{- end -}}
{{- end -}}
