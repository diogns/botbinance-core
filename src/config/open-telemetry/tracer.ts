import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { AWSXRayIdGenerator } from '@opentelemetry/id-generator-aws-xray';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export async function initializeTracing() {
  registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-http': {
          ignoreIncomingPaths: [/\/healthcheck/],
        },
        '@opentelemetry/instrumentation-aws-sdk': {
          suppressInternalInstrumentation: true,
        },
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),
    ],
  });

  const APP_TITLE = process.env.APP_TITLE ?? 'notification-ms';
  const APP_VERSION = process.env.APP_VERSION ?? '1.0.0';
  const _resource = Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: APP_TITLE,
      [SemanticResourceAttributes.SERVICE_VERSION]: APP_VERSION,
    }),
  );

  const _traceProvider = new NodeTracerProvider({
    idGenerator: new AWSXRayIdGenerator(),
    resource: _resource,
  });

  const _traceExporter = new OTLPTraceExporter();
  const _spanProcessor = new BatchSpanProcessor(_traceExporter);
  _traceProvider.addSpanProcessor(_spanProcessor);

  _traceProvider.register({ propagator: new AWSXRayPropagator() });
}
