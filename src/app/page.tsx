import { WordmarkLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const imageUrl = 'https://placehold.co/800x600.png';
  const dataAiHint = "city street illustration";

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-2xl bg-card shadow-2xl relative font-jp overflow-hidden rounded-lg">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">どんなに世の中変わっても、街のニュースを大切に！</p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-foreground text-background text-xs font-bold px-2 py-1">
                NEWS GUIDE
              </div>
              <p className="text-xs text-muted-foreground mt-1">パーフェクトガイド</p>
            </div>
          </div>
          
          <div className="my-4">
            <WordmarkLogo className="w-full h-auto max-w-sm" />
          </div>

          <div className="flex justify-between items-end">
             <div>
                <p className="text-xs font-bold text-muted-foreground">MAGAZINE FOR DAILY NEWS</p>
                <p className="text-xs text-muted-foreground">2024 SEPTEMBER Issue 001 ¥800</p>
             </div>
             <Link href="/news" className="text-5xl font-extrabold hover:text-primary transition-colors">9</Link>
          </div>
        </div>

        <div className="relative mt-4">
           <div className="absolute top-8 left-4 sm:left-8 text-white font-extrabold text-5xl sm:text-7xl leading-none tracking-tighter" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            <p>世界</p>
            <p className="ml-8 sm:ml-12">の視点</p>
            <p className="ml-2 sm:ml-4">から、</p>
            <p className="ml-12 sm:ml-16">今日の</p>
            <p className="ml-4 sm:ml-8">ニュース</p>
            <p className="ml-16 sm:ml-20">を。</p>
          </div>
          <Link href="/news">
            <Image
              src={imageUrl}
              alt="Magazine cover illustration of a city street"
              width={800}
              height={600}
              className="w-full h-auto"
              data-ai-hint={dataAiHint}
              priority
            />
          </Link>
        </div>
        
      </main>
    </div>
  );
}
