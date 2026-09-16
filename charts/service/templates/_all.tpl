{{/*
One include per parent chart. Keeping the list here means adding a resource to
every Deployment is a change in the library, not four identical edits in
deploy/helm/*.
*/}}
{{- define "ethanel.all" -}}
{{- include "ethanel.deployment" . }}
{{- with (include "ethanel.service" .) }}
---
{{ . }}
{{- end }}
{{- with (include "ethanel.pdb" .) }}
---
{{ . }}
{{- end }}
{{- with (include "ethanel.networkpolicy" .) }}
---
{{ . }}
{{- end }}
{{- with (include "ethanel.hpa" .) }}
---
{{ . }}
{{- end }}
{{- end -}}
