
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
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <div className="space-y-1 w-full">
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
          {lang.name}
        </Button>
      ))}
    </div>
  );
};
