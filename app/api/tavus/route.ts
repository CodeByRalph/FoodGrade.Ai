import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!process.env.TAVUS_API_KEY) {
      return NextResponse.json(
        { error: 'Missing Tavus API key' },
        { status: 500 }
      );
    }

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_name: "Audit Walkthrough",
        persona_id: "pbf550eecb6c"
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API error details:', {
        error: errorData,
        status: response.status
      });
      
      return NextResponse.json(
        { error: `Failed to create conversation: ${errorData}` },
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