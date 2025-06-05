import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!process.env.TAVUS_API_KEY) {
      return NextResponse.json(
        { error: 'Tavus API key is not configured' },
        { status: 500 }
      );
    }

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
      const errorData = await response.text();
      console.error('Tavus API error details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { error: `Tavus API error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Tavus API error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Tavus API. Please check your network connection and try again.' },
      { status: 500 }
    );
  }
}