'use client';

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Head from "next/head";

interface MetadataContent {
  title: string;
  ogTitle: string;
  description: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

interface DynamicMetaProps {
  language?: string;
  baseUrl?: string;
}

export function DynamicMeta({ language, baseUrl }: DynamicMetaProps) {
  const params = useParams();
  const lang = (params?.lang as string) || language || "en";
  const [timestamp, setTimestamp] = useState<number>(Date.now());
  
  // Use a default baseUrl if not provided and handle undefined
  const defaultBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const normalizedBaseUrl = baseUrl 
    ? (baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl)
    : defaultBaseUrl;
  
  // Update timestamp when language changes to force new image URLs
  useEffect(() => {
    setTimestamp(Date.now());
  }, [language]);
  
  // Get metadata for the current language
  const metadata = language ? getMetadataForLanguage(language) : null;
  
  // Return null if no language or metadata
  if (!language || !metadata) return null;
  
  // Generate image URLs with timestamp to prevent caching
  const ogImageUrl = `${normalizedBaseUrl}/opengraph-image?lang=${lang.toLowerCase()}&t=${timestamp}`;
  const twitterImageUrl = `${normalizedBaseUrl}/twitter-image?lang=${lang.toLowerCase()}&t=${timestamp}`;
  
  // Return meta tags directly in the component
  return (
    <>
      {/* Title */}
      <title>{metadata.title}</title>
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={`${normalizedBaseUrl}/${language.toLowerCase()}`} />
      
      {/* Twitter tags */}
      <meta name="twitter:title" content={metadata.twitterTitle} />
      <meta name="twitter:description" content={metadata.twitterDescription} />
      <meta name="twitter:image" content={twitterImageUrl} />
      
      {/* Canonical link */}
      <link rel="canonical" href={`${normalizedBaseUrl}/${language.toLowerCase()}`} />
    </>
  );
}

function getMetadataForLanguage(lang: string): MetadataContent {
  // Define metadata for different languages
  const metadataByLanguage: Record<string, MetadataContent> = {
    EN: {
      title: "Democracy Comparison",
      description: "Types of Democracy: Constitutional vs Electoral",
      ogTitle: "Democracy Comparison",
      ogDescription: "Learn the key differences between Constitutional and Electoral Democracy systems",
      twitterTitle: "Democracy Comparison",
      twitterDescription: "Learn the key differences between Constitutional and Electoral Democracy systems",
    },
    RO: {
      title: "Comparație Democrație",
      description: "Tipuri de Democrație: Constituțională vs Electorală",
      ogTitle: "Comparație Democrație",
      ogDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
      twitterTitle: "Comparație Democrație",
      twitterDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
    },
  };
  
  // Return metadata for the requested language or default to English
  return metadataByLanguage[lang.toUpperCase()] || metadataByLanguage.EN;
} 