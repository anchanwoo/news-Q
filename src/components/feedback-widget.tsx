'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackData {
  type: 'bug' | 'feature' | 'general';
  message: string;
  email?: string;
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'general',
    message: '',
    email: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.message.trim()) {
      toast({
        title: '피드백을 입력해주세요',
        description: '메시지를 작성해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 서비스에서는 API 엔드포인트로 전송
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...feedback,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });

      if (response.ok) {
        toast({
          title: '피드백이 전송되었습니다',
          description: '소중한 의견 감사합니다!',
        });
        setIsOpen(false);
        setFeedback({ type: 'general', message: '', email: '' });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      toast({
        title: '전송 실패',
        description: '잠시 후 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>피드백 보내기</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>피드백 유형</Label>
            <RadioGroup
              value={feedback.type}
              onValueChange={(value: 'bug' | 'feature' | 'general') =>
                setFeedback(prev => ({ ...prev, type: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">버그 신고</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feature" id="feature" />
                <Label htmlFor="feature">기능 제안</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general">일반 의견</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea
              id="message"
              placeholder="피드백을 자세히 작성해주세요..."
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일 (선택사항)</Label>
            <input
              id="email"
              type="email"
              placeholder="답변을 받으실 이메일"
              value={feedback.email}
              onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              '전송 중...'
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                피드백 보내기
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 