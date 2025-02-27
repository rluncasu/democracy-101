// Create a dynamic route with language parameter
import { Metadata } from 'next';

interface MetadataByLanguage {
  [key: string]: {
    title: string;
    description: string;
  };
}

const metadataByLanguage: MetadataByLanguage = {
  EN: { title: 'Default Title', description: 'Default Description' },
  // Add other languages here
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang.toUpperCase();
  const metadata = metadataByLanguage[lang] || metadataByLanguage.EN;
  
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      // ... use metadata values
    },
    twitter: {
      // ... use metadata values
    }
  };
} 