'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { REGIONS } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentRegion = searchParams.get('region') || 'all';

  const onRegionChange = (regionId: string) => {
    router.push(`/?region=${regionId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="hidden font-bold font-headline sm:inline-block text-xl">
              Global Gazette
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {REGIONS.map((region) => (
            <Link
              key={region.id}
              href={`/?region=${region.id}`}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                currentRegion === region.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              {region.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Select value={currentRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
