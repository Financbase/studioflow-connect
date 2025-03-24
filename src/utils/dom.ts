/**
 * Utility for DOM-related operations
 */
import { IframeInfo } from '../types/chrome';

/**
 * Check if an element exists in the DOM
 * 
 * @param selector - CSS selector for the element
 * @returns Whether the element exists
 */
export function elementExists(selector: string): boolean {
  return document.querySelector(selector) !== null;
}

/**
 * Get all iframes on the current page
 * 
 * @returns Array of iframe elements
 */
export function getAllIframes(): HTMLIFrameElement[] {
  return Array.from(document.querySelectorAll('iframe'));
}

/**
 * Check if an iframe with a specific ID exists
 * 
 * @param iframeId - ID of the iframe to check
 * @returns Whether the iframe exists
 */
export function iframeExists(iframeId: string): boolean {
  return document.getElementById(iframeId) !== null;
}

/**
 * Check if an element is visible
 * 
 * @param element - DOM element to check
 * @returns Whether the element is visible
 */
export function isElementVisible(element: Element | null): boolean {
  if (!element) {
    return false;
  }
  
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         element.getBoundingClientRect().width > 0 && 
         element.getBoundingClientRect().height > 0;
}

/**
 * Get information about all iframes on the page
 * 
 * @returns Array of iframe information objects
 */
export function getIframesInfo(): IframeInfo[] {
  const iframes = getAllIframes();
  return iframes.map(iframe => ({
    id: iframe.id || 'unnamed-iframe',
    src: iframe.src || 'about:blank',
    visible: isElementVisible(iframe)
  }));
}

/**
 * Safely interact with an iframe
 * 
 * @param iframeId - ID of the iframe to interact with
 * @returns Promise resolving with interaction result
 */
export function safeIframeInteraction(iframeId: string): Promise<{
  success: boolean;
  message: string;
  details: IframeInfo;
}> {
  return new Promise((resolve, reject) => {
    try {
      const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
      
      if (!iframe) {
        reject(new Error(`Iframe with ID ${iframeId} was removed or does not exist.`));
        return;
      }
      
      resolve({
        success: true,
        message: 'Successfully interacted with iframe',
        details: {
          id: iframeId,
          src: iframe.src || 'No src attribute',
          visible: isElementVisible(iframe)
        }
      });
    } catch (error) {
      reject(new Error(`Error interacting with iframe: ${
        error instanceof Error ? error.message : String(error)
      }`));
    }
  });
}

/**
 * Get current page information including all iframes
 * 
 * @returns Object with page information
 */
export function getPageInfo() {
  return {
    title: document.title,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    elementsCount: document.querySelectorAll('*').length,
    iframes: getIframesInfo()
  };
} 