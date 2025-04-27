/**
 * JWT Parser Utility Functions
 * 
 * Provides functions to decode and validate JWT tokens
 */

/**
 * Represents common JWT header fields
 */
export interface JWTHeader {
  alg: string;
  typ: string;
  kid?: string;
  [key: string]: unknown;
}

/**
 * Represents common JWT payload fields
 */
export interface JWTPayload {
  sub?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

/**
 * Represents a decoded JWT token
 */
export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
}

/**
 * Decodes a JWT token into its component parts
 * @param {string} token - The JWT token to decode
 * @returns {DecodedJWT} An object containing the decoded header, payload, and signature
 * @throws {Error} If the token is invalid or cannot be decoded
 */
export function decodeJWT(token: string | null | undefined): DecodedJWT {
  if (!token || typeof token !== 'string') {
    throw new Error('Token is empty or not a string');
  }

  const tokenTrimmed = token.trim();
  if (!tokenTrimmed) {
    throw new Error('Token is empty');
  }

  const parts = tokenTrimmed.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token format - must have 3 parts separated by dots');
  }

  try {
    // Decode header
    const headerBase64 = parts[0];
    const headerJson = base64UrlDecode(headerBase64);
    const header = JSON.parse(headerJson) as JWTHeader;

    // Decode payload
    const payloadBase64 = parts[1];
    const payloadJson = base64UrlDecode(payloadBase64);
    const payload = JSON.parse(payloadJson) as JWTPayload;

    // Return the parts
    return {
      header,
      payload,
      signature: parts[2],
      raw: {
        header: headerBase64,
        payload: payloadBase64,
        signature: parts[2]
      }
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JWT token - could not parse JSON');
    }
    throw error;
  }
}

/**
 * Decodes a base64url encoded string
 * @param {string} input - The base64url encoded string
 * @returns {string} The decoded string
 */
export function base64UrlDecode(input: string): string {
  // Convert base64url to base64
  const base64 = input
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // Add padding if necessary
  const paddedBase64 = addBase64Padding(base64);
  
  try {
    // Decode base64 to a UTF-8 string
    return atob(paddedBase64);
  } catch {
    throw new Error('Invalid base64 encoding in JWT token');
  }
}

/**
 * Adds padding to base64 string if necessary
 * @param {string} base64 - The base64 string that may need padding
 * @returns {string} Properly padded base64 string
 */
function addBase64Padding(base64: string): string {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  return base64 + padding;
}

/**
 * Validates if a JWT token has expired
 * @param {JWTPayload | null | undefined} payload - The decoded JWT payload
 * @returns {boolean} True if token is expired, false otherwise
 */
export function isTokenExpired(payload: JWTPayload | null | undefined): boolean {
  if (!payload || typeof payload.exp !== 'number') {
    return false; // Cannot determine expiration if no exp claim
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Returns a human-readable expiration time from a JWT payload
 * @param {JWTPayload | null | undefined} payload - The decoded JWT payload
 * @returns {string|null} Human readable expiration time or null if not available
 */
export function getExpirationTime(payload: JWTPayload | null | undefined): string | null {
  if (!payload || typeof payload.exp !== 'number') {
    return null;
  }
  
  const expirationDate = new Date(payload.exp * 1000);
  return expirationDate.toLocaleString();
}

/**
 * Validates that a JWT has required fields in the header
 * @param {JWTHeader | null | undefined} header - The decoded JWT header
 * @returns {boolean} True if header is valid, false otherwise
 */
export function validateHeader(header: JWTHeader | null | undefined): boolean {
  return Boolean(
    header && 
    typeof header === 'object' && 
    typeof header.alg === 'string' && 
    typeof header.typ === 'string'
  );
}

/**
 * Gets a more descriptive error for specific JWT validation issues
 * @param {string | null | undefined} token - The JWT token to analyze
 * @returns {string|null} A specific error message or null if no specific issue detected
 */
export function getSpecificError(token: string | null | undefined): string | null {
  if (!token || typeof token !== 'string') {
    return 'Token is empty or not a string';
  }
  
  const trimmed = token.trim();
  if (!trimmed) {
    return 'Token is empty';
  }
  
  const parts = trimmed.split('.');
  
  if (parts.length < 3) {
    return `Invalid JWT format: expected 3 parts, got ${parts.length}`;
  }
  
  if (parts.length > 3) {
    return `Invalid JWT format: too many segments (${parts.length})`;
  }
  
  // Check for empty segments
  if (!parts[0]) return 'Invalid JWT: header segment is empty';
  if (!parts[1]) return 'Invalid JWT: payload segment is empty';
  if (!parts[2]) return 'Invalid JWT: signature segment is empty';
  
  return null;
}