type LogLevel = 'info' | 'warn' | 'error';

type LogPayload = {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
};

function log(payload: LogPayload) {
  const timestamp = new Date().toISOString();
  const { level, message, context, error } = payload;

  const logData: Record<string, unknown> = { timestamp, level, message };
  if (context) logData.context = context;
  if (error) logData.error = String(error);

  if (level === 'error') {
    console.error(JSON.stringify(logData));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logData));
  } else {
    console.log(JSON.stringify(logData));
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) =>
    log({ level: 'info', message, context }),

  warn: (message: string, context?: Record<string, unknown>) =>
    log({ level: 'warn', message, context }),

  error: (message: string, context?: Record<string, unknown>, error?: unknown) =>
    log({ level: 'error', message, context, error }),
};
