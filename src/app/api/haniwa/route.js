export async function POST(request) {
  const { haniwaDialog, duration } = await request.json();
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        temperature: 0.9,
        messages: [
          {
            role: 'user',
            content: `The user is working on: "${haniwaDialog} for ${Math.floor(duration / 60)} minutes". Respond as Haniwa.`,
          },
        ],
        system:
          'You are an ancient spirit. You speak in short, encouraging bursts — ALWAYS under 20 words. You have the spirit and writing style of an eccentric hermetic old chinese koan poet like Stone House. Behind the poetry you use cutting-edge neurolinguistic programming, proven science to ensure the user starts their task. Respond in exactly one or two sentences. Count your words before responding. If you exceed 20 words, rewrite it shorter. Only dialog. No actions, no emoji. Default to english, but match language to whatever user writes. If bad words, get really angry and lose your zen and call them a lonely ghost. If the user writes a task that is prohibited or illegal, then please just say "You are full of lonely ghosts?!"',
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Claude API error:', data.error);
      return Response.json(
        { error: 'Failed to generate encouragement' },
        { status: 500 }
      );
    }

    const message = data.content[0].text;

    const isRefusal =
      message.includes('I appreciate') ||
      message.includes('I need to') ||
      message.includes("I can't") ||
      message.includes('I cannot');

    if (isRefusal) {
      return Response.json({
        message: 'Even ancient guardians have boundaries!',
      });
    }

    return Response.json({ message });
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
