
import { useState, useEffect, useCallback } from 'react';

type PerformanceMetric = {
  name: string;
  value: number;
  unit: string;
  description: string;
};

export function usePerformanceMonitoring(options = { enabled: true }) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isCollecting, setIsCollecting] = useState(options.enabled);
  
  const collectMetrics = useCallback(() => {
    if (!window.performance) {
      console.warn('Performance API not supported in this browser');
      return;
    }
    
    try {
      // Use Performance API to get metrics
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintTimings = performance.getEntriesByType('paint');
      
      const firstPaint = paintTimings.find(entry => entry.name === 'first-paint');
      const firstContentfulPaint = paintTimings.find(entry => entry.name === 'first-contentful-paint');
      
      const collectedMetrics: PerformanceMetric[] = [];
      
      if (navigationTiming) {
        // DNS lookup time
        collectedMetrics.push({
          name: 'DNS Lookup',
          value: Math.round(navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart),
          unit: 'ms',
          description: 'Time taken to look up the domain name'
        });
        
        // Connection time
        collectedMetrics.push({
          name: 'TCP Connection',
          value: Math.round(navigationTiming.connectEnd - navigationTiming.connectStart),
          unit: 'ms',
          description: 'Time taken to establish TCP connection'
        });
        
        // Time to first byte
        collectedMetrics.push({
          name: 'TTFB',
          value: Math.round(navigationTiming.responseStart - navigationTiming.requestStart),
          unit: 'ms',
          description: 'Time to First Byte'
        });
        
        // DOM Content Loaded - fixed navigationStart reference
        collectedMetrics.push({
          name: 'DOM Content Loaded',
          value: Math.round(navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime),
          unit: 'ms',
          description: 'DOM Content Loaded event time'
        });
        
        // Load event - fixed navigationStart reference
        collectedMetrics.push({
          name: 'Page Load',
          value: Math.round(navigationTiming.loadEventEnd - navigationTiming.startTime),
          unit: 'ms',
          description: 'Total page load time'
        });
      }
      
      if (firstPaint) {
        collectedMetrics.push({
          name: 'First Paint',
          value: Math.round(firstPaint.startTime),
          unit: 'ms',
          description: 'Time until first pixel rendered'
        });
      }
      
      if (firstContentfulPaint) {
        collectedMetrics.push({
          name: 'First Contentful Paint',
          value: Math.round(firstContentfulPaint.startTime),
          unit: 'ms',
          description: 'Time until content rendered'
        });
      }
      
      // Add memory usage if available - with proper type checking
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          collectedMetrics.push({
            name: 'JS Heap Size',
            value: Math.round(memoryInfo.usedJSHeapSize / (1024 * 1024) * 100) / 100,
            unit: 'MB',
            description: 'JavaScript heap size used'
          });
        }
      }
      
      setMetrics(collectedMetrics);
    } catch (error) {
      console.error('Error collecting performance metrics:', error);
    }
  }, []);
  
  const startCollecting = useCallback(() => {
    setIsCollecting(true);
  }, []);
  
  const stopCollecting = useCallback(() => {
    setIsCollecting(false);
  }, []);
  
  const clearMetrics = useCallback(() => {
    setMetrics([]);
    performance.clearMarks();
    performance.clearMeasures();
    performance.clearResourceTimings();
  }, []);
  
  // Collect metrics on initial render if enabled
  useEffect(() => {
    if (isCollecting) {
      // Wait for page to fully load before collecting metrics
      if (document.readyState === 'complete') {
        collectMetrics();
      } else {
        window.addEventListener('load', collectMetrics);
        return () => window.removeEventListener('load', collectMetrics);
      }
    }
  }, [isCollecting, collectMetrics]);
  
  return {
    metrics,
    isCollecting,
    startCollecting,
    stopCollecting,
    collectMetrics,
    clearMetrics
  };
}
