// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://457148ad3ee358dd06ba52d45f34ae61@o4509580560236544.ingest.us.sentry.io/4509580563447808",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
  // Tracing
//   tracesSampleRate: 1.0, // Capture 100% of the transactions
  sendDefaultPii: true,
});

// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();