import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { FilteredArticle } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

export function ArticleCard({ article }: { article: FilteredArticle }) {
  const relevancePercent = Math.round(article.relevanceScore * 100);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-headline text-xl leading-snug">
            {article.title}
          </CardTitle>
          <Badge variant="outline">{article.source}</Badge>
        </div>
        <CardDescription className="pt-2">{article.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>AI Relevance Score</span>
            <span className="font-semibold text-foreground">{relevancePercent}%</span>
          </div>
          <Progress value={relevancePercent} aria-label={`${relevancePercent}% relevance score`} />
          <p className="text-xs text-muted-foreground pt-1 flex items-start gap-1.5">
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-accent"/>
            <span>
              <span className="font-semibold text-foreground">Reason:</span> {article.reason}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/article/${slugify(article.title)}`}>
            Read Full Story
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
