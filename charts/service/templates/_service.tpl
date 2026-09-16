{{- define "ethanel.service" -}}
{{- if .Values.service.enabled -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "ethanel.fullname" . }}
  labels:
    {{- include "ethanel.labels" . | nindent 4 }}
spec:
  type: ClusterIP
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    {{- include "ethanel.selectorLabels" . | nindent 4 }}
{{- end -}}
{{- end -}}
