import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

interface LanguageSelectorProps {
  onClose?: () => void;
}

export const LanguageSelector = ({ onClose }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '/flags/en.webp' },
    { code: 'fr', name: 'Français', flag: '/flags/fr.webp' },
    { code: 'ar', name: 'العربية', flag: '/flags/ar.webp' }
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => {
            setLanguage(lang.code);
            onClose?.();
          }}
          className={cn(
            'justify-start w-full hover:bg-accent/50',
            language === lang.code ? 'bg-accent/50 font-medium' : ''
          )}
        >
          <img
            src={lang.flag}
            alt={lang.name}
            className="w-5 h-5 mr-2 rounded-sm object-cover"
          />
          <span>{lang.name}</span>
        </Button>
      ))}
    </div>
  );
};