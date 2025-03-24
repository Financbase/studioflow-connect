/**
 * Tests for DOM utilities
 */
import {
  elementExists,
  isElementVisible,
  getPageInfo
} from '../utils/dom';

describe('DOM Utilities', () => {
  
  // Setup
  beforeEach(() => {
    // Reset document body before each test
    document.body.innerHTML = '';
  });
  
  describe('elementExists', () => {
    it('should return true when element exists', () => {
      // Setup
      document.body.innerHTML = `
        <div id="test-element"></div>
      `;
      
      // Test
      const result = elementExists('#test-element');
      
      // Assert
      expect(result).toBe(true);
    });
    
    it('should return false when element does not exist', () => {
      // Test
      const result = elementExists('#non-existent');
      
      // Assert
      expect(result).toBe(false);
    });
  });
  
  describe('isElementVisible', () => {
    it('should return false for null elements', () => {
      // Test
      const result = isElementVisible(null);
      
      // Assert
      expect(result).toBe(false);
    });
    
    it('should return true for visible elements', () => {
      // Setup
      document.body.innerHTML = `
        <div id="visible-element" style="display: block; visibility: visible;">Visible</div>
      `;
      const element = document.getElementById('visible-element');
      
      // Mock getBoundingClientRect to return non-zero dimensions
      jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({
        width: 100,
        height: 50,
        top: 0,
        left: 0,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {}
      }));
      
      // Test
      const result = isElementVisible(element);
      
      // Assert
      expect(result).toBe(true);
    });
    
    it('should return false for elements with display: none', () => {
      // Setup
      document.body.innerHTML = `
        <div id="hidden-element" style="display: none;">Hidden</div>
      `;
      const element = document.getElementById('hidden-element');
      
      // Test
      const result = isElementVisible(element);
      
      // Assert
      expect(result).toBe(false);
    });
    
    it('should return false for elements with visibility: hidden', () => {
      // Setup
      document.body.innerHTML = `
        <div id="invisible-element" style="visibility: hidden;">Invisible</div>
      `;
      const element = document.getElementById('invisible-element');
      
      // Test
      const result = isElementVisible(element);
      
      // Assert
      expect(result).toBe(false);
    });
  });
  
  describe('getPageInfo', () => {
    it('should return correct page information', () => {
      // Setup
      document.title = 'Test Page';
      
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/test'
        },
        writable: true
      });
      
      // Mock Date.toISOString
      const mockDate = '2023-01-01T00:00:00.000Z';
      const originalNow = Date.now;
      Date.now = jest.fn().mockReturnValue(new Date(mockDate).getTime());
      const originalToISOString = Date.prototype.toISOString;
      Date.prototype.toISOString = jest.fn().mockReturnValue(mockDate);
      
      // Add some elements to the document
      document.body.innerHTML = `
        <div>Test Content</div>
        <iframe id="test-iframe" src="https://example.com/iframe"></iframe>
      `;
      
      // Mock document.querySelectorAll for '*' to return a specific count
      const originalQuerySelectorAll = document.querySelectorAll.bind(document);
      document.querySelectorAll = jest.fn().mockImplementation((selector) => {
        if (selector === '*') {
          return { length: 10 };
        }
        return originalQuerySelectorAll(selector);
      });
      
      // Test
      const pageInfo = getPageInfo();
      
      // Assert
      expect(pageInfo).toMatchObject({
        title: 'Test Page',
        url: 'https://example.com/test',
        timestamp: mockDate,
        elementsCount: 10
      });
      
      expect(pageInfo.iframes).toBeInstanceOf(Array);
      
      // Cleanup
      Date.now = originalNow;
      Date.prototype.toISOString = originalToISOString;
      document.querySelectorAll = originalQuerySelectorAll;
    });
  });
}); 