import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { FilteredArticle } from '@/lib/types';
import { slugify, cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function ArticleCard({
  article,
  isFeatured = false,
}: {
  article: FilteredArticle;
  isFeatured?: boolean;
}) {

  const linkHref = `/article/${slugify(article.title)}?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description.substring(0, 500))}&source=${encodeURIComponent(article.source)}&link=${encodeURIComponent(article.link)}`;

  if (isFeatured) {
    return (
       <Card className="flex flex-col md:flex-row w-full overflow-hidden border-0 shadow-none rounded-none">
        <div className="flex-1 p-0">
          <CardHeader className="p-0">
            <Badge variant="secondary" className="mb-4 w-fit">
              {article.source}
            </Badge>
            <CardTitle className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight hover:underline">
              <Link href={linkHref}>
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <CardDescription className="text-base md:text-lg text-foreground/80">
              {article.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="p-0 mt-6">
             <Link href={linkHref} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Read the briefing <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden border-0 shadow-none rounded-none bg-transparent">
      <CardHeader className="p-0">
        <Badge variant="secondary" className="mb-2 w-fit">{article.source}</Badge>
        <CardTitle className="font-headline text-xl leading-snug hover:underline">
           <Link href={linkHref}>
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 mt-2">
        <CardDescription className="text-sm">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-0 mt-4">
         <Link href={linkHref} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            Read briefing <ArrowRight className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
