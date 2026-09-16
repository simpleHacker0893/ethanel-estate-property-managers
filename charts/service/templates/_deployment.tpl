{{- define "ethanel.deployment" -}}
{{- include "ethanel.validate" (dict "root" .) -}}
{{- $v := .Values -}}
{{- $name := include "ethanel.name" . -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "ethanel.fullname" . }}
  labels:
    {{- include "ethanel.labels" . | nindent 4 }}
spec:
  {{- if not $v.autoscaling.enabled }}
  replicas: {{ required "replicaCount is required when autoscaling is disabled" $v.replicaCount }}
  {{- end }}
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: {{ $v.rollout.maxSurge }}
      maxUnavailable: {{ $v.rollout.maxUnavailable }}
  selector:
    matchLabels:
      {{- include "ethanel.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "ethanel.labels" . | nindent 8 }}
      annotations:
        {{- /* Roll the pods when config changes, not only when the image does. */}}
        checksum/config: {{ toYaml $v.env | sha256sum }}
    spec:
      {{- /*
        D-34 gate 5, HARD-CODED and not overridable. Every value below is a
        value a caller cannot get wrong because it cannot set it. ARCHITECTURE
        §11.1: non-root, read-only root filesystem with an emptyDir for /tmp.
      */}}
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
        seccompProfile:
          type: RuntimeDefault
      automountServiceAccountToken: false
      {{- /*
        Long enough for the chassis to finish or release in-flight pg-boss work
        (D-34 gate 7, enforced by a chassis contract test in Sprint 002). The
        chart cannot make shutdown graceful; it can refuse to cut it short.
      */}}
      terminationGracePeriodSeconds: {{ $v.terminationGracePeriodSeconds }}
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: ScheduleAnyway
          labelSelector:
            matchLabels:
              {{- include "ethanel.selectorLabels" . | nindent 14 }}
      containers:
        - name: {{ $name }}
          image: {{ include "ethanel.image" . }}
          imagePullPolicy: IfNotPresent
          {{- with $v.command }}
          command: {{ toYaml . | nindent 12 }}
          {{- end }}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            privileged: false
            capabilities:
              drop: ["ALL"]
          ports:
            - name: http
              containerPort: {{ $v.containerPort }}
              protocol: TCP
          env:
            - name: PORT
              value: {{ $v.containerPort | quote }}
            - name: APP_VERSION
              value: {{ default $v.image.tag $v.image.digest | quote }}
            {{- range $k, $val := $v.env }}
            - name: {{ $k }}
              value: {{ $val | quote }}
            {{- end }}
          {{- with $v.envFrom }}
          envFrom: {{ toYaml . | nindent 12 }}
          {{- end }}
          resources: {{ toYaml $v.resources | nindent 12 }}
          {{- with $v.probes.startup }}
          startupProbe: {{ toYaml . | nindent 12 }}
          {{- end }}
          readinessProbe: {{ toYaml $v.probes.readiness | nindent 12 }}
          livenessProbe: {{ toYaml $v.probes.liveness | nindent 12 }}
          volumeMounts:
            {{- /* readOnlyRootFilesystem means /tmp has to come from somewhere. */}}
            - name: tmp
              mountPath: /tmp
            {{- with $v.extraVolumeMounts }}
            {{- toYaml . | nindent 12 }}
            {{- end }}
      volumes:
        - name: tmp
          emptyDir:
            sizeLimit: {{ $v.tmpSizeLimit }}
        {{- with $v.extraVolumes }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
{{- end -}}
