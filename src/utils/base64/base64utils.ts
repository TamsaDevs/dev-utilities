/**
 * Base64 Utilities for Browser-based TypeScript Applications
 * 
 * A robust implementation of Base64 encoding and decoding functions
 * specifically designed for text data in browser environments.
 */

/**
 * Encodes a string to Base64 format.
 * 
 * This function properly handles Unicode characters by first converting 
 * to UTF-8 encoding before applying Base64 encoding.
 * 
 * @param text - The input string to encode
 * @returns The Base64 encoded string
 * @throws Error if the input is too large to process
 */
export function encodeToBase64(text: string): string {
    try {
      // Check for excessive input size to prevent browser freezing
      // Most browsers can handle strings of several MB, but we'll be conservative
      if (text.length > 10000000) { // ~10MB
        throw new Error('Input text is too large for Base64 encoding in browser');
      }
  
      // Handle edge case of empty input
      if (text.length === 0) {
        return '';
      }
  
      // The unescape/encodeURIComponent pair handles UTF-8 conversion properly
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      if ((error as Error).message === 'Invalid character') {
        // This usually happens when trying to encode binary data or invalid UTF-16 sequences
        throw new Error('Input contains characters that cannot be encoded in Base64');
      }
      throw error;
    }
  }
  
  /**
   * Decodes a Base64 string back to a regular string.
   * 
   * This function handles the necessary decoding steps to properly convert
   * a Base64 string back to its original form, including UTF-8 handling.
   * 
   * @param base64Text - The Base64 encoded string to decode
   * @returns The decoded string
   * @throws Error if the input is not valid Base64 or is too large
   */
  export function decodeFromBase64(base64Text: string): string {
    try {
      // Check for excessive input size
      if (base64Text.length > 10000000) { // ~10MB
        throw new Error('Input Base64 string is too large for decoding in browser');
      }
  
      // Handle edge case of empty input
      if (base64Text.length === 0) {
        return '';
      }
  
      // Validate Base64 format (only A-Z, a-z, 0-9, +, /, = are allowed)
      if (!/^[A-Za-z0-9+/=]*$/.test(base64Text)) {
        throw new Error('Input is not a valid Base64 string');
      }
  
      // The decodeURIComponent/escape pair handles UTF-8 conversion properly
      return decodeURIComponent(escape(atob(base64Text)));
    } catch (error) {
      if ((error as Error).message === 'Invalid character') {
        throw new Error('Input is not a valid Base64 string');
      }
      if ((error as Error).message === 'URI malformed') {
        throw new Error('The Base64 input contains invalid encoded characters');
      }
      throw error;
    }
  }
  
  /**
   * Processes large text for Base64 encoding by breaking it into smaller chunks.
   * Useful for very large strings that might cause issues in browsers.
   * 
   * @param text - The large input string to encode
   * @param chunkSize - Size of each chunk in characters (default: 1MB)
   * @returns The Base64 encoded string
   */
  export function encodeToBase64Chunked(text: string, chunkSize = 1000000): string {
    // Handle empty text
    if (text.length === 0) {
      return '';
    }
  
    // If text is small enough, use regular function
    if (text.length <= chunkSize) {
      return encodeToBase64(text);
    }
  
    // Process text in chunks
    let result = '';
    for (let i = 0; i < text.length; i += chunkSize) {
      const chunk = text.substring(i, i + chunkSize);
      result += encodeToBase64(chunk);
    }
    return result;
  }
  
  /**
   * Processes large Base64 text for decoding by breaking it into smaller chunks.
   * Useful for very large Base64 strings that might cause issues in browsers.
   * 
   * @param base64Text - The large Base64 encoded string to decode
   * @param chunkSize - Size of each chunk in characters (default: 1MB)
   * @returns The decoded string
   */
  export function decodeFromBase64Chunked(base64Text: string, chunkSize = 1000000): string {
    // Handle empty text
    if (base64Text.length === 0) {
      return '';
    }
  
    // Validate Base64 format for the entire string
    if (!/^[A-Za-z0-9+/=]*$/.test(base64Text)) {
      throw new Error('Input is not a valid Base64 string');
    }
  
    // If base64Text is small enough, use regular function
    if (base64Text.length <= chunkSize) {
      return decodeFromBase64(base64Text);
    }
  
    // For chunked decoding, we need to ensure chunks are multiples of 4
    // since Base64 encoding works in 4-character groups
    const adjustedChunkSize = chunkSize - (chunkSize % 4);
  
    // Process base64Text in chunks
    let result = '';
    for (let i = 0; i < base64Text.length; i += adjustedChunkSize) {
      const chunk = base64Text.substring(i, i + adjustedChunkSize);
      result += decodeFromBase64(chunk);
    }
    return result;
  }
  
  /**
   * Tests if a string is valid Base64.
   * 
   * @param str - The string to test
   * @returns True if the string is valid Base64, false otherwise
   */
  export function isValidBase64(str: string): boolean {
    // Empty string is technically valid Base64
    if (str.length === 0) {
      return true;
    }
    
    // Check for valid Base64 pattern
    if (!/^[A-Za-z0-9+/=]*$/.test(str)) {
      return false;
    }
  
    // Base64 length should be a multiple of 4
    if (str.length % 4 !== 0) {
      return false;
    }
  
    // '=' can only appear at the end, and at most 2 of them
    const padding = str.indexOf('=');
    if (padding !== -1) {
      if (padding < str.length - 2) {
        return false;
      }
      const paddingCount = str.length - padding;
      if (paddingCount > 2) {
        return false;
      }
    }
  
    // Additional check: try to decode it
    try {
      atob(str);
      return true;
    } catch {
      return false;
    }
  }