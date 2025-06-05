
export async function POST(req: Request) {
  try {
    console.log('API route hit');
    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TAVUS_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'persona_id': 'p589fe814765',
        'conversation_name': 'Safety Walkthrough',
      })
    });

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: tavusResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await tavusResponse.json();
    
    // Validate that the URL exists and is a string
    if (!data.conversation_url || typeof data.conversation_url !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid or missing conversation URL from Tavus API' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the URL in the expected format
    const response = data.conversation_url
    return new Response(JSON.stringify({ conversation_url: response }), {
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
