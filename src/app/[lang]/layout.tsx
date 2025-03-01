import { Metadata } from 'next';
import { DynamicMetaClient } from "@/components/dynamic-meta-client";
import { BASE_URL } from "@/constants/urls";

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

// Define metadata for different languages
const metadataByLanguage: Record<string, any> = {
  en: {
    title: "Democracy Comparison",
    description: "Types of Democracy: Constitutional vs Electoral",
    ogTitle: "Democracy Comparison",
    ogDescription: "Learn the key differences between Constitutional and Electoral Democracy systems",
    twitterTitle: "Democracy Comparison",
    twitterDescription: "Learn the key differences between Constitutional and Electoral Democracy systems",
  },
  ro: {
    title: "Comparație Democrație",
    description: "Tipuri de Democrație: Constituțională vs Electorală",
    ogTitle: "Comparație Democrație",
    ogDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
    twitterTitle: "Comparație Democrație",
    twitterDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
  },
};

// Generate metadata based on language
export async function generateMetadata({ params }: LanguageLayoutProps): Promise<Metadata> {
  const lang = params.lang.toLowerCase();
  const metadata = metadataByLanguage[lang] || metadataByLanguage.en;
  
  // Add a timestamp to prevent caching
  const timestamp = Date.now();
  
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `${BASE_URL}/${lang}`,
      images: [{
        url: `${BASE_URL}/api/og?lang=${lang}&t=${timestamp}`,
        width: 1200,
        height: 630,
        alt: 'Democracy Comparison',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.twitterTitle,
      description: metadata.twitterDescription,
      images: [`${BASE_URL}/api/twitter?lang=${lang}&t=${timestamp}`],
    },
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
    },
  };
}

export default function LanguageLayout({ children, params }: LanguageLayoutProps) {
  const lang = params.lang.toLowerCase();
  
  return (
    <>
      <DynamicMetaClient lang={lang} />
      {children}
    </>
  );
} 