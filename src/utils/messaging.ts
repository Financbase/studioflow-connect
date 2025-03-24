/**
 * Utility for consistent Promise-based messaging between extension components
 */
import {
  ExtensionMessage,
  MessageResponse,
  ChromeMessageSender,
  ResponseCallback,
  MessageListener
} from '../types/chrome';

/**
 * Send a message to the background script and get a Promise-based response
 * 
 * @param message - Message to send to the background script
 * @returns Promise that resolves with the response
 */
export function sendMessage(message: ExtensionMessage): Promise<MessageResponse> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, (response: MessageResponse) => {
        if (chrome.runtime.lastError) {
          reject(new Error(`Chrome error: ${chrome.runtime.lastError.message}`));
          return;
        }
        
        if (!response) {
          reject(new Error('No response received'));
          return;
        }
        
        resolve(response);
      });
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

/**
 * Send a message to a specific tab and get a Promise-based response
 * 
 * @param tabId - ID of the tab to send the message to
 * @param message - Message to send to the tab
 * @returns Promise that resolves with the response
 */
export function sendTabMessage(
  tabId: number,
  message: ExtensionMessage
): Promise<MessageResponse> {
  return new Promise((resolve, reject) => {
    try {
      // First verify tab exists
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
          reject(new Error(`Tab error: ${chrome.runtime.lastError.message}`));
          return;
        }
        
        if (!tab) {
          reject(new Error(`Tab with ID ${tabId} does not exist`));
          return;
        }
        
        // Now send message to the tab
        chrome.tabs.sendMessage(tabId, message, (response: MessageResponse) => {
          if (chrome.runtime.lastError) {
            reject(new Error(`Chrome error: ${chrome.runtime.lastError.message}`));
            return;
          }
          
          if (!response) {
            reject(new Error('No response received from tab'));
            return;
          }
          
          resolve(response);
        });
      });
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

/**
 * Create an asynchronous message handler that properly manages Promise resolution
 * 
 * @param handler - Function that processes the message and returns a Promise or direct result
 * @returns Message listener function
 */
export function createAsyncMessageHandler(
  handler: (
    message: ExtensionMessage,
    sender: ChromeMessageSender
  ) => Promise<MessageResponse> | MessageResponse
): MessageListener {
  return (message, sender, sendResponse) => {
    try {
      // Execute the handler
      const result = handler(message, sender);
      
      // If result is a Promise, handle it properly
      if (result instanceof Promise) {
        result
          .then((response) => {
            try {
              sendResponse(response);
            } catch (error) {
              console.error('Error sending response:', error);
            }
          })
          .catch((error) => {
            console.error('Error in message handler:', error);
            try {
              sendResponse({
                success: false,
                error: error instanceof Error ? error.message : String(error)
              });
            } catch (responseError) {
              console.error('Error sending error response:', responseError);
            }
          });
        
        return true; // Keep the message channel open for async response
      }
      
      // For synchronous results, send response immediately
      sendResponse(result);
      return false; // No need to keep message channel open
    } catch (error) {
      console.error('Unexpected error in message handler:', error);
      try {
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      } catch (responseError) {
        console.error('Error sending error response:', responseError);
      }
      return false;
    }
  };
}

/**
 * Create a standard error response
 * 
 * @param message - Error message
 * @param details - Additional error details
 * @returns Error response object
 */
export function createErrorResponse(message: string, details?: any): MessageResponse {
  return {
    success: false,
    error: message,
    data: details
  };
}

/**
 * Create a standard success response
 * 
 * @param data - Response data
 * @param message - Optional success message
 * @returns Success response object
 */
export function createSuccessResponse(data?: any, message?: string): MessageResponse {
  return {
    success: true,
    data,
    message
  };
} 