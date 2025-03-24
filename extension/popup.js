/**
 * Popup script for the Tab Manager Extension
 * Handles the UI and interactions with the background script
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const tabIdInput = document.getElementById('tabId');
  const checkTabButton = document.getElementById('checkTab');
  const tabsListContainer = document.getElementById('tabsList');
  const iframeIdInput = document.getElementById('iframeId');
  const interactButton = document.getElementById('interactButton');
  const iframesListContainer = document.getElementById('iframesList');
  const statusContainer = document.getElementById('status');
  const resourceStatus = document.getElementById('resource-status');
  
  // Show the status element initially
  statusContainer.className = ''; // Remove hidden class
  
  // Set initial status
  resourceStatus.textContent = 'Extension ready';
  resourceStatus.style.color = '#2e7d32';
  
  // Function to display status messages
  function displayStatus(message, isError = false) {
    statusContainer.textContent = message;
    statusContainer.className = isError ? 'error' : 'success';
  }
  
  // Function to display error messages
  function displayError(message) {
    displayStatus(message, true);
  }
  
  // Function to safely send messages with error handling
  function safeSendMessage(message, callback) {
    try {
      chrome.runtime.sendMessage(message, function(response) {
        if (chrome.runtime.lastError) {
          callback({ 
            success: false, 
            error: `Communication error: ${chrome.runtime.lastError.message}` 
          });
          return;
        }
        
        callback(response || { success: false, error: "No response received" });
      });
    } catch (error) {
      callback({ 
        success: false, 
        error: `Exception: ${error.message}` 
      });
    }
  }
  
  // Function to check a tab
  function checkTab(tabId) {
    if (!tabId) {
      displayError('Please enter a tab ID');
      return;
    }
    
    displayStatus('Checking tab...');
    
    safeSendMessage({ 
      action: 'checkTab', 
      tabId: tabId 
    }, function(response) {
      if (response && response.success) {
        displayStatus(`Successfully checked tab ${tabId}`);
      } else {
        displayError(response && response.error ? response.error : 'Unknown error');
      }
    });
  }
  
  // Function to interact with an iframe
  function interactWithIframe(tabId, iframeId) {
    if (!tabId) {
      displayError('Please select a tab first');
      return;
    }
    
    if (!iframeId) {
      displayError('Please enter an iframe ID');
      return;
    }
    
    displayStatus('Interacting with iframe...');
    
    safeSendMessage({ 
      action: 'interactWithIframe', 
      tabId: tabId,
      iframeId: iframeId
    }, function(response) {
      if (response && response.success) {
        displayStatus(`Successfully interacted with iframe ${iframeId} in tab ${tabId}`);
        if (response.data) {
          const detailsStr = JSON.stringify(response.data, null, 2);
          console.log("Iframe interaction details:", detailsStr);
        }
      } else {
        displayError(response && response.error ? response.error : 'Unknown error');
      }
    });
  }
  
  // Function to display iframes in a tab
  function displayIframes(tabId) {
    if (!tabId) {
      iframesListContainer.innerHTML = '<p>Please select a tab first</p>';
      return;
    }
    
    iframesListContainer.innerHTML = '<p>Loading iframes...</p>';
    
    safeSendMessage({ 
      action: 'checkTab', 
      tabId: tabId 
    }, function(response) {
      if (response && response.success) {
        if (response.data && response.data.iframes) {
          // Display the iframes list
          const iframes = response.data.iframes;
          if (iframes.length === 0) {
            iframesListContainer.innerHTML = '<p>No iframes found in this tab</p>';
          } else {
            const iframesList = document.createElement('ul');
            iframes.forEach(function(iframe) {
              const li = document.createElement('li');
              li.textContent = `ID: ${iframe.id}, Source: ${iframe.src.substring(0, 30)}...`;
              li.addEventListener('click', function() {
                iframeIdInput.value = iframe.id;
              });
              iframesList.appendChild(li);
            });
            iframesListContainer.innerHTML = '';
            iframesListContainer.appendChild(iframesList);
          }
        } else {
          iframesListContainer.innerHTML = '<p>No iframe information available</p>';
        }
      } else {
        iframesListContainer.innerHTML = '<p>Error getting iframe information: ' + 
          (response && response.error ? response.error : 'Unknown error') + '</p>';
      }
    });
  }
  
  // Get all tabs and display them
  function getAllTabs() {
    tabsListContainer.innerHTML = '<p>Loading tabs...</p>';
    
    safeSendMessage({ action: 'getAllTabs' }, function(response) {
      if (response && response.success && response.tabs) {
        const tabs = response.tabs;
        if (tabs.length === 0) {
          tabsListContainer.innerHTML = '<p>No tabs found</p>';
        } else {
          const tabsList = document.createElement('ul');
          tabs.forEach(function(tab) {
            const li = document.createElement('li');
            // Truncate title if it's too long
            const title = tab.title ? tab.title.substring(0, 30) + '...' : 'Untitled';
            li.textContent = `ID: ${tab.id}, Title: ${title}`;
            li.addEventListener('click', function() {
              tabIdInput.value = tab.id;
              // Display iframes in the selected tab
              displayIframes(tab.id);
            });
            tabsList.appendChild(li);
          });
          tabsListContainer.innerHTML = '';
          tabsListContainer.appendChild(tabsList);
        }
      } else {
        tabsListContainer.innerHTML = '<p>Error getting tabs: ' + 
          (response && response.error ? response.error : 'Unknown error') + '</p>';
      }
    });
  }
  
  // Button event listeners
  checkTabButton.addEventListener('click', function() {
    const tabId = tabIdInput.value.trim();
    checkTab(tabId);
  });
  
  interactButton.addEventListener('click', function() {
    const tabId = tabIdInput.value.trim();
    const iframeId = iframeIdInput.value.trim();
    interactWithIframe(tabId, iframeId);
  });
  
  // Initialize - get all tabs when popup opens
  getAllTabs();
}); 