import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FeedbackWidget } from '@/components/feedback-widget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ニュースQ - AI 기반 뉴스 분석 서비스',
    template: '%s | ニュースQ'
  },
  description: 'AI가 세계의 뉴스를 다각도로 분석하여 깊이 있는 통찰력을 제공하는 뉴스 플랫폼입니다.',
  keywords: ['뉴스', 'AI', '분석', '인공지능', '뉴스분석', '일본뉴스', '글로벌뉴스'],
  authors: [{ name: 'News-Q Team' }],
  creator: 'News-Q Team',
  publisher: 'News-Q',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://news-q.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://news-q.vercel.app',
    title: 'ニュースQ - AI 기반 뉴스 분석 서비스',
    description: 'AI가 세계의 뉴스를 다각도로 분석하여 깊이 있는 통찰력을 제공하는 뉴스 플랫폼입니다.',
    siteName: 'ニュースQ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ニュースQ - AI 기반 뉴스 분석 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ニュースQ - AI 기반 뉴스 분석 서비스',
    description: 'AI가 세계의 뉴스를 다각도로 분석하여 깊이 있는 통찰력을 제공하는 뉴스 플랫폼입니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <FeedbackWidget />
        <Toaster />
      </body>
    </html>
  );
}
