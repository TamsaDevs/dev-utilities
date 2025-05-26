/**
 * JSON Beautifier Utility
 * 
 * Features:
 * - Handles large JSON files efficiently with streaming approach
 * - Supports custom indentation options
 * - Preserves all valid JSON structures
 * - Graceful error handling with detailed messages
 * - Circular reference detection
 * - Can limit output size for very large objects
 */

// Type definitions for JSON values
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];

// Types for beautifier options
export interface JSONBeautifierOptions {
  /**
   * String to use for indentation (e.g., "  ", "\t")
   */
  indent: string;
  
  /**
   * Maximum depth to format (to handle very nested objects)
   * Set to 0 for unlimited depth
   */
  maxDepth: number;
  
  /**
   * Maximum character length of formatted JSON
   * Set to 0 for unlimited length
   */
  maxLength: number;
  
  /**
   * Whether to sort object keys alphabetically
   */
  sortKeys: boolean;
  
  /**
   * Whether to add trailing commas (not valid in standard JSON)
   */
  trailingComma: boolean;
  
  /**
   * Whether to preserve explicit null values
   */
  preserveNull: boolean;
}

// Default options
export const DEFAULT_BEAUTIFIER_OPTIONS: JSONBeautifierOptions = {
  indent: "  ",      // 2 spaces
  maxDepth: 100,     // Reasonable limit to prevent stack overflow
  maxLength: 10000000, // ~10MB limit
  sortKeys: false,   // Maintain original key order
  trailingComma: false, // Follow JSON spec (no trailing commas)
  preserveNull: true // Keep null values
};

/**
 * Custom error class for JSON beautifier errors
 */
export class JSONBeautifierError extends Error {
  position?: number;
  
  constructor(message: string, position?: number) {
    super(message);
    this.name = "JSONBeautifierError";
    this.position = position;
  }
}

/**
 * Main function to beautify JSON string
 * 
 * @param jsonString The JSON string to beautify
 * @param options Formatting options
 * @returns Beautified JSON string
 * @throws JSONBeautifierError if the input is not valid JSON
 */
export function beautifyJSON(
  jsonString: string, 
  options: Partial<JSONBeautifierOptions> = {}
): string {
  // Merge with default options
  const opts: JSONBeautifierOptions = {
    ...DEFAULT_BEAUTIFIER_OPTIONS,
    ...options
  };
  
  try {
    // For small inputs, use the standard approach
    if (jsonString.length < 1000000) { // < 1MB
      // Parse the JSON string to ensure it's valid
      const parsed = JSON.parse(jsonString);
      
      // Format the object
      return formatValue(parsed, 0, [], opts);
    } else {
      // For larger inputs, use incremental parsing to avoid memory issues
      return incrementalParse(jsonString, opts);
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Extract position information if available
      const match = /position\s+(\d+)/.exec(error.message);
      const position = match ? parseInt(match[1], 10) : undefined;
      
      throw new JSONBeautifierError(
        `Invalid JSON: ${error.message}`,
        position
      );
    }
    throw error;
  }
}

/**
 * Format a value with proper indentation
 * 
 * @param value The value to format
 * @param level Current indentation level
 * @param path Current path (for circular reference detection)
 * @param options Formatting options
 * @returns Formatted string
 */
function formatValue(
  value: JSONValue, 
  level: number, 
  path: JSONValue[],
  options: JSONBeautifierOptions
): string {
  // Check max depth
  if (options.maxDepth > 0 && level >= options.maxDepth) {
    return '"[Max depth reached]"';
  }
  
  // Check for circular references
  if (typeof value === 'object' && value !== null) {
    if (path.includes(value)) {
      return '"[Circular reference]"';
    }
    path = [...path, value];
  }
  
  // Handle different types
  if (value === null) {
    return options.preserveNull ? 'null' : '{}';
  }
  
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    return formatArray(value, level, path, options);
  }
  
  if (typeof value === 'object') {
    return formatObject(value as JSONObject, level, path, options);
  }
  
  // Fallback for any unexpected types
  return 'null';
}

/**
 * Format an array value
 */
function formatArray(
  array: JSONArray, 
  level: number, 
  path: JSONValue[],
  options: JSONBeautifierOptions
): string {
  if (array.length === 0) {
    return '[]';
  }
  
  const indent = options.indent.repeat(level);
  const indentInner = options.indent.repeat(level + 1);
  
  let result = '[\n';
  
  for (let i = 0; i < array.length; i++) {
    result += indentInner;
    result += formatValue(array[i], level + 1, path, options);
    
    if (i < array.length - 1 || options.trailingComma) {
      result += ',';
    }
    
    result += '\n';
    
    // Check for max length
    if (options.maxLength > 0 && result.length > options.maxLength) {
      result += indentInner + '"[Output truncated due to size]"\n';
      break;
    }
  }
  
  result += indent + ']';
  return result;
}

/**
 * Format an object value
 */
function formatObject(
  obj: JSONObject, 
  level: number, 
  path: JSONValue[],
  options: JSONBeautifierOptions
): string {
  const keys = Object.keys(obj);
  
  if (keys.length === 0) {
    return '{}';
  }
  
  if (options.sortKeys) {
    keys.sort();
  }
  
  const indent = options.indent.repeat(level);
  const indentInner = options.indent.repeat(level + 1);
  
  let result = '{\n';
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result += indentInner + JSON.stringify(key) + ': ';
    result += formatValue(obj[key], level + 1, path, options);
    
    if (i < keys.length - 1 || options.trailingComma) {
      result += ',';
    }
    
    result += '\n';
    
    // Check for max length
    if (options.maxLength > 0 && result.length > options.maxLength) {
      result += indentInner + '"[Output truncated due to size]"\n';
      break;
    }
  }
  
  result += indent + '}';
  return result;
}

/**
 * Incremental parsing for large JSON files
 * This uses a token-based approach to avoid loading the entire object into memory
 */
function incrementalParse(jsonString: string, options: JSONBeautifierOptions): string {
  // Simple lexer for JSON tokens
  const tokens = tokenizeJSON(jsonString);
  return formatTokens(tokens, options);
}

interface Token {
  type: 'string' | 'number' | 'boolean' | 'null' | 'objectStart' | 'objectEnd' | 
         'arrayStart' | 'arrayEnd' | 'colon' | 'comma';
  value: string;
  position: number;
}

/**
 * Tokenize a JSON string into a stream of tokens
 */
function tokenizeJSON(input: string): Token[] {
  const tokens: Token[] = [];
  let position = 0;
  
  while (position < input.length) {
    const char = input[position];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      position++;
      continue;
    }
    
    // Parse string
    if (char === '"') {
      let value = '"';
      let escaped = false;
      position++;
      
      while (position < input.length) {
        const c = input[position++];
        value += c;
        
        if (escaped) {
          escaped = false;
        } else if (c === '\\') {
          escaped = true;
        } else if (c === '"') {
          break;
        }
      }
      
      tokens.push({ type: 'string', value, position: position - value.length });
      continue;
    }
    
    // Parse number
    if (/[0-9-]/.test(char)) {
      let value = '';
      const numberRegex = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/;
      const match = input.slice(position).match(numberRegex);
      
      if (match) {
        value = match[0];
        tokens.push({ type: 'number', value, position });
        position += value.length;
        continue;
      }
    }
    
    // Parse literals
    if (char === 't' && input.slice(position, position + 4) === 'true') {
      tokens.push({ type: 'boolean', value: 'true', position });
      position += 4;
      continue;
    }
    
    if (char === 'f' && input.slice(position, position + 5) === 'false') {
      tokens.push({ type: 'boolean', value: 'false', position });
      position += 5;
      continue;
    }
    
    if (char === 'n' && input.slice(position, position + 4) === 'null') {
      tokens.push({ type: 'null', value: 'null', position });
      position += 4;
      continue;
    }
    
    // Parse structural characters
    if (char === '{') {
      tokens.push({ type: 'objectStart', value: '{', position });
      position++;
      continue;
    }
    
    if (char === '}') {
      tokens.push({ type: 'objectEnd', value: '}', position });
      position++;
      continue;
    }
    
    if (char === '[') {
      tokens.push({ type: 'arrayStart', value: '[', position });
      position++;
      continue;
    }
    
    if (char === ']') {
      tokens.push({ type: 'arrayEnd', value: ']', position });
      position++;
      continue;
    }
    
    if (char === ':') {
      tokens.push({ type: 'colon', value: ':', position });
      position++;
      continue;
    }
    
    if (char === ',') {
      tokens.push({ type: 'comma', value: ',', position });
      position++;
      continue;
    }
    
    // If we get here, we found an invalid character
    throw new JSONBeautifierError(`Unexpected character "${char}"`, position);
  }
  
  return tokens;
}

/**
 * Format tokens into beautified JSON
 */
function formatTokens(tokens: Token[], options: JSONBeautifierOptions): string {
  let result = '';
  let level = 0;
  let tokenIndex = 0;
  
  // Stack to track current context (object or array)
  const contextStack: ('object' | 'array')[] = [];
  // Track if this is the first element in current context
  let isFirstInContext = true;
  
  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex++];
    
    switch (token.type) {
      case 'objectStart':
        contextStack.push('object');
        isFirstInContext = true;
        
        // Handle empty objects
        if (tokenIndex < tokens.length && tokens[tokenIndex].type === 'objectEnd') {
          result += '{}';
          tokenIndex++;
          contextStack.pop();
        } else {
          result += '{\n' + options.indent.repeat(level + 1);
          level++;
        }
        break;
      
      case 'objectEnd':
        level--;
        contextStack.pop();
        if (tokenIndex - 2 >= 0 && tokens[tokenIndex - 2].type !== 'objectStart') {
          result += '\n' + options.indent.repeat(level);
        }
        result += '}';
        isFirstInContext = false;
        break;
      
      case 'arrayStart':
        contextStack.push('array');
        isFirstInContext = true;
        
        // Handle empty arrays
        if (tokenIndex < tokens.length && tokens[tokenIndex].type === 'arrayEnd') {
          result += '[]';
          tokenIndex++;
          contextStack.pop();
        } else {
          result += '[\n' + options.indent.repeat(level + 1);
          level++;
        }
        break;
      
      case 'arrayEnd':
        level--;
        contextStack.pop();
        if (tokenIndex - 2 >= 0 && tokens[tokenIndex - 2].type !== 'arrayStart') {
          result += '\n' + options.indent.repeat(level);
        }
        result += ']';
        isFirstInContext = false;
        break;
      
      case 'colon':
        result += ': ';
        break;
      
      case 'comma':
        result += ',\n' + options.indent.repeat(level);
        isFirstInContext = false;
        break;
      
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
        result += token.value;
        break;
    }
    
    // Check for max length
    if (options.maxLength > 0 && result.length > options.maxLength) {
      return result + '\n\n[Output truncated due to size]';
    }

    console.log(`firstInContext: ${isFirstInContext}, context: ${contextStack.join(', ')}`);
  }
  
  return result;
}

/**
 * Minify JSON by removing all unnecessary whitespace
 * 
 * @param jsonString JSON string to minify
 * @returns Minified JSON string
 */
export function minifyJSON(jsonString: string): string {
  try {
    // Parse the JSON string to ensure it's valid
    const parsed = JSON.parse(jsonString);
    
    // Return compact JSON
    return JSON.stringify(parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Extract position information if available
      const match = /position\s+(\d+)/.exec(error.message);
      const position = match ? parseInt(match[1], 10) : undefined;
      
      throw new JSONBeautifierError(
        `Invalid JSON: ${error.message}`,
        position
      );
    }
    throw error;
  }
}

/**
 * Validate if a string is valid JSON
 * 
 * @param jsonString String to validate
 * @returns Object with validation result
 */
export function validateJSON(jsonString: string): {
  valid: boolean;
  error?: {
    message: string;
    position?: number;
  }
} {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Extract position information if available
      const match = /position\s+(\d+)/.exec(error.message);
      const position = match ? parseInt(match[1], 10) : undefined;
      
      return {
        valid: false,
        error: {
          message: error.message,
          position
        }
      };
    }
    
    return {
      valid: false,
      error: {
        message: String(error)
      }
    };
  }
}

/**
 * Utility to find the position in a string where an error occurred
 * 
 * @param jsonString JSON string
 * @param position Position of the error
 * @returns Context information around the error
 */
export function getErrorContext(jsonString: string, position?: number): {
  line: number;
  column: number;
  context: string;
  pointer: string;
} | null {
  if (position === undefined || position < 0 || position >= jsonString.length) {
    return null;
  }
  
  // Find line and column
  const lines = jsonString.slice(0, position).split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  
  // Extract context around the error
  const errorLine = jsonString.split('\n')[line - 1] || '';
  const context = errorLine;
  
  // Create a pointer to the exact error location
  const pointer = ' '.repeat(column - 1) + '^';
  
  return {
    line,
    column,
    context,
    pointer
  };
}

/**
 * Utility to highlight syntax in JSON string
 * Simple version that adds basic HTML styling
 * 
 * @param jsonString Formatted JSON string
 * @returns HTML string with syntax highlighting
 */
export function highlightJSON(jsonString: string): string {
  // Replace with proper syntax highlighting
  return jsonString
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
}

/**
 * Utility function to detect encoding and handle BOM
 * 
 * @param buffer The input buffer
 * @returns The detected encoding and processed string
 */
export function detectAndProcessEncoding(buffer: Uint8Array): {
  encoding: string;
  content: string;
} {
  // Check for BOM (Byte Order Mark)
  if (buffer.length >= 3 && 
      buffer[0] === 0xEF && 
      buffer[1] === 0xBB && 
      buffer[2] === 0xBF) {
    // UTF-8 with BOM
    return {
      encoding: 'UTF-8 with BOM',
      content: new TextDecoder('utf-8').decode(buffer.slice(3))
    };
  } else if (buffer.length >= 2 && 
             buffer[0] === 0xFE && 
             buffer[1] === 0xFF) {
    // UTF-16 BE
    return {
      encoding: 'UTF-16 BE',
      content: new TextDecoder('utf-16be').decode(buffer.slice(2))
    };
  } else if (buffer.length >= 2 && 
             buffer[0] === 0xFF && 
             buffer[1] === 0xFE) {
    // UTF-16 LE
    return {
      encoding: 'UTF-16 LE',
      content: new TextDecoder('utf-16le').decode(buffer.slice(2))
    };
  }
  
  // Default to UTF-8
  return {
    encoding: 'UTF-8',
    content: new TextDecoder('utf-8').decode(buffer)
  };
}

// Example usage:
// const beautified = beautifyJSON('{"name":"John","age":30,"city":"New York"}');
// console.log(beautified);
//
// // With options
// const custom = beautifyJSON('{"name":"John","age":30,"city":"New York"}', {
//   indent: '    ', // 4 spaces
//   sortKeys: true  // Sort object keys alphabetically
// });
// console.log(custom);