import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const heroImageUrl = 'https://placehold.co/1920x1080.png';
  const topHeadline = "Understand the World From Every Angle";
  const dataAiHint = "global perspective";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="relative flex-1 flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={heroImageUrl}
              alt={topHeadline}
              fill
              className="object-cover"
              data-ai-hint={dataAiHint}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 p-4 max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight drop-shadow-md">
              {topHeadline}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-sm">
              AI-powered analysis of global news, giving you a complete point of view.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/news">Explore Today's Stories</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
