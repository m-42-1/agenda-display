// Cloudflare Worker: CORS proxy for exactly one Outlook ICS feed.
// Outlook publishes the feed without Access-Control-Allow-Origin, so the
// kiosk page cannot fetch it directly. The feed URL is fixed here on purpose:
// this is not an open proxy.
//
// Deploy: Cloudflare dashboard → Workers & Pages → Create → Hello World →
// Edit code → paste this file → Deploy.

const ICS_URL = 'https://outlook.office365.com/owa/calendar/2e756fe3580945bd80f7c18d5eedf151@kultura.trnava.sk/fb299a1f15e14af1a6c09121b4f22ed610826515312205160777/calendar.ics';

const ALLOWED_ORIGINS = [
  'https://m-42-1.github.io',
  'http://localhost:8787',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(request) });
    }

    let upstream;
    try {
      upstream = await fetch(ICS_URL, { cache: 'no-store' });
    } catch (err) {
      return new Response('Upstream fetch failed', { status: 502, headers: corsHeaders(request) });
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...corsHeaders(request),
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  },
};
