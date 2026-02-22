import { en } from './en';
import { pt } from './pt';

export const languages = { en, pt };
export type Language = keyof typeof languages;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return 'en';
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = languages[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key;
  };
}