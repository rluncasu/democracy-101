// This file can be removed as we're now using the dynamic route structure
// with src/app/[lang]/page.tsx and src/app/_components/home-content.tsx

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the default language route (Romanian)
  redirect('/ro');
}
