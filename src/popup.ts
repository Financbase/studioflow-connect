/**
 * Popup script for the Tab Manager Extension
 * Handles the UI and interactions with the background script
 */
import { ExtensionMessage, IframeInfo, TabInfo } from './types/chrome';
import { sendMessage } from './utils/messaging';

// DOM Elements interface to avoid repetitive querySelector calls
interface DOMElements {
  tabIdInput: HTMLInputElement;
  checkTabButton: HTMLButtonElement;
  tabsListContainer: HTMLElement;
  iframeIdInput: HTMLInputElement;
  interactButton: HTMLButtonElement;
  iframesListContainer: HTMLElement;
  statusContainer: HTMLElement;
  resourceStatus: HTMLElement;
}

// Get all DOM elements once
function getDOMElements(): DOMElements {
  return {
    tabIdInput: document.getElementById('tabId') as HTMLInputElement,
    checkTabButton: document.getElementById('checkTab') as HTMLButtonElement,
    tabsListContainer: document.getElementById('tabsList') as HTMLElement,
    iframeIdInput: document.getElementById('iframeId') as HTMLInputElement,
    interactButton: document.getElementById('interactButton') as HTMLButtonElement,
    iframesListContainer: document.getElementById('iframesList') as HTMLElement,
    statusContainer: document.getElementById('status') as HTMLElement,
    resourceStatus: document.getElementById('resource-status') as HTMLElement
  };
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Get all DOM elements
  const elements = getDOMElements();
  
  // Show the status element initially
  elements.statusContainer.className = ''; // Remove hidden class
  
  // Set initial status
  elements.resourceStatus.textContent = 'Extension ready';
  elements.resourceStatus.style.color = '#2e7d32';
  
  /**
   * Display status message in the UI
   */
  function displayStatus(message: string, isError = false): void {
    elements.statusContainer.textContent = message;
    elements.statusContainer.className = isError ? 'error' : 'success';
  }
  
  /**
   * Display error message in the UI
   */
  function displayError(message: string): void {
    displayStatus(message, true);
  }
  
  /**
   * Check a tab for information
   */
  async function checkTab(tabId: string): Promise<void> {
    if (!tabId) {
      displayError('Please enter a tab ID');
      return;
    }
    
    displayStatus('Checking tab...');
    
    try {
      const message: ExtensionMessage = { 
        action: 'checkTab', 
        tabId 
      };
      
      const response = await sendMessage(message);
      
      if (response.success) {
        displayStatus(`Successfully checked tab ${tabId}`);
      } else {
        displayError(response.error || 'Unknown error');
      }
    } catch (error) {
      displayError(error instanceof Error ? error.message : String(error));
    }
  }
  
  /**
   * Interact with an iframe in a tab
   */
  async function interactWithIframe(tabId: string, iframeId: string): Promise<void> {
    if (!tabId) {
      displayError('Please select a tab first');
      return;
    }
    
    if (!iframeId) {
      displayError('Please enter an iframe ID');
      return;
    }
    
    displayStatus('Interacting with iframe...');
    
    try {
      const message: ExtensionMessage = { 
        action: 'interactWithIframe', 
        tabId,
        iframeId
      };
      
      const response = await sendMessage(message);
      
      if (response.success) {
        displayStatus(`Successfully interacted with iframe ${iframeId} in tab ${tabId}`);
        if (response.data) {
          const detailsStr = JSON.stringify(response.data, null, 2);
          console.log("Iframe interaction details:", detailsStr);
        }
      } else {
        displayError(response.error || 'Unknown error');
      }
    } catch (error) {
      displayError(error instanceof Error ? error.message : String(error));
    }
  }
  
  /**
   * Display iframes found in a tab
   */
  async function displayIframes(tabId: string): Promise<void> {
    if (!tabId) {
      elements.iframesListContainer.innerHTML = '<p>Please select a tab first</p>';
      return;
    }
    
    elements.iframesListContainer.innerHTML = '<p>Loading iframes...</p>';
    
    try {
      const message: ExtensionMessage = { 
        action: 'checkTab', 
        tabId 
      };
      
      const response = await sendMessage(message);
      
      if (response.success && response.data && response.data.iframes) {
        // Display the iframes list
        const iframes: IframeInfo[] = response.data.iframes;
        
        if (iframes.length === 0) {
          elements.iframesListContainer.innerHTML = '<p>No iframes found in this tab</p>';
        } else {
          const iframesList = document.createElement('ul');
          
          iframes.forEach((iframe) => {
            const li = document.createElement('li');
            // Sanitize output to prevent XSS
            const safeId = document.createTextNode(`ID: ${iframe.id}`).textContent;
            const safeSrc = document.createTextNode(`Source: ${iframe.src.substring(0, 30)}...`).textContent;
            li.textContent = `${safeId}, ${safeSrc}`;
            
            li.addEventListener('click', () => {
              elements.iframeIdInput.value = iframe.id;
            });
            
            iframesList.appendChild(li);
          });
          
          elements.iframesListContainer.innerHTML = '';
          elements.iframesListContainer.appendChild(iframesList);
        }
      } else {
        elements.iframesListContainer.innerHTML = 
          `<p>Error getting iframe information: ${response.error || 'Unknown error'}</p>`;
      }
    } catch (error) {
      elements.iframesListContainer.innerHTML = 
        `<p>Exception: ${error instanceof Error ? error.message : String(error)}</p>`;
    }
  }
  
  /**
   * Get and display all open tabs
   */
  async function getAllTabs(): Promise<void> {
    elements.tabsListContainer.innerHTML = '<p>Loading tabs...</p>';
    
    try {
      const response = await sendMessage({ action: 'getAllTabs' });
      
      if (response.success && response.data && response.data.tabs) {
        const tabs: TabInfo[] = response.data.tabs;
        
        if (tabs.length === 0) {
          elements.tabsListContainer.innerHTML = '<p>No tabs found</p>';
        } else {
          const tabsList = document.createElement('ul');
          
          tabs.forEach((tab) => {
            const li = document.createElement('li');
            // Sanitize output to prevent XSS
            const safeId = document.createTextNode(`ID: ${tab.id}`).textContent;
            // Truncate title if it's too long and sanitize
            const title = tab.title ? tab.title.substring(0, 30) + '...' : 'Untitled';
            const safeTitle = document.createTextNode(`Title: ${title}`).textContent;
            
            li.textContent = `${safeId}, ${safeTitle}`;
            
            li.addEventListener('click', () => {
              elements.tabIdInput.value = String(tab.id);
              // Display iframes in the selected tab
              displayIframes(String(tab.id));
            });
            
            tabsList.appendChild(li);
          });
          
          elements.tabsListContainer.innerHTML = '';
          elements.tabsListContainer.appendChild(tabsList);
        }
      } else {
        elements.tabsListContainer.innerHTML = 
          `<p>Error getting tabs: ${response.error || 'Unknown error'}</p>`;
      }
    } catch (error) {
      elements.tabsListContainer.innerHTML = 
        `<p>Exception: ${error instanceof Error ? error.message : String(error)}</p>`;
    }
  }
  
  // Button event listeners
  elements.checkTabButton.addEventListener('click', () => {
    const tabId = elements.tabIdInput.value.trim();
    checkTab(tabId);
  });
  
  elements.interactButton.addEventListener('click', () => {
    const tabId = elements.tabIdInput.value.trim();
    const iframeId = elements.iframeIdInput.value.trim();
    interactWithIframe(tabId, iframeId);
  });
  
  // Initialize - get all tabs when popup opens
  await getAllTabs();
}); 