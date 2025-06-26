export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PageView {
  page: string;
  title: string;
  url: string;
}

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';

  // 페이지 뷰 추적
  trackPageView(pageView: PageView) {
    if (!this.isProduction) {
      console.log('📊 Page View:', pageView);
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageView.title,
        page_location: pageView.url,
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('pageview', {
        url: pageView.url,
        title: pageView.title,
      });
    }
  }

  // 이벤트 추적
  trackEvent(event: AnalyticsEvent) {
    if (!this.isProduction) {
      console.log('📊 Event:', event);
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', {
        name: event.action,
        category: event.category,
        label: event.label,
        value: event.value,
      });
    }
  }

  // 에러 추적
  trackError(error: Error, context?: Record<string, any>) {
    if (!this.isProduction) {
      console.error('🚨 Error:', error, context);
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        ...context,
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', {
        name: 'error',
        category: 'error',
        label: error.message,
        ...context,
      });
    }
  }

  // 성능 측정
  trackPerformance(metric: { name: string; value: number; label?: string }) {
    if (!this.isProduction) {
      console.log('⚡ Performance:', metric);
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: metric.name,
        value: Math.round(metric.value),
        event_label: metric.label,
      });
    }
  }
}

export const analytics = new Analytics();

// 자동 성능 모니터링
if (typeof window !== 'undefined') {
  // Core Web Vitals 모니터링
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          analytics.trackPerformance({
            name: 'LCP',
            value: entry.startTime,
            label: 'Largest Contentful Paint',
          });
        } else if (entry.entryType === 'first-input') {
          analytics.trackPerformance({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            label: 'First Input Delay',
          });
        } else if (entry.entryType === 'layout-shift') {
          analytics.trackPerformance({
            name: 'CLS',
            value: (entry as any).value,
            label: 'Cumulative Layout Shift',
          });
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
} 