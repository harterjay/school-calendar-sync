import { NextRequest, NextResponse } from 'next/server';
const parserService = require('@/lib/services/parser');

export async function POST(request: NextRequest) {
  try {
    const { text, childName } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      );
    }

    const events = await parserService.parseText(text, childName);

    return NextResponse.json({
      success: true,
      events,
      count: events.length
    });
  } catch (error) {
    console.error('Error parsing text:', error);
    return NextResponse.json(
      { error: 'Failed to parse text' },
      { status: 500 }
    );
  }
}
