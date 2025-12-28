import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || '';

export const runtime = 'edge';

// Recursively translate all string values in an object
async function translateObject(obj: any, targetLang: string): Promise<any> {
    if (typeof obj === 'string') {
        return await translateText(obj, targetLang);
    }

    if (Array.isArray(obj)) {
        return Promise.all(obj.map(item => translateObject(item, targetLang)));
    }

    if (typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for (const key of Object.keys(obj)) {
            result[key] = await translateObject(obj[key], targetLang);
        }
        return result;
    }

    return obj;
}

async function translateText(text: string, targetLang: string): Promise<string> {
    // Skip translation for certain terms
    const skipTerms = ['CLASSIFIED', 'Cisco Modeling Labs', 'Docker', 'GitHub', 'LinkedIn'];
    if (skipTerms.includes(text)) {
        return text;
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLang,
            format: 'text'
        }),
    });

    if (!response.ok) {
        throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

export async function POST(req: Request) {
    try {
        // Check if API key is configured
        if (!GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'Translation service not configured' },
                { status: 503 }
            );
        }

        const { targetLang, content } = await req.json();

        if (!targetLang || !content) {
            return NextResponse.json(
                { error: 'Missing targetLang or content' },
                { status: 400 }
            );
        }

        const translatedContent = await translateObject(content, targetLang);

        return NextResponse.json(translatedContent);
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Failed to translate content' },
            { status: 500 }
        );
    }
}
