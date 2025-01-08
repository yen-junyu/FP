{{- define "common.deployment" -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-{{ .Values.component }}-deployment
  labels:
    app: {{ .Values.appName }}
    component: {{ .Values.component }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Values.appName }}
      component: {{ .Values.component }}
  template:
    metadata:
      labels:
        app: {{ .Values.appName }}
        component: {{ .Values.component }}
    spec:
      containers:
        - name: {{ .Values.component }}
          image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
          ports:
            - containerPort: {{ .Values.container.port }}
          {{- with index .Values .Values.component }}
          {{- if .readinessProbe }}
          readinessProbe:
            httpGet:
              path: {{ .readinessProbe.path }}
              port: {{ .container.port }}
            initialDelaySeconds: {{ .readinessProbe.initialDelaySeconds }}
            periodSeconds: {{ .readinessProbe.periodSeconds }}
          {{- end }}
          {{- if .livenessProbe }}
          livenessProbe:
            httpGet:
              path: {{ .livenessProbe.path }}
              port: {{ .container.port }}
            initialDelaySeconds: {{ .livenessProbe.initialDelaySeconds }}
            periodSeconds: {{ .livenessProbe.periodSeconds }}
          {{- end }}
          {{- if .env }}
          env:
            {{- range .env }}
            - name: {{ .name }}
              value: {{ .value | quote }}
            {{- end }}
          {{- end }}
          {{- end }}
{{- end }}
