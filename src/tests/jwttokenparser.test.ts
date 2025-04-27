import { describe, it, expect } from 'vitest';
import { 
  decodeJWT, 
  base64UrlDecode, 
  isTokenExpired, 
  getExpirationTime,
  validateHeader,
  getSpecificError,
  JWTHeader,
  JWTPayload
} from '@/utils/jwttokenparser/jwttokenparserutils';

describe('JWT Parser Utils', () => {
  // Valid test JWT token (header: { "alg": "HS256", "typ": "JWT" }, payload: { "sub": "1234", "name": "Test User", "iat": 1516239022 })
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
  describe('decodeJWT', () => {
    it('should decode a valid JWT token', () => {
      const decoded = decodeJWT(validToken);
      
      expect(decoded.header).toEqual({ alg: 'HS256', typ: 'JWT' });
      expect(decoded.payload).toEqual({ sub: '1234', name: 'Test User', iat: 1516239022 });
      expect(decoded.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    });
    
    it('should handle tokens with whitespace', () => {
      const tokenWithSpace = ` ${validToken} `;
      const decoded = decodeJWT(tokenWithSpace);
      
      expect(decoded.header).toEqual({ alg: 'HS256', typ: 'JWT' });
    });
    
    it('should throw for empty input', () => {
      expect(() => decodeJWT('')).toThrow('Token is empty');
      expect(() => decodeJWT('   ')).toThrow('Token is empty');
      expect(() => decodeJWT(null)).toThrow('Token is empty or not a string');
      expect(() => decodeJWT(undefined)).toThrow('Token is empty or not a string');
    });
    
    it('should throw for invalid JWT format', () => {
      expect(() => decodeJWT('invalid')).toThrow('Invalid JWT token format');
      expect(() => decodeJWT('part1.part2')).toThrow('Invalid JWT token format');
      expect(() => decodeJWT('part1.part2.part3.part4')).toThrow('Invalid JWT token format');
    });
    
    it('should throw for corrupted base64 encoding', () => {
      expect(() => decodeJWT('invalid!.part2.part3')).toThrow('Invalid base64 encoding');
    });
    
    it('should throw for invalid JSON in decoded parts', () => {
      // Creating an invalid token with bad JSON in header
      const invalidHeaderBase64 = btoa('{not valid json');
      const invalidToken = `${invalidHeaderBase64}.eyJzdWIiOiIxMjM0In0.signature`;
      
      expect(() => decodeJWT(invalidToken)).toThrow('Invalid JWT token - could not parse JSON');
    });
  });
  
  describe('base64UrlDecode', () => {
    it('should decode base64url encoded strings', () => {
      const base64UrlEncoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const decoded = base64UrlDecode(base64UrlEncoded);
      
      expect(decoded).toBe('{"alg":"HS256","typ":"JWT"}');
    });
    
    it('should handle base64url with replaced characters', () => {
      // Test with characters that would be different in base64url vs standard base64
      const base64UrlWithSpecialChars = 'eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiYWRtaW4ifQ--';
      const decoded = base64UrlDecode(base64UrlWithSpecialChars);
      
      expect(decoded).toEqual('{"name":"John Doe","role":"admin"}');
    });
    
    it('should throw for invalid base64', () => {
      expect(() => base64UrlDecode('invalid!base64')).toThrow('Invalid base64 encoding');
    });
  });
  
  describe('isTokenExpired', () => {
    it('should return true for expired tokens', () => {
      const expiredPayload: JWTPayload = { exp: Math.floor(Date.now() / 1000) - 3600 }; // 1 hour ago
      expect(isTokenExpired(expiredPayload)).toBe(true);
    });
    
    it('should return false for valid tokens', () => {
      const validPayload: JWTPayload = { exp: Math.floor(Date.now() / 1000) + 3600 }; // 1 hour in future
      expect(isTokenExpired(validPayload)).toBe(false);
    });
    
    it('should return false if no exp claim', () => {
      const emptyPayload: JWTPayload = {};
      expect(isTokenExpired(emptyPayload)).toBe(false);
      expect(isTokenExpired(null)).toBe(false);
    });
  });
  
  describe('getExpirationTime', () => {
    it('should return formatted date for valid exp', () => {
      const now = new Date();
      const payload: JWTPayload = { exp: Math.floor(now.getTime() / 1000) };
      
      const result = getExpirationTime(payload);
      expect(result).toBe(now.toLocaleString());
    });
    
    it('should return null for missing exp', () => {
      const emptyPayload: JWTPayload = {};
      expect(getExpirationTime(emptyPayload)).toBeNull();
      expect(getExpirationTime(null)).toBeNull();
    });
  });
  
  describe('validateHeader', () => {
    it('should return true for valid header', () => {
      const validHeader: JWTHeader = { alg: 'HS256', typ: 'JWT' };
      expect(validateHeader(validHeader)).toBe(true);
    });
    
    it('should return false for invalid header', () => {
      // Use type assertion to satisfy TypeScript for test cases
      // In real usage, these would fail type checking which is exactly what we want
      expect(validateHeader({} as JWTHeader)).toBe(false);
      expect(validateHeader({ alg: 'HS256' } as JWTHeader)).toBe(false); // Missing typ
      expect(validateHeader({ typ: 'JWT' } as JWTHeader)).toBe(false); // Missing alg
      expect(validateHeader(null)).toBe(false);
    });
  });
  
  describe('getSpecificError', () => {
    it('should detect empty token', () => {
      expect(getSpecificError('')).toBe('Token is empty');
      expect(getSpecificError('   ')).toBe('Token is empty');
    });
    
    it('should detect invalid token format', () => {
      expect(getSpecificError('only.two.parts')).toBeNull(); // Valid format
      expect(getSpecificError('only.one')).toBe('Invalid JWT format: expected 3 parts, got 2');
      expect(getSpecificError('too.many.parts.here')).toBe('Invalid JWT format: too many segments (4)');
    });
    
    it('should detect empty segments', () => {
      expect(getSpecificError('..part3')).toBe('Invalid JWT: header segment is empty');
      expect(getSpecificError('part1..part3')).toBe('Invalid JWT: payload segment is empty');
      expect(getSpecificError('part1.part2.')).toBe('Invalid JWT: signature segment is empty');
    });
  });
});