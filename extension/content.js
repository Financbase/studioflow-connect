/**
 * Content script for the Tab Manager Extension
 * Handles messages from the background script
 */

// New and correct file path
import { getIframesInfo, safeIframeInteraction, isElementVisible, safeMessageHandling } from './utils.js';

// Function to safely interact with an iframe
function interactWithIframe(iframeId) {
  return safeIframeInteraction(iframeId);
}

// Function to get all iframe IDs in the current page
function getAllIframesInfo() {
  return getIframesInfo();
}

// Message handler function
function handleMessage(message) {
  // Log the received message for debugging
  console.log("Message received in content script:", message);
  
  // Handle different actions
  if (message.action === "performAction") {
    // Get current page info including iframes
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      elementsCount: document.querySelectorAll('*').length,
      iframes: getAllIframesInfo()
    };
    
    // Return response data
    return {
      success: true,
      message: "Action performed successfully",
      data: pageInfo
    };
  }
  
  // Handle iframe interaction request
  if (message.action === "interactWithIframe") {
    const iframeId = message.iframeId;
    
    if (!iframeId) {
      return {
        success: false,
        message: "No iframe ID provided"
      };
    }
    
    // Use the safe iframe interaction function - returns a promise
    return interactWithIframe(iframeId)
      .then(result => ({
        success: true,
        message: `Successfully interacted with iframe ${iframeId}`,
        data: result
      }))
      .catch(error => ({
        success: false,
        message: error.message,
        error: error.toString()
      }));
  }
  
  // Default response for unhandled actions
  return {
    success: false,
    message: "Unknown action requested"
  };
}

// Listen for messages from the background script using the safe pattern
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // First check if message is valid
  if (!message || !message.action) {
    sendResponse({
      success: false,
      message: "Invalid message format"
    });
    return false;
  }
  
  // Use our safe message handling utility
  return safeMessageHandling(handleMessage, message, sendResponse);
}); 