'use client';

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

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
  // Initialize with null to indicate it's not yet determined
  const [currentBaseUrl, setCurrentBaseUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // Mark when we're in client context
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Update base URL when we confirm we're on the client or when baseUrl prop changes
  useEffect(() => {
    if (!isClient) return;
    
    const origin = window.location.origin;
    const normalizedBaseUrl = baseUrl 
      ? (baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl)
      : origin;
    
    setCurrentBaseUrl(normalizedBaseUrl);
  }, [baseUrl, isClient]);
  
  // Update timestamp when language changes to force new image URLs
  useEffect(() => {
    setTimestamp(Date.now());
  }, [language]);
  
  // Update meta tags in the document head
  useEffect(() => {
    if (!isClient || !language || !currentBaseUrl) return;
    
    try {
      const metadata = getMetadataForLanguage(language);
      if (!metadata) return;
      
      // Generate image URLs with timestamp to prevent caching
      const ogImageUrl = `${currentBaseUrl}/api/og?lang=${lang.toLowerCase()}&t=${timestamp}`;
      const twitterImageUrl = `${currentBaseUrl}/api/twitter?lang=${lang.toLowerCase()}&t=${timestamp}`;
      
      // Update document title
      document.title = metadata.title;
      
      // Helper function to safely remove an element
      const safelyRemoveElement = (element: Element | null) => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      };
      
      // Helper function to update a meta tag
      const updateMetaTag = (selector: string, property: string, content: string) => {
        try {
          // Find existing tag if it exists
          const existingTag = document.querySelector(selector);
          
          // If it exists, update its content
          if (existingTag) {
            existingTag.setAttribute('content', content);
          } else {
            // Otherwise create a new tag
            const tag = document.createElement('meta');
            property.startsWith('og:') 
              ? tag.setAttribute('property', property)
              : tag.setAttribute('name', property);
            tag.setAttribute('content', content);
            document.head.appendChild(tag);
          }
        } catch (error) {
          console.error(`Error updating meta tag ${selector}:`, error);
        }
      };
      
      // Helper function to update a link tag
      const updateLinkTag = (rel: string, href: string) => {
        try {
          // Find existing tag if it exists
          const existingTag = document.querySelector(`link[rel="${rel}"]`);
          
          // If it exists, update its href
          if (existingTag) {
            existingTag.setAttribute('href', href);
          } else {
            // Otherwise create a new tag
            const tag = document.createElement('link');
            tag.setAttribute('rel', rel);
            tag.setAttribute('href', href);
            document.head.appendChild(tag);
          }
        } catch (error) {
          console.error(`Error updating link tag ${rel}:`, error);
        }
      };
      
      // Update meta tags
      updateMetaTag('meta[property="og:title"]', 'og:title', metadata.ogTitle);
      updateMetaTag('meta[property="og:description"]', 'og:description', metadata.ogDescription);
      updateMetaTag('meta[property="og:image"]', 'og:image', ogImageUrl);
      updateMetaTag('meta[property="og:url"]', 'og:url', `${currentBaseUrl}/${language.toLowerCase()}`);
      
      updateMetaTag('meta[name="twitter:title"]', 'twitter:title', metadata.twitterTitle);
      updateMetaTag('meta[name="twitter:description"]', 'twitter:description', metadata.twitterDescription);
      updateMetaTag('meta[name="twitter:image"]', 'twitter:image', twitterImageUrl);
      
      // Update canonical link
      updateLinkTag('canonical', `${currentBaseUrl}/${language.toLowerCase()}`);
    } catch (error) {
      console.error('Error updating meta tags:', error);
    }
  }, [isClient, language, currentBaseUrl, lang, timestamp]);
  
  // Don't render anything in the component itself
  return null;
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