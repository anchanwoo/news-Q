'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get('category') || 'all';

  const showNav = pathname.startsWith('/news');

  const onCategoryChange = (categoryId: string) => {
    router.push(categoryId === 'all' ? '/news' : `/news?category=${categoryId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 text-foreground supports-[backdrop-filter]:bg-card/60 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-jp sm:inline-block text-2xl">
              ニュースQ
            </span>
          </Link>
        </div>

        {showNav && (
          <>
            <nav className="hidden md:flex items-center space-x-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={category.id === 'all' ? '/news' : `/news?category=${category.id}`}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    currentCategory === category.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-secondary/50'
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              <Select value={currentCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
