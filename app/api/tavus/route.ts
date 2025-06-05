
export async function POST(req: Request) {
  try {
    console.log('API route hit');
    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TAVUS_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: {
        'persona_id': 'p589fe814765',
        'conversation_name': 'Safety Walkthrough',
      }
      // Uncomment and add if you want to pass any body data
      // body: JSON.stringify({ ... }),
    });

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: tavusResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await tavusResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Tavus API] Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create Tavus conversation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
