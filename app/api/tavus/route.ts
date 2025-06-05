import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch('https://api.tavus.io/v2/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TAVUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona_id: "p589fe814765",
        conversation_name: "Food Safety Walkthrough"
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Tavus API error:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}