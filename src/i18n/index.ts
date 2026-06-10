import es from './es.json';
import en from './en.json';

export type Language = 'es' | 'en';

const translations = {
  es,
  en
};

export function getTranslations(lang: Language = 'es') {
  return translations[lang] || translations.es;
}

export function useTranslation(lang: Language = 'es') {
  return getTranslations(lang);
}

export const defaultLang: Language = 'es';
export const languages: Language[] = ['es', 'en'];
