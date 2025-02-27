'use client';

import { useEffect } from 'react';

interface DynamicMetaClientProps {
  lang: string;
}

export function DynamicMetaClient({ lang }: DynamicMetaClientProps) {
  // Map language code to HTML lang attribute format
  const htmlLang = lang === 'en' ? 'en' : 'ro';
  
  // Update the HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);
  
  // This component doesn't render anything
  return null;
} 