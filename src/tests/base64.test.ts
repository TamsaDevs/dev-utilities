import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as baseUtils from '@/utils/base64/base64utils';
import {
  encodeToBase64,
  decodeFromBase64,
  encodeToBase64Chunked,
  decodeFromBase64Chunked,
  isValidBase64
} from '@/utils/base64/base64utils';

// Mock browser's built-in functions for consistent testing
const mockBtoa = vi.fn();
const mockAtob = vi.fn();

// Mock setup to simulate browser environment
beforeEach(() => {
  // Reset mocks before each test
  vi.resetAllMocks();
  
  // Store original implementations
  const originalBtoa = global.btoa;
  const originalAtob = global.atob;
  
  // Mock implementations for testing (fallback to original if needed)
  global.btoa = mockBtoa.mockImplementation((str) => originalBtoa ? originalBtoa(str) : Buffer.from(str, 'binary').toString('base64'));
  global.atob = mockAtob.mockImplementation((str) => originalAtob ? originalAtob(str) : Buffer.from(str, 'base64').toString('binary'));
});

describe('Base64 Utilities', () => {
  describe('encodeToBase64', () => {
    it('should encode a simple ASCII string correctly', () => {
      const input = 'Hello, world!';
      const expected = 'SGVsbG8sIHdvcmxkIQ==';
      expect(encodeToBase64(input)).toBe(expected);
    });

    it('should encode a string with Unicode characters correctly', () => {
      const input = 'Hello, 世界!';
      const expected = 'SGVsbG8sIOS4lueVjCE=';
      expect(encodeToBase64(input)).toBe(expected);
    });

    it('should encode an empty string to an empty string', () => {
      expect(encodeToBase64('')).toBe('');
    });

    it('should handle strings with emojis', () => {
      const input = 'Hello 😊 world!';
      const expected = 'SGVsbG8g8J+YkiB3b3JsZCE=';
      expect(encodeToBase64(input)).toBe(expected);
    });

    it('should throw error for extremely large inputs', () => {
      // Create a really large string (over 10MB)
      const largeString = 'a'.repeat(11000000);
      expect(() => encodeToBase64(largeString)).toThrow('Input text is too large');
    });
  });

  describe('decodeFromBase64', () => {
    it('should decode a simple Base64 string correctly', () => {
      const input = 'SGVsbG8sIHdvcmxkIQ==';
      const expected = 'Hello, world!';
      expect(decodeFromBase64(input)).toBe(expected);
    });

    it('should decode a Base64 string with Unicode characters correctly', () => {
      const input = 'SGVsbG8sIOS4lueVjCE=';
      const expected = 'Hello, 世界!';
      expect(decodeFromBase64(input)).toBe(expected);
    });

    it('should decode an empty string to an empty string', () => {
      expect(decodeFromBase64('')).toBe('');
    });

    it('should handle decoding emojis', () => {
      const input = 'SGVsbG8g8J+YkiB3b3JsZCE=';
      const expected = 'Hello 😊 world!';
      expect(decodeFromBase64(input)).toBe(expected);
    });

    it('should throw error for invalid Base64 characters', () => {
      const invalidBase64 = 'SGVsbG8sIHdvcmxkIQ=!';  // '!' is not valid in Base64
      expect(() => decodeFromBase64(invalidBase64)).toThrow('not a valid Base64 string');
    });

    it('should throw error for extremely large inputs', () => {
      // Create a really large Base64 string (over 10MB)
      const largeBase64 = 'A'.repeat(11000000);
      expect(() => decodeFromBase64(largeBase64)).toThrow('too large for decoding');
    });
  });

  describe('encodeToBase64Chunked', () => {
    it('should encode a string smaller than chunk size using regular encoding', () => {
      const spy = vi.spyOn(baseUtils, 'encodeToBase64');
      const input = 'Hello, world!';
      const expected = 'SGVsbG8sIHdvcmxkIQ==';
      
      expect(encodeToBase64Chunked(input, 100)).toBe(expected);
      expect(spy).toHaveBeenCalledWith(input);
    });

    it('should break large input into chunks and encode each chunk', () => {
      // Create a test string just over default chunk size
      const chunkSize = 10;
      const input = 'a'.repeat(25);  // 25 chars, should be 3 chunks with chunk size 10
      
      // Mock chunked implementation to verify chunks
      const spy = vi.spyOn(baseUtils, 'encodeToBase64');
      
      encodeToBase64Chunked(input, chunkSize);
      
      // Verify encodeToBase64 was called 3 times with correct chunk sizes
      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, 'a'.repeat(10));
      expect(spy).toHaveBeenNthCalledWith(2, 'a'.repeat(10));
      expect(spy).toHaveBeenNthCalledWith(3, 'a'.repeat(5));
    });

    it('should handle empty string', () => {
      expect(encodeToBase64Chunked('')).toBe('');
    });
  });

  describe('decodeFromBase64Chunked', () => {
    it('should decode a string smaller than chunk size using regular decoding', () => {
      const spy = vi.spyOn(baseUtils, 'decodeFromBase64');
      const input = 'SGVsbG8sIHdvcmxkIQ==';
      const expected = 'Hello, world!';
      
      expect(decodeFromBase64Chunked(input, 100)).toBe(expected);
      expect(spy).toHaveBeenCalledWith(input);
    });

    it('should break large input into chunks and decode each chunk', () => {
      // Create a test Base64 string just over default chunk size
      // Must be multiple of 4 for Base64
      const chunkSize = 12;
      const input = 'AAAA'.repeat(10);  // 40 chars, should be 4 chunks with chunk size 12 (adjusted to 12)
      
      // Mock chunked implementation to verify chunks
      const spy = vi.spyOn(baseUtils, 'decodeFromBase64');
      
      decodeFromBase64Chunked(input, chunkSize);
      
      // Verify decodeFromBase64 was called with correct chunks
      // Each chunk should be a multiple of 4 characters (Base64 requirement)
      expect(spy).toHaveBeenCalledTimes(4);
      expect(spy).toHaveBeenNthCalledWith(1, 'AAAA'.repeat(3));
      expect(spy).toHaveBeenNthCalledWith(2, 'AAAA'.repeat(3));
      expect(spy).toHaveBeenNthCalledWith(3, 'AAAA'.repeat(3));
      expect(spy).toHaveBeenNthCalledWith(4, 'AAAA');
    });

    it('should throw error for invalid Base64 input', () => {
      const invalidBase64 = 'Invalid!Base64#String';
      expect(() => decodeFromBase64Chunked(invalidBase64)).toThrow('not a valid Base64 string');
    });

    it('should handle empty string', () => {
      expect(decodeFromBase64Chunked('')).toBe('');
    });
  });

  describe('isValidBase64', () => {
    it('should return true for valid Base64 strings', () => {
      expect(isValidBase64('SGVsbG8sIHdvcmxkIQ==')).toBe(true);
      expect(isValidBase64('SGVsbG8=')).toBe(true);
      expect(isValidBase64('SGVsbG8gd29ybGQ=')).toBe(true);
      expect(isValidBase64('AA==')).toBe(true);
      expect(isValidBase64('AAA=')).toBe(true);
      expect(isValidBase64('AAAA')).toBe(true);
    });

    it('should return false for invalid Base64 strings', () => {
      expect(isValidBase64('SGVsbG8sIHdvcmxkIQ===')).toBe(false); // Too many padding characters
      expect(isValidBase64('SGVsbG8sIHdvcmxkIQ')).toBe(false);    // Missing padding (should be multiple of 4)
      expect(isValidBase64('SGVsbG8sIHdvcmxkIQ=A')).toBe(false);  // Padding in wrong position
      expect(isValidBase64('Hello!')).toBe(false);                // Invalid characters
      expect(isValidBase64('$%^&*')).toBe(false);                 // Invalid characters
    });

    it('should handle empty string as valid Base64', () => {
      expect(isValidBase64('')).toBe(true);
    });

    it('should validate strings with all valid Base64 characters', () => {
      const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      expect(isValidBase64(validChars)).toBe(false); // Not multiple of 4
      
      // Make it a multiple of 4
      expect(isValidBase64(validChars + validChars.substring(0, 4 - (validChars.length % 4)))).toBe(true);
    });
  });

  // Integration tests (multiple functions working together)
  describe('Integration Tests', () => {
    it('should correctly round-trip encode and decode', () => {
      const original = 'Hello, this is a test with Unicode 你好 and emojis 😊 for round-trip testing!';
      const encoded = encodeToBase64(original);
      const decoded = decodeFromBase64(encoded);
      
      expect(decoded).toBe(original);
    });
    
    it('should correctly round-trip chunked encode and decode', () => {
      const original = 'A'.repeat(2000); // String large enough to trigger chunking with small chunk size
      const encoded = encodeToBase64Chunked(original, 500);
      const decoded = decodeFromBase64Chunked(encoded, 500);
      
      expect(decoded).toBe(original);
    });
    
    it('should handle mock btoa/atob correctly', () => {
      // Reset mocks to ensure we're using the real implementation
      vi.restoreAllMocks();
      
      const original = 'Test string';
      const encoded = encodeToBase64(original);
      const decoded = decodeFromBase64(encoded);
      
      expect(decoded).toBe(original);
    });
  });
});