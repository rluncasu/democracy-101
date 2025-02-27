import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Define language type
type SupportedLanguage = 'en' | 'ro';

// Define translation structure
interface TranslationContent {
  title: string;
  subtitle: string;
  constitutional: {
    title: string;
    description: string;
  };
  electoral: {
    title: string;
    description: string;
  };
}

// Define translations for different languages
const translations: Record<SupportedLanguage, TranslationContent> = {
  en: {
    title: 'Types of Democracy',
    subtitle: 'Constitutional vs Electoral Democracy',
    constitutional: {
      title: 'Constitutional Democracy',
      description: 'Limited by constitutional principles'
    },
    electoral: {
      title: 'Electoral Democracy',
      description: 'Focused on free elections'
    }
  },
  ro: {
    title: 'Tipuri de Democrație',
    subtitle: 'Democrație Constituțională vs Electorală',
    constitutional: {
      title: 'Democrație Constituțională',
      description: 'Limitată de principii constituționale'
    },
    electoral: {
      title: 'Democrație Electorală',
      description: 'Axată pe alegeri libere'
    }
  }
};

// Create a separate function for generating the image
async function generateTwitterImage(request: NextRequest) {
  // Get the language from the search params
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get('lang') || 'en') as SupportedLanguage;
  
  // Get translations for the current language
  const t = translations[lang] || translations.en;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #0d6efd, #0a58ca)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Language indicator in the top-right corner */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'flex',
          }}
        >
          {lang.toUpperCase()}
        </div>
        
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {t.title}
        </div>
        <div
          style={{
            fontSize: 30,
            marginBottom: 40,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {t.subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            marginTop: 20,
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '10px',
              width: '45%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div 
              style={{ 
                fontSize: 30, 
                fontWeight: 'bold', 
                marginBottom: 10,
                display: 'flex',
              }}
            >
              {t.constitutional.title}
            </div>
            <div style={{ fontSize: 20, display: 'flex' }}>
              {t.constitutional.description}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '10px',
              width: '45%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div 
              style={{ 
                fontSize: 30, 
                fontWeight: 'bold', 
                marginBottom: 10,
                display: 'flex',
              }}
            >
              {t.electoral.title}
            </div>
            <div style={{ fontSize: 20, display: 'flex' }}>
              {t.electoral.description}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// Export the GET handler that calls the image generation function
export async function GET(request: NextRequest) {
  return generateTwitterImage(request);
}

// Define edge runtime configuration for the GET handler
export const runtime = 'edge'; 