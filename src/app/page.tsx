import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const imageUrl = 'https://placehold.co/1920x1080.png';
  const dataAiHint = "Japanese street sunset";

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-background text-white">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="A Japanese street at sunset, rotated 180 degrees"
        fill
        className="object-cover transform rotate-180 z-0"
        data-ai-hint={dataAiHint}
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 
          className="font-jp font-extrabold text-7xl md:text-9xl tracking-tighter"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}
        >
          ニュースQ
        </h1>
        <p 
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          AIが世界のニュースを多角的に分析し、あなただけの深い洞察を提供します。
        </p>
        <Link href="/news" passHref>
          <Button variant="outline" size="lg" className="mt-8 bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300">
            最新ニュースを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
