'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useRouter } from 'next/navigation';

interface AutoTranslationContextType {
    autoLang: string | null;
    setAutoLang: (lang: string | null) => void;
    isLoading: boolean;
}

const AutoTranslationContext = createContext<AutoTranslationContextType>({
    autoLang: null,
    setAutoLang: () => { },
    isLoading: false,
});

export const useAutoTranslation = () => useContext(AutoTranslationContext);

export default function AutoTranslationProvider({
    children,
    locale,
    timeZone
}: {
    children: React.ReactNode;
    locale: string;
    timeZone?: string;
}) {
    const [autoLang, setAutoLangState] = useState<string | null>(null);
    const [translatedMessages, setTranslatedMessages] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const defaultMessages = useMessages();
    const router = useRouter();

    // Load cache on mount
    useEffect(() => {
        const cachedLang = localStorage.getItem('autoLang');
        if (cachedLang && cachedLang !== locale) {
            // If we had a cached custom language, verify if we have messages for it
            const cachedMsg = localStorage.getItem(`msgs_${cachedLang}`);
            if (cachedMsg) {
                setAutoLangState(cachedLang);
                setTranslatedMessages(JSON.parse(cachedMsg));
            }
        }
    }, [locale]);

    const setAutoLang = async (lang: string | null) => {
        if (!lang) {
            // Reset to default
            setAutoLangState(null);
            setTranslatedMessages(null);
            localStorage.removeItem('autoLang');
            return;
        }

        if (lang === locale) {
            setAutoLangState(null);
            return;
        }

        setAutoLangState(lang);
        setIsLoading(true);

        try {
            // Check cache first
            const cachedMsg = localStorage.getItem(`msgs_${lang}`);
            if (cachedMsg) {
                setTranslatedMessages(JSON.parse(cachedMsg));
                setIsLoading(false);
                localStorage.setItem('autoLang', lang);
                return;
            }

            // Fetch translation
            // We use the default English messages as the source of truth for translation
            // Note: In a real app we might want to fetch 'en' explicitly if current locale is not 'en'
            // But passing 'defaultMessages' works if we assume we start from current. 
            // Better: Fetch fresh EN messages or use what we have. 
            // Let's use what we have, but if it is already translated (e.g. FR), translating FR -> IT might be worse than EN -> IT.
            // Ideally we should always translate from EN. 
            // For this MVP, we will assume we translate `defaultMessages` which is currently loaded.
            // If the user starts in FR, we translate FR -> NewLang. 

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetLang: lang,
                    content: defaultMessages,
                }),
            });

            if (!response.ok) throw new Error('Translation failed');

            const data = await response.json();
            setTranslatedMessages(data);
            localStorage.setItem(`msgs_${lang}`, JSON.stringify(data));
            localStorage.setItem('autoLang', lang);
        } catch (error) {
            console.error(error);
            alert('Translation failed. Please check API key or try again.');
            setAutoLangState(null); // Revert
        } finally {
            setIsLoading(false);
        }
    };

    // If we have auto-translated messages, we use them. Otherwise use default (server provided).
    const messagesToUse = autoLang && translatedMessages ? translatedMessages : defaultMessages;

    return (
        <AutoTranslationContext.Provider value={{ autoLang, setAutoLang, isLoading }}>
            <NextIntlClientProvider
                locale={autoLang || locale}
                messages={messagesToUse}
                timeZone={timeZone}
            >
                {children}
            </NextIntlClientProvider>
        </AutoTranslationContext.Provider>
    );
}
