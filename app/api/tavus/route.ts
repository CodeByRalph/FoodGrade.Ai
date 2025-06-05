
export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    console.log('API route hit');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers, status: 200 });
    }

    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TAVUS_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'persona_id': process.env.TAVUS_PERSONA_ID as string,
        'conversation_name': 'Safety Walkthrough',
      })
    });

    console.log('[Tavus API] Response status:', tavusResponse.status);

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text();
      console.error('[Tavus API] Error response:', errorText);
      if (tavusResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Maximum concurrent conversations reached' }), {
          status: 429,
          headers,
        });
      }
      return new Response(JSON.stringify({ error: errorText }), {
        status: tavusResponse.status,
        headers,
      });
    }

    const data = await tavusResponse.json();
    console.log('[Tavus API] Response data:', data);
    
    // Validate that the URL exists and is a string
    if (!data.conversation_url || typeof data.conversation_url !== 'string') {
      console.error('[Tavus API] Invalid conversation URL:', data);
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
