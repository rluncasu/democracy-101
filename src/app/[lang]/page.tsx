import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DynamicMeta } from '@/components/dynamic-meta';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'ro'];

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

// Import the HomeContent component
import HomeContent from '../_components/home-content';

interface PageProps {
  params: {
    lang: string;
  };
}

export default function LanguagePage({ params }: PageProps) {
  const { lang } = params;
  
  // Normalize language to lowercase
  const normalizedLang = lang.toLowerCase();
  
  // Check if language is supported
  if (!SUPPORTED_LANGUAGES.includes(normalizedLang)) {
    notFound();
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent initialLanguage={normalizedLang === 'en' ? 'EN' : 'RO'} />
    </Suspense>
  );
}

// Generate static paths for supported languages
export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map(lang => ({
    lang,
  }));
} 