{{- define "ethanel.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ethanel.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "ethanel.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ethanel.labels" -}}
app.kubernetes.io/name: {{ include "ethanel.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: Helm
app.kubernetes.io/part-of: ethanel
{{- with .Values.image.tag }}
app.kubernetes.io/version: {{ . | quote }}
{{- end }}
{{- end -}}

{{- define "ethanel.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ethanel.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
The image reference. Digest wins over tag when both are present: a tag is
mutable, and a rollback that resolves to a different image than it did an hour
ago is not a rollback.
*/}}
{{- define "ethanel.image" -}}
{{- $img := .Values.image -}}
{{- if not $img.repository -}}
{{- fail "image.repository is required" -}}
{{- end -}}
{{- if $img.digest -}}
{{- printf "%s@%s" $img.repository $img.digest -}}
{{- else if $img.tag -}}
{{- printf "%s:%s" $img.repository $img.tag -}}
{{- else -}}
{{- fail "image.tag or image.digest is required. `latest` is not a deployment (gem-devops-guidelines)." -}}
{{- end -}}
{{- end -}}
