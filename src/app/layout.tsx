
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; 
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; 

const geistSans = Geist({ 
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ 
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WellMeds - AI-Powered Medicine Search and Information',
  description: 'Instantly search over 900 medicines by name, composition, or by scanning a prescription. WellMeds uses AI to provide detailed information on usage, dosage, and side effects in multiple languages.',
  keywords: [
    'Medicine search', 'Online pharmacy', 'Drug information', 'AI medicine finder',
    'Prescription scanner', 'Medicine details', 'Salt composition', 'WellMeds',
    'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Health app', 'PWA', 'Indian medicines'
  ],
  creator: 'MrTG1B',
  publisher: 'MrTG1B',
  robots: {
    index: true,
    follow: true,
  },
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  openGraph: {
    title: 'WellMeds - AI-Powered Medicine Search',
    description: 'Scan prescriptions or search for medicine details instantly. AI-enhanced information in English, Hindi, and Bengali.',
    url: 'https://wellmed.vercel.app/',
    siteName: 'WellMeds',
    images: [
      {
        url: 'https://wellmed.vercel.app/images/logo_transparent.png', // Assuming you have a banner image
        width: 1200,
        height: 630,
        alt: 'WellMeds Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WellMeds - Instant, AI-Powered Medicine Information',
    description: 'Your intelligent PWA for searching medicines by name, composition, or prescription scan.',
    images: ['https://wellmed.vercel.app/images/logo_transparent.png'],
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#008080" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WellMeds" />
        {/* You can add apple-touch-icon links here if you have specific iOS icons */}
        {/* e.g., <link rel="apple-touch-icon" href="/images/apple-icon-180x180.png" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('WellMeds SW registered: ', registration);
                  }).catch(registrationError => {
                    console.log('WellMeds SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
