import '#/styles/globals.css';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Broedplaats calculator',
    template: '%s | Broedplaats calculator',
  },
  metadataBase: new URL('https://app-router.vercel.app'),
  description: 'A calculator for broedplaatsen',
  openGraph: {
    title: 'Broedplaats calculator',
    description: 'A calculator for broedplaatsen',
    images: [`/api/og?title=Next.js App Router`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="[color-scheme:dark]">
      <body className="overflow-y-scroll bg-gray-1100 pb-36">
        {/* <GlobalNav /> */}

        {/* <div className="lg:pl-72"> */}
        <div>
          <div className="max-w-9xl mx-auto space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {children}
            </div>
            <Byline />
          </div>
        </div>
      </body>
    </html>
  );
}
