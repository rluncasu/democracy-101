import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { METADATA_BASE_URL } from "@/constants/urls";

const inter = Inter({ subsets: ["latin"] });

// Remove unused metadata definitions
export const metadata: Metadata = {
  title: {
    template: '%s | Democracy 101',
    default: 'Democracy 101',
  },
  description: 'Learn about different types of democracy',
  metadataBase: new URL(METADATA_BASE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-bs-theme="auto">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
