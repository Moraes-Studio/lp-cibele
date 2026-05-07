// Patterns that indicate injection attempts — block before any processing
const THREAT_PATTERNS: RegExp[] = [
  /<[^>]*>/gi,                          // HTML tags
  /javascript\s*:/gi,                   // javascript: protocol
  /vbscript\s*:/gi,                     // vbscript: protocol
  /data\s*:\s*text\s*\/\s*html/gi,      // data:text/html
  /on\w+\s*=/gi,                        // inline event handlers (onclick=, onerror=, etc.)
  /\beval\s*\(/gi,                      // eval(
  /\bexec\s*\(/gi,                      // exec(
  /\bexpression\s*\(/gi,               // CSS expression()
  /<\s*script/gi,                       // <script
  /<\s*iframe/gi,                       // <iframe
  /<\s*object/gi,                       // <object
  /<\s*embed/gi,                        // <embed
  /<\s*link/gi,                         // <link
  /<\s*meta/gi,                         // <meta
  /\bUNION\s+SELECT\b/gi,              // SQL UNION SELECT
  /\bDROP\s+TABLE\b/gi,                // SQL DROP TABLE
  /\bINSERT\s+INTO\b/gi,              // SQL INSERT INTO
  /\bDELETE\s+FROM\b/gi,              // SQL DELETE FROM
  /\bUPDATE\s+\w+\s+SET\b/gi,        // SQL UPDATE SET
  /['"`]\s*OR\s*['"`\d]/gi,           // SQL OR injection (' OR 1=1, ' OR '1'='1)
  /--\s*$/gm,                           // SQL comment at end of line
  /;\s*DROP/gi,                         // ; DROP
  /\x00/g,                              // null bytes
  /\.\.\//g,                            // path traversal ../
];

const ENCODED_THREAT_PATTERNS: RegExp[] = [
  /%3c\s*script/gi,      // %3cscript
  /%3c\s*iframe/gi,      // %3ciframe
  /&#\d+;/gi,            // HTML entity attacks &#60;
  /&#x[\da-f]+;/gi,      // Hex entity attacks &#x3C;
  /\\u00[0-9a-f]{2}/gi,  // Unicode escape \u00xx
];

export type SanitizeResult =
  | { ok: true; value: string }
  | { ok: false; reason: string };

export function sanitizeField(value: string): SanitizeResult {
  const decoded = decodeAttempt(value);

  for (const pattern of THREAT_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(decoded)) {
      return { ok: false, reason: 'Conteúdo inválido detectado.' };
    }
  }

  for (const pattern of ENCODED_THREAT_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(value)) {
      return { ok: false, reason: 'Conteúdo inválido detectado.' };
    }
  }

  return { ok: true, value: value.trim() };
}

export function sanitizeAll(
  fields: Record<string, string>
): { ok: true; values: Record<string, string> } | { ok: false; reason: string } {
  const values: Record<string, string> = {};

  for (const [key, raw] of Object.entries(fields)) {
    const result = sanitizeField(raw);
    if (!result.ok) return { ok: false, reason: result.reason };
    values[key] = result.value;
  }

  return { ok: true, values };
}

// Safe decode — if decoding fails just return original to avoid crash
function decodeAttempt(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
