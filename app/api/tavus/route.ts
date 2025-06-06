export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
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
        'X-API-KEY': process.env.TAVUS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'persona_id': 'pede8c9ca8d8',
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

    // Return the URL and conversation ID
    return new Response(JSON.stringify({ 
      conversation_url: data.conversation_url,
      conversation_id: data.conversation_id 
    }), {
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

export async function DELETE(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    console.log('[Tavus API] DELETE request received');
    
    const body = await req.json();
    const { conversation_id } = body;

    if (!conversation_id) {
      return new Response(JSON.stringify({ error: 'conversation_id is required' }), {
        status: 400,
        headers,
      });
    }

    // End the conversation on Tavus
    const tavusResponse = await fetch(`https://tavusapi.com/v2/conversations/${conversation_id}/end`, {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.TAVUS_API_KEY!,
        'Content-Type': 'application/json',
      },
    });

    console.log('[Tavus API] End conversation response status:', tavusResponse.status);

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text();
      console.error('[Tavus API] Error ending conversation:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to end conversation on Tavus' }), {
        status: tavusResponse.status,
        headers,
      });
    }

    console.log('[Tavus API] Conversation ended successfully');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[Tavus API] Error ending conversation:', error);
    return new Response(JSON.stringify({ error: 'Failed to end Tavus conversation' }), {
      status: 500,
      headers,
    });
  }
}

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
