import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { FilteredArticle } from '@/lib/types';
import { ArrowUpRight, Clock } from 'lucide-react';

export function ArticleCard({
  article,
  isFeatured = false,
}: {
  article: FilteredArticle;
  isFeatured?: boolean;
}) {
  const linkHref = `/article/${article.slug}`;
  const placeholderImage = `https://placehold.co/1200x630.png`;

  if (isFeatured) {
    return (
      <div className="group cursor-pointer">
        <Link href={linkHref}>
          <div className="relative overflow-hidden">
            {/* Hero Image */}
            <div className="relative aspect-[3/2] mb-8 overflow-hidden">
              <Image
                src={article.imageUrl || placeholderImage}
                alt={article.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="magazine cover story"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <Badge 
                  variant="secondary" 
                  className="bg-white/90 text-black font-medium px-3 py-1 text-sm backdrop-blur-sm"
                >
                  {article.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Source and reading time */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-primary">{article.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>5 min read</span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300"
                style={{ 
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                  fontWeight: '800'
                }}
              >
                {article.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {article.reason}
              </p>

              {/* Read more */}
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                <span>Read Full Analysis</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <Link href={linkHref}>
        <article className="space-y-4">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={article.imageUrl || placeholderImage}
              alt={article.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="magazine article"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            {/* Meta */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs font-medium">
                {article.category}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                {article.source}
              </span>
            </div>

            {/* Title */}
            <h2 
              className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-3"
              style={{ 
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                fontWeight: '700'
              }}
            >
              {article.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {article.reason}
            </p>

            {/* Read more indicator */}
            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read more</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
