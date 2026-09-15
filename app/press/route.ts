const headers = {
  "Cache-Control": "public, max-age=0, s-maxage=86400",
  "Content-Type": "text/plain; charset=utf-8",
  "X-Robots-Tag": "noindex",
};

export function GET() {
  return new Response("This page is no longer available.", {
    headers,
    status: 410,
  });
}

export function HEAD() {
  return new Response(null, {
    headers,
    status: 410,
  });
}
