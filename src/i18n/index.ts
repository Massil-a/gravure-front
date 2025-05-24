import fr from './fr.json';
import en from './en.json';

export const availableLanguages = ['fr', 'en'] as const; // Avoir modifié dans LanguageSelector la variable : languages
export type Lang = (typeof availableLanguages)[number];

const translations: Record<Lang, Record<string, string>> = {
  fr,
  en,
};

export function isLang(value: string): value is Lang {
  return availableLanguages.includes(value as Lang);
}

export function getLanguage(): Lang {
  const stored = localStorage.getItem('lang');
  if (stored && isLang(stored)) return stored;

  const browserLang = navigator.language.slice(0, 2);
  if (isLang(browserLang)) {
    localStorage.setItem('lang', browserLang);
    return browserLang;
  }

  localStorage.setItem('lang', availableLanguages[0]);
  return availableLanguages[0];
}

export function setLanguage(lang: string): void {
  if (isLang(lang)) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  } else {
    console.warn(`Langue inconnue : ${lang}`);
  }
}

export function t(key: string): string {
  const lang = getLanguage();
  return translations[lang][key] || key;
}
