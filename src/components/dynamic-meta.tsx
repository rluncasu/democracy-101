'use client';

import { useEffect } from 'react';

interface MetadataContent {
  title: string;
  ogTitle: string;
  description: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  ogImage: string;
}

interface DynamicMetaProps {
  language: string;
}

export function DynamicMeta({ language }: DynamicMetaProps) {
  useEffect(() => {
    // Get metadata for the current language
    const metadata = getMetadataForLanguage(language);
    
    // Update meta tags
    document.title = metadata.title;
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', metadata.ogTitle);
    
    // Update other meta tags similarly
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metadata.ogDescription);
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', metadata.twitterTitle);
    
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', metadata.twitterDescription);
    
    // Update canonical URL with language parameter
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language.toLowerCase());
      canonicalLink.setAttribute('href', url.toString());
    } else {
      // Create canonical link if it doesn't exist
      const link = document.createElement('link');
      link.rel = 'canonical';
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language.toLowerCase());
      link.href = url.toString();
      document.head.appendChild(link);
    }
    
    // Update og:url with language parameter
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language.toLowerCase());
      ogUrl.setAttribute('content', url.toString());
    }
  }, [language]);
  
  return null; // This component doesn't render anything
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
      ogImage: "og-image-en.jpg",
    },
    RO: {
      title: "Comparație Democrație",
      description: "Tipuri de Democrație: Constituțională vs Electorală",
      ogTitle: "Comparație Democrație",
      ogDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
      twitterTitle: "Comparație Democrație",
      twitterDescription: "Aflați diferențele cheie între sistemele de democrație constituțională și electorală",
      ogImage: "og-image-ro.jpg",
    },
  };
  
  // Return metadata for the requested language or default to English
  return metadataByLanguage[lang] || metadataByLanguage.EN;
} 