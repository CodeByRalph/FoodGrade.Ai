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
        'x-api-key': '483ca82d99f948e88d3a238c9d194b19',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_name: "Audit Walkthrough",
        persona_id: "pbf550eecb6c",
        conversational_context: "You are about to interact with FoodGradeAI, a friendly and knowledgeable virtual food safety auditor designed for commercial kitchens. FoodGradeAI assists you by observing your kitchen environment through your device's camera, identifying food safety risks, and guiding you through compliance checks. It offers supportive feedback, asks questions about your procedures, and helps you resolve any issues it detects. FoodGradeAI's goal is to help you maintain a safe, clean, and audit-ready kitchen while making the compliance process as smooth and stress-free as possible."
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