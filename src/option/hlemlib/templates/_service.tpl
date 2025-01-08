{{- define "common.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-service
  labels:
    app: {{ .Values.appName }}
spec:
  selector:
    app: {{ .Values.appName }}
  ports:
    - protocol: TCP
      port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.targetPort }}
{{- end }}
