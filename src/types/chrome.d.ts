/**
 * Type definitions for Chrome extension API
 */

/**
 * Interface for tab information
 */
export interface TabInfo {
  id: number;
  title: string;
  url: string;
}

/**
 * Interface for iframe information
 */
export interface IframeInfo {
  id: string;
  src: string;
  visible: boolean;
}

/**
 * Interface for page information
 */
export interface PageInfo {
  title: string;
  url: string;
  timestamp: string;
  elementsCount: number;
  iframes: IframeInfo[];
}

/**
 * Interface for extension messages
 */
export interface ExtensionMessage {
  action: string;
  tabId?: string | number;
  iframeId?: string;
  [key: string]: any;
}

/**
 * Interface for message response
 */
export interface MessageResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  tabs?: TabInfo[];
}

/**
 * Chrome message sender
 */
export interface ChromeMessageSender {
  tab?: chrome.tabs.Tab;
  frameId?: number;
  id?: string;
  url?: string;
  tlsChannelId?: string;
}

/**
 * Type for message response callback
 */
export type ResponseCallback = (response: MessageResponse) => void;

/**
 * Type for message listener
 */
export type MessageListener = (
  message: ExtensionMessage,
  sender: ChromeMessageSender,
  sendResponse: ResponseCallback
) => boolean | void; 