import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

export async function initLocalization(
    preferredLanguage: string = 'en'
): Promise<void> {
    await i18n
        .use(HttpApi)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            ...(preferredLanguage
                ? {
                    lng: preferredLanguage,
                }
                : {}),
            fallbackLng: 'en',
            debug: false,
            ns: ['common', 'validation'],
            returnObjects: true,
            load: 'currentOnly',
            detection: {
                order: [
                    'querystring',
                    'cookie',
                    'localStorage',
                    'navigator',
                    'htmlTag',
                    'path',
                    'subdomain',
                ],
                lookupQuerystring: 'lng',
                lookupCookie: 'i18next',
                lookupLocalStorage: 'i18nextLng',
                lookupFromPathIndex: 0,
                lookupFromSubdomainIndex: 0,
                caches: ['localStorage', 'cookie'],
            },
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        });
}
