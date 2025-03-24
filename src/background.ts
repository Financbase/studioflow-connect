/**
 * Background script for the Tab Manager Extension
 * Handles secure tab operations with proper error handling
 */
import {
  ExtensionMessage,
  MessageResponse,
  ChromeMessageSender,
  TabInfo
} from './types/chrome';
import {
  createAsyncMessageHandler,
  sendTabMessage,
  createSuccessResponse,
  createErrorResponse
} from './utils/messaging';

/**
 * Safely perform an action on a tab
 * 
 * @param tabId - ID of the tab to perform action on
 * @returns Promise that resolves with the tab's response
 */
async function performActionOnTab(tabId: number): Promise<MessageResponse> {
  try {
    // Get tab information to verify it exists
    const message: ExtensionMessage = { action: 'performAction' };
    return await sendTabMessage(tabId, message);
  } catch (error) {
    // Log the error for debugging
    console.error(`Error in performActionOnTab: ${error instanceof Error ? error.message : String(error)}`);
    
    // Return error response
    return createErrorResponse(
      `Failed to perform action on tab: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Interact with an iframe in a tab
 * 
 * @param tabId - ID of the tab containing the iframe
 * @param iframeId - ID of the iframe to interact with
 * @returns Promise that resolves with the interaction result
 */
async function interactWithIframeInTab(
  tabId: number,
  iframeId: string
): Promise<MessageResponse> {
  try {
    // Create message for iframe interaction
    const message: ExtensionMessage = { 
      action: 'interactWithIframe',
      iframeId
    };
    
    // Send message to tab
    return await sendTabMessage(tabId, message);
  } catch (error) {
    // Log the error for debugging
    console.error(`Error in interactWithIframeInTab: ${error instanceof Error ? error.message : String(error)}`);
    
    // Return error response
    return createErrorResponse(
      `Failed to interact with iframe: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Get information about all open tabs
 * 
 * @returns Promise that resolves with tabs information
 */
async function getAllTabs(): Promise<MessageResponse> {
  return new Promise((resolve) => {
    try {
      chrome.tabs.query({}, (tabs) => {
        if (chrome.runtime.lastError) {
          resolve(createErrorResponse(`Failed to query tabs: ${chrome.runtime.lastError.message}`));
          return;
        }
        
        const tabInfo: TabInfo[] = tabs.map((tab) => ({
          id: tab.id ?? -1,
          title: tab.title ?? 'Untitled',
          url: tab.url ?? 'about:blank'
        }));
        
        resolve(createSuccessResponse({ tabs: tabInfo }));
      });
    } catch (error) {
      resolve(createErrorResponse(
        `Error getting tabs: ${error instanceof Error ? error.message : String(error)}`
      ));
    }
  });
}

/**
 * Handle messages sent to the background script
 * 
 * @param message - The message received
 * @param sender - Information about the message sender
 * @returns Promise resolving with the response
 */
async function handleMessage(
  message: ExtensionMessage,
  sender: ChromeMessageSender
): Promise<MessageResponse> {
  console.log('Background received message:', message);
  
  // Check for valid messages
  if (!message || !message.action) {
    return createErrorResponse('Invalid message format');
  }
  
  switch (message.action) {
    case 'checkTab': {
      const tabId = message.tabId;
      
      if (!tabId) {
        return createErrorResponse('No tab ID provided');
      }
      
      // Convert tabId to number if it's a string
      const numericTabId = typeof tabId === 'string' ? parseInt(tabId, 10) : tabId;
      
      if (isNaN(numericTabId)) {
        return createErrorResponse('Invalid tab ID format');
      }
      
      return await performActionOnTab(numericTabId);
    }
    
    case 'interactWithIframe': {
      const tabId = message.tabId;
      const iframeId = message.iframeId;
      
      if (!tabId) {
        return createErrorResponse('No tab ID provided');
      }
      
      if (!iframeId) {
        return createErrorResponse('No iframe ID provided');
      }
      
      // Convert tabId to number if it's a string
      const numericTabId = typeof tabId === 'string' ? parseInt(tabId, 10) : tabId;
      
      if (isNaN(numericTabId)) {
        return createErrorResponse('Invalid tab ID format');
      }
      
      return await interactWithIframeInTab(numericTabId, iframeId);
    }
    
    case 'getAllTabs': {
      return await getAllTabs();
    }
    
    default:
      return createErrorResponse('Unknown action requested');
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
  createAsyncMessageHandler(handleMessage)
);

// Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Tab Manager Extension installed:', details);
}); 