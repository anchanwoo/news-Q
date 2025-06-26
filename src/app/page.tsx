import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const imageUrl = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
  const dataAiHint = "Japanese street sunset Tokyo golden hour";

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-background text-white">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="A beautiful Japanese street at sunset in Tokyo during golden hour"
        fill
        className="object-cover z-0"
        data-ai-hint={dataAiHint}
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        {/* POPEYE Style Japanese Title */}
        <h1 
          className="font-bold text-8xl md:text-[12rem] lg:text-[14rem] tracking-wide mb-4"
          style={{ 
            fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", "Meiryo", sans-serif',
            textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
            letterSpacing: '0.1em',
            fontWeight: '900'
          }}
        >
          ニュースQ
        </h1>
        
        {/* English Subtitle */}
        <p 
          className="mt-6 max-w-3xl text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-relaxed"
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}
        >
          AI-Powered Global News Analysis
        </p>
        
        <p 
          className="mt-4 max-w-4xl text-base md:text-lg lg:text-xl text-white/90 leading-relaxed"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          Discover deep insights from worldwide news sources with our intelligent analysis platform
        </p>
        
        <Link href="/news" passHref>
          <Button 
            variant="outline" 
            size="lg" 
            className="mt-10 px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Explore Latest News
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
