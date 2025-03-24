/**
 * Content script for the Tab Manager Extension
 * Handles messages from the background script
 */
import {
  ExtensionMessage,
  MessageResponse,
  ChromeMessageSender,
  ResponseCallback
} from './types/chrome';
import { createAsyncMessageHandler } from './utils/messaging';
import { getPageInfo, safeIframeInteraction } from './utils/dom';

/**
 * Handle messages from the background script
 * 
 * @param message - The message received from the background script
 * @param sender - Information about the message sender
 * @returns Promise resolving with the response
 */
async function handleMessage(
  message: ExtensionMessage,
  sender: ChromeMessageSender
): Promise<MessageResponse> {
  // Log the received message for debugging
  console.log('Message received in content script:', message);
  
  // Handle different actions
  switch (message.action) {
    case 'performAction': {
      try {
        // Get current page info including iframes
        const pageInfo = getPageInfo();
        
        // Return successful response with page info
        return {
          success: true,
          message: 'Action performed successfully',
          data: pageInfo
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : String(error),
          error: String(error)
        };
      }
    }
    
    case 'interactWithIframe': {
      const iframeId = message.iframeId;
      
      if (!iframeId) {
        return {
          success: false,
          message: 'No iframe ID provided'
        };
      }
      
      try {
        // Use the safe iframe interaction function
        const result = await safeIframeInteraction(iframeId);
        
        return {
          success: true,
          message: `Successfully interacted with iframe ${iframeId}`,
          data: result
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : String(error),
          error: String(error)
        };
      }
    }
    
    default:
      // Default response for unhandled actions
      return {
        success: false,
        message: 'Unknown action requested'
      };
  }
}

// Listen for messages from the background script using async handler pattern
chrome.runtime.onMessage.addListener(
  createAsyncMessageHandler(handleMessage)
); 