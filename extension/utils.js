/**
 * Utility functions for tab and iframe management
 */

/**
 * Safely check if an element exists in the DOM
 * @param {string} selector - CSS selector for the element
 * @returns {boolean} - Whether the element exists
 */
export function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Get all iframes on the current page
 * @returns {Array} - Array of iframe elements
 */
export function getAllIframes() {
  return Array.from(document.querySelectorAll('iframe'));
}

/**
 * Check if an iframe with a specific ID exists
 * @param {string} iframeId - ID of the iframe to check
 * @returns {boolean} - Whether the iframe exists
 */
export function iframeExists(iframeId) {
  return document.getElementById(iframeId) !== null;
}

/**
 * Get information about all iframes on the page
 * @returns {Array} - Array of iframe information objects
 */
export function getIframesInfo() {
  const iframes = getAllIframes();
  return iframes.map(iframe => ({
    id: iframe.id || 'unnamed-iframe',
    src: iframe.src || 'about:blank',
    visible: isElementVisible(iframe)
  }));
}

/**
 * Check if an element is visible
 * @param {Element} element - DOM element to check
 * @returns {boolean} - Whether the element is visible
 */
export function isElementVisible(element) {
  if (!element) return false;
  
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         element.offsetWidth > 0 && 
         element.offsetHeight > 0;
}

/**
 * Safe iframe interaction with error handling
 * @param {string} iframeId - ID of the iframe to interact with
 * @returns {Promise} - Promise resolving with interaction result
 */
export function safeIframeInteraction(iframeId) {
  return new Promise((resolve, reject) => {
    try {
      const iframe = document.getElementById(iframeId);
      
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
      reject(new Error(`Error interacting with iframe: ${error.message}`));
    }
  });
}

/**
 * Safely handle message sending and receiving to prevent "Unchecked runtime.lastError" errors
 * @param {Function} messageHandler - Function that handles the message
 * @param {Object} request - The message request object
 * @param {Function} sendResponse - Function to send response back
 * @returns {boolean} - Whether to keep the message channel open
 */
export function safeMessageHandling(messageHandler, request, sendResponse) {
  try {
    const result = messageHandler(request);
    
    // If result is a Promise, handle it properly
    if (result instanceof Promise) {
      result
        .then(response => {
          try {
            sendResponse(response);
          } catch (error) {
            console.error('Error sending response:', error);
            
            // Check for runtime.lastError
            if (chrome.runtime && chrome.runtime.lastError) {
              console.error('Runtime error:', chrome.runtime.lastError.message);
            }
          }
        })
        .catch(error => {
          try {
            sendResponse({ success: false, error: error.message });
          } catch (responseError) {
            console.error('Error sending error response:', responseError);
            
            // Check for runtime.lastError
            if (chrome.runtime && chrome.runtime.lastError) {
              console.error('Runtime error:', chrome.runtime.lastError.message);
            }
          }
        });
      
      return true; // Keep the message channel open for async response
    }
    
    // For synchronous results
    try {
      sendResponse(result);
    } catch (error) {
      console.error('Error sending response:', error);
      
      // Check for runtime.lastError
      if (chrome.runtime && chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError.message);
      }
    }
    
    return false; // No need to keep message channel open
  } catch (error) {
    console.error('Error in message handler:', error);
    
    try {
      sendResponse({ success: false, error: 'Internal extension error' });
    } catch (responseError) {
      console.error('Error sending error response:', responseError);
      
      // Check for runtime.lastError
      if (chrome.runtime && chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError.message);
      }
    }
    
    return false;
  }
}

/**
 * Check if a resource exists in the extension
 * @param {string} resourcePath - Path to the resource relative to extension root
 * @returns {Promise<boolean>} - Promise resolving to whether the resource exists
 */
export function checkResourceExists(resourcePath) {
  return new Promise((resolve) => {
    const resourceUrl = chrome.runtime.getURL(resourcePath);
    
    fetch(resourceUrl, { method: 'HEAD' })
      .then(response => {
        resolve(response.ok);
      })
      .catch(() => {
        resolve(false);
      });
  });
} 