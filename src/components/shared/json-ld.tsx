export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const safe = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
