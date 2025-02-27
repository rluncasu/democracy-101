'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DynamicMeta } from '@/components/dynamic-meta';

interface HomeContentProps {
  initialLanguage: string;
}

export default function HomeContent({ initialLanguage }: HomeContentProps) {
  const router = useRouter();
  const [language, setLanguage] = useState(initialLanguage);

  // Toggle language function
  const toggleLanguage = (newLang: string) => {
    setLanguage(newLang);
    
    // Navigate to the language route
    router.push(`/${newLang.toLowerCase()}`);
  };

  // Handle theme switching based on system preference
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    
    function updateTheme(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
      }
    }

    darkThemeMq.addEventListener('change', updateTheme);
    updateTheme(darkThemeMq);

    return () => darkThemeMq.removeEventListener('change', updateTheme);
  }, []);

  // Romanian content
  const roContent = {
    pageTitle: "Tipuri de Democrație",
    constitutionalDemocracy: {
      title: "Democrație Constituțională",
      description: "Un sistem politic în care <strong>democrația este limitată și ghidată de o constituție</strong> care garantează drepturi fundamentale, separarea puterilor și statul de drept.",
      characteristics: {
        title: "Caracteristici Principale",
        items: [
          {
            title: "Supremația Constituției",
            description: "Guvernarea este limitată de reguli și principii fundamentale"
          },
          {
            title: "Protecția Drepturilor",
            description: "Drepturile și libertățile fundamentale sunt protejate împotriva deciziei majorității"
          },
          {
            title: "Echilibrul Puterilor",
            description: "Puterile legislative, executive și judiciare sunt separate"
          }
        ]
      },
      examples: {
        title: "Exemple",
        countries: ["Statele Unite", "Germania", "Franța"]
      }
    },
    electoralDemocracy: {
      title: "Democrație Electorală",
      description: "Un sistem care se concentrează pe <strong>alegeri libere și corecte</strong> fără garanții constituționale puternice pentru a proteja drepturile cetățenilor.",
      characteristics: {
        title: "Caracteristici Principale",
        items: [
          {
            title: "Centrată pe Alegeri",
            description: "Selecție democratică dar posibile tendințe autoritare"
          },
          {
            title: "Stat de Drept Slab",
            description: "Instituțiile democratice pot fi fragile sau influențate politic"
          },
          {
            title: "Puterea Majorității",
            description: "Partidul de guvernare poate restricționa drepturi fără verificări constituționale"
          }
        ]
      },
      examples: {
        title: "Exemple",
        countries: ["Rusia", "Turcia", "Venezuela"]
      }
    },
    essentialDifference: {
      title: "Diferența Esențială",
      description: "În timp ce <strong class='text-primary'>democrația constituțională</strong> protejează reguli și principii fundamentale chiar și împotriva majorităților politice, <strong class='text-secondary'>democrația electorală</strong> poate permite concentrarea puterii fără mecanisme eficiente de control."
    }
  };

  // English content
  const enContent = {
    pageTitle: "Types of Democracy",
    constitutionalDemocracy: {
      title: "Constitutional Democracy",
      description: "A political system where <strong>democracy is limited and guided by a constitution</strong> that guarantees fundamental rights, separation of powers, and rule of law.",
      characteristics: {
        title: "Key Characteristics",
        items: [
          {
            title: "Constitutional Supremacy",
            description: "Governance is limited by fundamental rules and principles"
          },
          {
            title: "Rights Protection",
            description: "Fundamental rights and freedoms are protected from majority rule"
          },
          {
            title: "Power Balance",
            description: "Legislative, executive, and judicial powers are separated"
          }
        ]
      },
      examples: {
        title: "Examples",
        countries: ["United States", "Germany", "France"]
      }
    },
    electoralDemocracy: {
      title: "Electoral Democracy",
      description: "A system focusing on <strong>free and fair elections</strong> without strong constitutional safeguards to protect citizens&apos; rights.",
      characteristics: {
        title: "Key Characteristics",
        items: [
          {
            title: "Election-Centric",
            description: "Democratic selection but possible authoritarian tendencies"
          },
          {
            title: "Weak Rule of Law",
            description: "Democratic institutions may be fragile or politically influenced"
          },
          {
            title: "Majority Power",
            description: "Ruling party can restrict rights without constitutional checks"
          }
        ]
      },
      examples: {
        title: "Examples",
        countries: ["Russia", "Turkey", "Venezuela"]
      }
    },
    essentialDifference: {
      title: "Essential Difference",
      description: "While <strong class='text-primary'>constitutional democracy</strong> protects fundamental rules and principles even against political majorities, <strong class='text-secondary'>electoral democracy</strong> may allow power concentration without effective control mechanisms."
    }
  };

  // Select content based on current language
  const content = language === 'EN' ? enContent : roContent;

  return (
    <>
      <DynamicMeta language={language} />
      <div className="container py-5">
        {/* Language Switcher with Flags */}
        <div className="d-flex justify-content-end mb-4">
          <div className="btn-group" role="group" aria-label="Language Switcher">
            <button 
              type="button" 
              className={`btn ${language === 'RO' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => toggleLanguage('RO')}
            >
              RO
            </button>
            <button 
              type="button" 
              className={`btn ${language === 'EN' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => toggleLanguage('EN')}
            >
              EN
            </button>
          </div>
        </div>

        <h1 className="text-center mb-5 display-6">{content.pageTitle}</h1>

        <div className="row g-4 align-items-stretch">
          {/* Constitutional Democracy Column */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary bg-opacity-75 text-white py-3">
                <h2 className="card-title h5 mb-0">{content.constitutionalDemocracy.title}</h2>
              </div>
              <div className="card-body">
                <div className="feature-box mb-4">
                  <i className="bi bi-book-half fs-3 text-primary mb-2"></i>
                  <p className="text-md" dangerouslySetInnerHTML={{ __html: content.constitutionalDemocracy.description }}></p>
                </div>

                <h6 className="mt-4 border-bottom pb-2">{content.constitutionalDemocracy.characteristics.title}</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <strong>{content.constitutionalDemocracy.characteristics.items[0].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.constitutionalDemocracy.characteristics.items[0].description}</p>
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-shield-check text-success me-2"></i>
                    <strong>{content.constitutionalDemocracy.characteristics.items[1].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.constitutionalDemocracy.characteristics.items[1].description}</p>
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-diagram-3 text-success me-2"></i>
                    <strong>{content.constitutionalDemocracy.characteristics.items[2].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.constitutionalDemocracy.characteristics.items[2].description}</p>
                  </li>
                </ul>

                <div className="mt-4">
                  <p className="border-bottom pb-2 fw-bold small">{content.constitutionalDemocracy.examples.title}</p>
                  <div className="d-flex gap-2 mt-2 flex-wrap">
                    {content.constitutionalDemocracy.examples.countries.map((country, idx) => (
                      <span key={idx} className="badge bg-primary">{country}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Electoral Democracy Column */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-secondary bg-opacity-75 text-white py-3">
                <h2 className="card-title h5 mb-0">{content.electoralDemocracy.title}</h2>
              </div>
              <div className="card-body">
                <div className="feature-box mb-4">
                  <i className="bi bi-people fs-3 text-secondary mb-2"></i>
                  <p className="text-md" dangerouslySetInnerHTML={{ __html: content.electoralDemocracy.description }}></p>
                </div>

                <h6 className="mt-4 border-bottom pb-2">{content.electoralDemocracy.characteristics.title}</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-archive text-secondary me-2"></i>
                    <strong>{content.electoralDemocracy.characteristics.items[0].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.electoralDemocracy.characteristics.items[0].description}</p>
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-exclamation-triangle text-secondary me-2"></i>
                    <strong>{content.electoralDemocracy.characteristics.items[1].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.electoralDemocracy.characteristics.items[1].description}</p>
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-people-fill text-secondary me-2"></i>
                    <strong>{content.electoralDemocracy.characteristics.items[2].title}</strong>
                    <p className="mb-0 ms-4 text-body-secondary">{content.electoralDemocracy.characteristics.items[2].description}</p>
                  </li>
                </ul>

                <div className="mt-4">
                  <p className="border-bottom pb-2 fw-bold small">{content.electoralDemocracy.examples.title}</p>
                  <div className="d-flex gap-2 mt-2 flex-wrap">
                    {content.electoralDemocracy.examples.countries.map((country, idx) => (
                      <span key={idx} className="badge bg-secondary">{country}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Difference Section */}
        <div className="mt-5">
          <div className="card shadow-sm">
            <div className="card-header bg-info bg-opacity-75 text-white">
              <h3 className="card-title h6 mb-0">{content.essentialDifference.title}</h3>
            </div>
            <div className="card-body">
              <p className="card-text mb-0" dangerouslySetInnerHTML={{ __html: content.essentialDifference.description }}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 