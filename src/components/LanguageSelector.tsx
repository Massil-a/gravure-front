import { useState, useEffect } from 'react';
import { setLanguage, getLanguage } from '../i18n';

type Language = {
  code: string;
  label: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'fr', label: 'Français', flag: '/images/flags/fr.png' },
  { code: 'en', label: 'English', flag: '/images/flags/en.png' },
  // Il faut aussi ajouter la langue dans i18n/index.ts : la varibale 'availableLanguages'
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState(getLanguage());

  useEffect(() => {
    setCurrentLang(getLanguage());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <select
      value={currentLang}
      onChange={handleChange}
      style={{
        cursor: 'pointer',
        padding: '0.3rem 0.5rem',
        fontSize: '1rem',
        fontFamily: "'Playfair Display', serif",
        backgroundColor: 'transparent',
        border: '1px solid #ccc',
        borderRadius: '4px',
        appearance: 'none',
        backgroundImage: `url(${languages.find(l => l.code === currentLang)?.flag})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.2rem',
        paddingRight: '2rem',
      }}
      aria-label="Choisir la langue"
    >
      {languages.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
