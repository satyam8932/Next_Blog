'use client';
import { useEffect, useState, useRef } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
  flag: string;
}

declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize language config
    window.__GOOGLE_TRANSLATION_CONFIG__ = {
      languages: [
        { title: "English", name: "en", flag: "🇬🇧" },
        { title: "Français", name: "fr", flag: "🇫🇷" },
        { title: "العربية", name: "ar", flag: "🇦🇪" },
      ],
      defaultLanguage: "en",
    };

    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang);
    setCurrentLanguage(lang);
    setIsOpen(false);
    window.location.reload();
  };

  if (!currentLanguage || !languageConfig) {
    return null;
  }

  const currentLang = languageConfig.languages.find(
    (l: LanguageDescriptor) => l.name === currentLanguage
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 notranslate"
      >
        <span>{currentLang?.flag}</span>
        <span>{currentLang?.title}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            {languageConfig.languages.map((language: LanguageDescriptor) => (
              <button
                key={language.name}
                onClick={() => switchLanguage(language.name)}
                className={`
                  w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2
                  ${currentLanguage === language.name ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}
                `}
                role="menuitem"
              >
                <span>{language.flag}</span>
                <span>{language.title}</span>
                {currentLanguage === language.name && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };