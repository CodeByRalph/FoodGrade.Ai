import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
    });

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text();
      return res.status(tavusResponse.status).json({ error: errorText });
    }

    const data = await tavusResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[Tavus API] Error:', error);
    return res.status(500).json({ error: 'Failed to create Tavus conversation' });
  }
}
