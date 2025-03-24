/**
 * Background script for the Tab Manager Extension
 * Handles secure tab operations with proper error handling
 */

// Function to safely perform an action on a tab
function performActionOnTab(tabId) {
  // First check if the tab exists
  try {
    chrome.tabs.get(parseInt(tabId, 10), function(tab) {
      if (chrome.runtime.lastError) {
        console.error(`Tab existence error: ${chrome.runtime.lastError.message}`);
        return;
      }
      
      if (!tab) {
        console.error(`Tab with ID ${tabId} no longer exists`);
        return;
      }
      
      // If the tab exists, send a message to the tab
      chrome.tabs.sendMessage(tab.id, { action: "performAction" }, function(response) {
        if (chrome.runtime.lastError) {
          console.error(`Communication error: ${chrome.runtime.lastError.message}`);
          return;
        }
        
        console.log(`Action completed on tab with id ${tabId}. Response:`, response);
      });
    });
  } catch (error) {
    console.error(`Error in performActionOnTab: ${error.message}`);
  }
}

// Function to safely interact with an iframe in a tab
function interactWithIframeInTab(tabId, iframeId, callback) {
  try {
    // First check if the tab exists
    chrome.tabs.get(parseInt(tabId, 10), function(tab) {
      if (chrome.runtime.lastError) {
        const errorMsg = `Tab check failed: ${chrome.runtime.lastError.message}`;
        console.error(errorMsg);
        callback({ success: false, error: errorMsg });
        return;
      }
      
      if (!tab) {
        const errorMsg = `Tab with ID ${tabId} no longer exists`;
        console.error(errorMsg);
        callback({ success: false, error: errorMsg });
        return;
      }
      
      // If the tab exists, send a message to interact with the iframe
      chrome.tabs.sendMessage(tab.id, { 
        action: "interactWithIframe",
        iframeId: iframeId
      }, function(response) {
        if (chrome.runtime.lastError) {
          const errorMsg = `Communication error: ${chrome.runtime.lastError.message}`;
          console.error(errorMsg);
          callback({ success: false, error: errorMsg });
          return;
        }
        
        console.log(`Iframe interaction in tab ${tabId}:`, response);
        callback(response || { success: false, error: "No response received" });
      });
    });
  } catch (error) {
    console.error(`Error in interactWithIframeInTab: ${error.message}`);
    callback({ success: false, error: error.message });
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  try {
    console.log("Background received message:", message);
    
    // Check for valid messages
    if (!message || !message.action) {
      sendResponse({ success: false, error: "Invalid message format" });
      return true;
    }
    
    if (message.action === "checkTab") {
      const tabId = message.tabId;
      
      if (!tabId) {
        sendResponse({ success: false, error: "No tab ID provided" });
        return true;
      }
      
      try {
        performActionOnTab(tabId);
        sendResponse({ success: true });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
      
      return true;
    }
    
    if (message.action === "interactWithIframe") {
      const tabId = message.tabId;
      const iframeId = message.iframeId;
      
      if (!tabId || !iframeId) {
        sendResponse({ 
          success: false, 
          error: !tabId ? "No tab ID provided" : "No iframe ID provided" 
        });
        return true;
      }
      
      // Use callback pattern instead of Promise
      interactWithIframeInTab(tabId, iframeId, function(result) {
        try {
          sendResponse(result);
        } catch (responseError) {
          console.error("Error sending response:", responseError);
        }
      });
      
      return true; // Keep the message channel open
    }
    
    if (message.action === "getAllTabs") {
      chrome.tabs.query({}, function(tabs) {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        
        const tabInfo = tabs.map(function(tab) {
          return {
            id: tab.id,
            title: tab.title,
            url: tab.url
          };
        });
        
        try {
          sendResponse({ success: true, tabs: tabInfo });
        } catch (responseError) {
          console.error("Error sending tabs response:", responseError);
        }
      });
      
      return true; // Keep the message channel open
    }
    
    // Default response for unhandled actions
    sendResponse({ success: false, message: "Unknown action requested" });
    return true;
    
  } catch (error) {
    // Catch any unexpected errors in the message handler
    console.error("Unexpected error in message handler:", error);
    try {
      sendResponse({ success: false, error: "Internal extension error" });
    } catch (responseError) {
      console.error("Error sending error response:", responseError);
    }
    return true;
  }
});

// Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function(details) {
  console.log("Tab Manager Extension installed:", details);
}); 