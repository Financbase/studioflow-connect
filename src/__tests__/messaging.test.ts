/**
 * Tests for messaging utilities
 */
import {
  createSuccessResponse,
  createErrorResponse,
  createAsyncMessageHandler
} from '../utils/messaging';
import { ExtensionMessage, ChromeMessageSender } from '../types/chrome';

// Mock chrome.runtime API
global.chrome = {
  runtime: {
    lastError: null,
    sendMessage: jest.fn()
  }
} as unknown as typeof chrome;

describe('Messaging Utilities', () => {
  
  describe('createSuccessResponse', () => {
    it('should create a properly formatted success response', () => {
      const data = { foo: 'bar' };
      const message = 'Success message';
      
      const response = createSuccessResponse(data, message);
      
      expect(response).toEqual({
        success: true,
        data,
        message
      });
    });
    
    it('should handle undefined data and message', () => {
      const response = createSuccessResponse();
      
      expect(response).toEqual({
        success: true,
        data: undefined,
        message: undefined
      });
    });
  });
  
  describe('createErrorResponse', () => {
    it('should create a properly formatted error response', () => {
      const message = 'Error message';
      const details = { reason: 'Test error' };
      
      const response = createErrorResponse(message, details);
      
      expect(response).toEqual({
        success: false,
        error: message,
        data: details
      });
    });
    
    it('should handle undefined details', () => {
      const message = 'Error message';
      
      const response = createErrorResponse(message);
      
      expect(response).toEqual({
        success: false,
        error: message,
        data: undefined
      });
    });
  });
  
  describe('createAsyncMessageHandler', () => {
    it('should handle synchronous handler results', () => {
      const mockHandler = jest.fn().mockReturnValue({
        success: true,
        data: 'test data'
      });
      
      const mockSendResponse = jest.fn();
      const message: ExtensionMessage = { action: 'test' };
      const sender = {} as ChromeMessageSender;
      
      const listener = createAsyncMessageHandler(mockHandler);
      const keepChannelOpen = listener(message, sender, mockSendResponse);
      
      expect(mockHandler).toHaveBeenCalledWith(message, sender);
      expect(mockSendResponse).toHaveBeenCalledWith({
        success: true,
        data: 'test data'
      });
      expect(keepChannelOpen).toBe(false);
    });
    
    it('should handle Promise-based handler results', async () => {
      const mockResult = {
        success: true,
        data: 'async test data'
      };
      
      const mockHandler = jest.fn().mockResolvedValue(mockResult);
      const mockSendResponse = jest.fn();
      const message: ExtensionMessage = { action: 'test' };
      const sender = {} as ChromeMessageSender;
      
      const listener = createAsyncMessageHandler(mockHandler);
      const keepChannelOpen = listener(message, sender, mockSendResponse);
      
      expect(keepChannelOpen).toBe(true);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(mockHandler).toHaveBeenCalledWith(message, sender);
      expect(mockSendResponse).toHaveBeenCalledWith(mockResult);
    });
    
    it('should handle errors in the handler', () => {
      const mockError = new Error('Test error');
      const mockHandler = jest.fn().mockImplementation(() => {
        throw mockError;
      });
      
      const mockSendResponse = jest.fn();
      const message: ExtensionMessage = { action: 'test' };
      const sender = {} as ChromeMessageSender;
      
      const listener = createAsyncMessageHandler(mockHandler);
      const keepChannelOpen = listener(message, sender, mockSendResponse);
      
      expect(mockHandler).toHaveBeenCalledWith(message, sender);
      expect(mockSendResponse).toHaveBeenCalledWith({
        success: false,
        error: 'Test error'
      });
      expect(keepChannelOpen).toBe(false);
    });
    
    it('should handle Promise rejections', async () => {
      const mockError = new Error('Async test error');
      const mockHandler = jest.fn().mockRejectedValue(mockError);
      
      const mockSendResponse = jest.fn();
      const message: ExtensionMessage = { action: 'test' };
      const sender = {} as ChromeMessageSender;
      
      const listener = createAsyncMessageHandler(mockHandler);
      const keepChannelOpen = listener(message, sender, mockSendResponse);
      
      expect(keepChannelOpen).toBe(true);
      
      // Wait for the promise to reject
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(mockHandler).toHaveBeenCalledWith(message, sender);
      expect(mockSendResponse).toHaveBeenCalledWith({
        success: false,
        error: 'Async test error'
      });
    });
  });
}); 