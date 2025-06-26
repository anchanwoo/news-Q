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
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 
          className="font-jp font-extrabold text-7xl md:text-9xl tracking-tighter"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}
        >
          ニュースQ
        </h1>
        <p 
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/95"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          AIが世界のニュースを多角的に分析し、あなただけの深い洞察を提供します。
        </p>
        <Link href="/news" passHref>
          <Button variant="outline" size="lg" className="mt-8 bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
            最新ニュースを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
