'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/mock-data';

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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span 
              className="font-bold text-2xl text-black"
              style={{ 
                fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", "Meiryo", sans-serif',
                fontWeight: '900'
              }}
            >
              ニュースQ
            </span>
          </Link>
        </div>

        {showNav && (
          <nav className="flex items-center space-x-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/news' : `/news?category=${category.id}`}
                className={cn(
                  'text-sm font-medium transition-colors relative',
                  currentCategory === category.id
                    ? 'text-black after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-black'
                    : 'text-gray-600 hover:text-black'
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
