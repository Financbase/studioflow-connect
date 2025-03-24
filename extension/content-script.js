/**
 * Content script for the Tab Manager Extension
 * Handles messages from the background script
 */

// Since content scripts can't use ES modules directly, we use a regular script

// Helper function to check if an element is visible
function isElementVisible(element) {
  if (!element) return false;
  
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         element.offsetWidth > 0 && 
         element.offsetHeight > 0;
}

// Function to get all iframes on the current page
function getAllIframes() {
  return Array.from(document.querySelectorAll('iframe'));
}

// Function to get information about all iframes
function getIframesInfo() {
  const iframes = getAllIframes();
  return iframes.map(iframe => ({
    id: iframe.id || 'unnamed-iframe',
    src: iframe.src || 'about:blank',
    visible: isElementVisible(iframe)
  }));
}

// Function to safely interact with an iframe
function interactWithIframe(iframeId) {
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

// Message handler function
function handleMessage(message, sender, sendResponse) {
  // Log the received message for debugging
  console.log("Message received in content script:", message);
  
  // Handle different actions
  if (message.action === "performAction") {
    try {
      // Get current page info including iframes
      const pageInfo = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        elementsCount: document.querySelectorAll('*').length,
        iframes: getIframesInfo()
      };
      
      // Send response back
      sendResponse({
        success: true,
        message: "Action performed successfully",
        data: pageInfo
      });
    } catch (error) {
      sendResponse({
        success: false,
        message: error.message,
        error: error.toString()
      });
    }
    return true; // Keep the message channel open
  }
  
  // Handle iframe interaction request
  if (message.action === "interactWithIframe") {
    const iframeId = message.iframeId;
    
    if (!iframeId) {
      sendResponse({
        success: false,
        message: "No iframe ID provided"
      });
      return true;
    }
    
    // Use the safe iframe interaction function
    interactWithIframe(iframeId)
      .then(result => {
        sendResponse({
          success: true,
          message: `Successfully interacted with iframe ${iframeId}`,
          data: result
        });
      })
      .catch(error => {
        sendResponse({
          success: false,
          message: error.message,
          error: error.toString()
        });
      });
    
    return true; // Keep the message channel open
  }
  
  // Default response for unhandled actions
  sendResponse({
    success: false,
    message: "Unknown action requested"
  });
  
  return true; // Keep the message channel open
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(handleMessage); 