import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'LeccionesLab — Learn. Build. Understand.',
  description:
    'A free-first developer learning and documentation platform for tutorials and technical reference.',
  metadataBase: new URL('https://leccioneslab.dev'),
  openGraph: {
    title: 'LeccionesLab — Learn. Build. Understand.',
    description:
      'A free-first developer learning and documentation platform for tutorials and technical reference.',
    siteName: 'LeccionesLab',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeccionesLab — Learn. Build. Understand.',
    description:
      'A free-first developer learning and documentation platform for tutorials and technical reference.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#111014] text-[#F4F0F7] font-sans selection:bg-[#292330] selection:text-[#D6C8FF] antialiased">
        <RootProvider
          theme={{
            forcedTheme: 'dark',
          }}
          search={{
            enabled: false,
          }}
        >
          <SiteHeader />
          <div className="flex-1 flex flex-col">{children}</div>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  );
}
