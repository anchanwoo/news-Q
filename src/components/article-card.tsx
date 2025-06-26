import Link from 'next/link';
import Image from 'next/image';
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
import { slugify } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export function ArticleCard({
  article,
  isFeatured = false,
}: {
  article: FilteredArticle;
  isFeatured?: boolean;
}) {
  const linkParams = new URLSearchParams({
    // We only need the slug now, as data will be fetched from cache
  });

  const linkHref = `/article/${article.slug}?${linkParams.toString()}`;
  const placeholderImage = `https://placehold.co/1200x630.png`;

  if (isFeatured) {
    return (
       <Card className="w-full overflow-hidden border-0 shadow-none rounded-none">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
               <Link href={linkHref}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                        src={article.imageUrl || placeholderImage}
                        alt={article.title}
                        className="rounded-lg object-cover"
                        data-ai-hint="news illustration"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                 </AspectRatio>
                </Link>
            </div>
            <div className="flex-1 p-0 md:w-1/2">
              <CardHeader className="p-0">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="w-fit">
                    {article.source}
                  </Badge>
                  <Badge variant="outline" className="w-fit">
                    {article.category}
                  </Badge>
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl lg:text-5xl leading-tight hover:underline">
                  <Link href={linkHref}>
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <CardDescription className="text-base md:text-lg text-foreground/80">
                  {article.reason}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-0 mt-6">
                <Link href={linkHref} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                  Read the briefing <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden border-0 shadow-none rounded-none bg-transparent">
      <Link href={linkHref} className='mb-4'>
        <AspectRatio ratio={16 / 9}>
            <Image
                src={article.imageUrl || placeholderImage}
                alt={article.title}
                className="rounded-lg object-cover"
                data-ai-hint="news"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </AspectRatio>
      </Link>
      <CardHeader className="p-0">
        <div className="flex items-center gap-2 mb-2">
           <Badge variant="secondary" className="w-fit">{article.source}</Badge>
           <Badge variant="outline" className="w-fit">{article.category}</Badge>
        </div>
        <CardTitle className="font-headline text-xl leading-snug hover:underline">
           <Link href={linkHref}>
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 mt-2">
        <CardDescription className="text-sm">{article.reason}</CardDescription>
      </CardContent>
      <CardFooter className="p-0 mt-4">
         <Link href={linkHref} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            Read briefing <ArrowRight className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
