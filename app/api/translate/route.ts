import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { targetLang, content } = await req.json();

        if (!targetLang || !content) {
            return NextResponse.json(
                { error: 'Missing targetLang or content' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional translator. Translate the given JSON content into ${targetLang}. 
          Maintain the exact same JSON structure and keys. Only translate the values.
          Do not translate "CLASSIFIED" or specific technical terms like "Cisco Modeling Labs" or "Docker" if they are better left in English, but adapt context if needed.
          Return ONLY the valid JSON object.`,
                },
                {
                    role: 'user',
                    content: JSON.stringify(content),
                },
            ],
            response_format: { type: 'json_object' },
        });

        const translatedContent = JSON.parse(completion.choices[0].message.content || '{}');

        return NextResponse.json(translatedContent);
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Failed to translate content' },
            { status: 500 }
        );
    }
}
