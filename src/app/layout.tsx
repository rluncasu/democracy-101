import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Define metadata for different languages
const metadataByLanguage = {
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
  // Add more languages as needed
};

// Default to English metadata
const defaultLang = "EN";
const defaultMetadata = metadataByLanguage[defaultLang];

export const metadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  openGraph: {
    title: defaultMetadata.ogTitle,
    description: defaultMetadata.ogDescription,
    url: "https://democracy-101.templates.workers.dev",
    siteName: defaultMetadata.title,
    images: [
      {
        url: `https://democracy-101.templates.workers.dev/${defaultMetadata.ogImage}`,
        width: 1200,
        height: 630,
        alt: defaultMetadata.ogTitle,
      },
    ],
    locale: defaultLang === "EN" ? "en_US" : "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.twitterTitle,
    description: defaultMetadata.twitterDescription,
    images: [`https://democracy-101.templates.workers.dev/${defaultMetadata.ogImage}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="auto">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
