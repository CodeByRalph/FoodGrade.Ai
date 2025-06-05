
export async function POST(req: Request) {
  try {
    console.log('API route hit');
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': 'https://tavus.daily.co',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers, status: 200 });
    }

    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TAVUS_API_KEY}`,
        'Content-Type': 'application/json',
        'Origin': 'https://tavus.daily.co'
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
        headers,
      });
    }

    const data = await tavusResponse.json();
    
    // Validate that the URL exists and is a string
    if (!data.conversation_url || typeof data.conversation_url !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid or missing conversation URL from Tavus API' }), {
        status: 400,
        headers,
      });
    }

    // Return the URL in the expected format
    const response = data.conversation_url
    return new Response(JSON.stringify({ conversation_url: response }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[Tavus API] Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create Tavus conversation' }), {
      status: 500,
      headers,
    });
  }
}
