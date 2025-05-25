import { useEffect, useRef, useCallback } from 'react';
import { useAnalytics } from './useAnalytics';
import { useLocation } from 'react-router-dom';

interface ActivityMetrics {
  scrollDepth: number;
  timeSpent: number;
  lastInteraction: number;
  interactionCount: number;
}

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 90];
const INTERACTION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const METRICS_INTERVAL = 30 * 1000; // 30 seconds

export const useActivityTracking = () => {
  const analytics = useAnalytics();
  const location = useLocation();
  const metricsRef = useRef<ActivityMetrics>({
    scrollDepth: 0,
    timeSpent: 0,
    lastInteraction: Date.now(),
    interactionCount: 0,
  });
  const intervalRef = useRef<number>();
  const lastScrollDepthRef = useRef<number>(0);

  // Track scroll depth
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    // Find the highest threshold reached
    const currentDepth = SCROLL_DEPTH_THRESHOLDS.reduce((highest, threshold) => {
      return scrollPercent >= threshold ? threshold : highest;
    }, 0);

    // Only track when reaching a new threshold
    if (currentDepth > lastScrollDepthRef.current) {
      lastScrollDepthRef.current = currentDepth;
      analytics.trackCustomEvent('scroll_depth', {
        depth_percentage: currentDepth,
        page_path: location.pathname,
      });
    }

    metricsRef.current.scrollDepth = currentDepth;
  }, [analytics, location.pathname]);

  // Track user interactions
  const handleInteraction = useCallback(() => {
    const now = Date.now();
    metricsRef.current.lastInteraction = now;
    metricsRef.current.interactionCount += 1;

    // Track interaction if it's been more than 5 minutes since last one
    if (now - metricsRef.current.lastInteraction > INTERACTION_TIMEOUT) {
      analytics.trackCustomEvent('user_interaction', {
        interaction_count: metricsRef.current.interactionCount,
        time_since_last: now - metricsRef.current.lastInteraction,
        page_path: location.pathname,
      });
    }
  }, [analytics, location.pathname]);

  // Track time spent on page
  const trackMetrics = useCallback(() => {
    const now = Date.now();
    const timeSpent = Math.floor((now - metricsRef.current.lastInteraction) / 1000);

    analytics.trackCustomEvent('page_metrics', {
      time_spent_seconds: timeSpent,
      scroll_depth: metricsRef.current.scrollDepth,
      interaction_count: metricsRef.current.interactionCount,
      is_active: timeSpent < INTERACTION_TIMEOUT,
      page_path: location.pathname,
    });
  }, [analytics, location.pathname]);

  useEffect(() => {
    // Reset metrics on page change
    metricsRef.current = {
      scrollDepth: 0,
      timeSpent: 0,
      lastInteraction: Date.now(),
      interactionCount: 0,
    };
    lastScrollDepthRef.current = 0;

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    // Start metrics interval
    intervalRef.current = window.setInterval(trackMetrics, METRICS_INTERVAL);

    // Track page view with initial metrics
    analytics.trackPageView({
      page_path: location.pathname,
      initial_metrics: {
        viewport_height: window.innerHeight,
        viewport_width: window.innerWidth,
        device_pixel_ratio: window.devicePixelRatio,
      },
    });

    return () => {
      // Clean up event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);

      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Track final metrics before leaving
      trackMetrics();
    };
  }, [location.pathname, handleScroll, handleInteraction, trackMetrics, analytics]);

  return {
    getMetrics: () => ({ ...metricsRef.current }),
  };
};
