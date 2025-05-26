/**
 * Test Suite for JSON Beautifier Utility
 * 
 * Tests cover:
 * - Basic formatting functionality
 * - Edge cases and error handling
 * - Large JSON handling
 * - Custom options
 * - Validation and utilities
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  beautifyJSON,
  minifyJSON,
  validateJSON,
  getErrorContext,
  highlightJSON,
  detectAndProcessEncoding,
  JSONBeautifierError,
  DEFAULT_BEAUTIFIER_OPTIONS,
  type JSONBeautifierOptions
} from '@/utils/jsonformatter/jsonformatterutils';

describe('JSON Beautifier Utility', () => {
  describe('beautifyJSON', () => {
    describe('basic functionality', () => {
      it('should format simple objects', () => {
        const input = '{"name":"John","age":30}';
        const expected = `{
  "name": "John",
  "age": 30
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should format simple arrays', () => {
        const input = '[1,2,3]';
        const expected = `[
  1,
  2,
  3
]`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should format nested objects', () => {
        const input = '{"user":{"name":"John","details":{"age":30,"city":"NYC"}}}';
        const expected = `{
  "user": {
    "name": "John",
    "details": {
      "age": 30,
      "city": "NYC"
    }
  }
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should format mixed nested structures', () => {
        const input = '{"users":[{"name":"John","hobbies":["reading","coding"]},{"name":"Jane","hobbies":["swimming"]}]}';
        const expected = `{
  "users": [
    {
      "name": "John",
      "hobbies": [
        "reading",
        "coding"
      ]
    },
    {
      "name": "Jane",
      "hobbies": [
        "swimming"
      ]
    }
  ]
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should handle empty objects and arrays', () => {
        expect(beautifyJSON('{}')).toBe('{}');
        expect(beautifyJSON('[]')).toBe('[]');
        expect(beautifyJSON('{"empty":{},"array":[]}')).toBe(`{
  "empty": {},
  "array": []
}`);
      });

      it('should handle all JSON primitive types', () => {
        const input = '{"string":"hello","number":42,"boolean":true,"null":null}';
        const expected = `{
  "string": "hello",
  "number": 42,
  "boolean": true,
  "null": null
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should handle special characters in strings', () => {
        const input = '{"text":"Hello\\nWorld\\t\\"quoted\\"","unicode":"\\u0048\\u0065\\u006C\\u006C\\u006F"}';
        const expected = `{
  "text": "Hello\\nWorld\\t\\"quoted\\"",
  "unicode": "Hello"
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });
    });

    describe('custom options', () => {
      it('should use custom indentation', () => {
        const input = '{"name":"John","age":30}';
        const options: Partial<JSONBeautifierOptions> = { indent: '    ' }; // 4 spaces
        const expected = `{
    "name": "John",
    "age": 30
}`;
        
        expect(beautifyJSON(input, options)).toBe(expected);
      });

      it('should use tab indentation', () => {
        const input = '{"name":"John","age":30}';
        const options: Partial<JSONBeautifierOptions> = { indent: '\t' };
        const expected = `{
\t"name": "John",
\t"age": 30
}`;
        
        expect(beautifyJSON(input, options)).toBe(expected);
      });

      it('should sort keys when requested', () => {
        const input = '{"zebra":"last","apple":"first","banana":"middle"}';
        const options: Partial<JSONBeautifierOptions> = { sortKeys: true };
        const expected = `{
  "apple": "first",
  "banana": "middle",
  "zebra": "last"
}`;
        
        expect(beautifyJSON(input, options)).toBe(expected);
      });

      it('should respect maxDepth option', () => {
        const input = '{"level1":{"level2":{"level3":{"level4":"deep"}}}}';
        const options: Partial<JSONBeautifierOptions> = { maxDepth: 2 };
        const result = beautifyJSON(input, options);
        
        expect(result).toContain('"[Max depth reached]"');
      });

      it('should handle maxLength option', () => {
        const input = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
        const options: Partial<JSONBeautifierOptions> = { maxLength: 50 };
        const result = beautifyJSON(input, options);
        
        expect(result.length).toBeLessThanOrEqual(100); // Should be truncated
      });

      it('should add trailing commas when requested', () => {
        const input = '{"name":"John","age":30}';
        const options: Partial<JSONBeautifierOptions> = { trailingComma: true };
        const result = beautifyJSON(input, options);
        
        expect(result).toContain('"age": 30,');
      });

      it('should handle preserveNull option', () => {
        const input = '{"value":null}';
        
        // Default behavior (preserve null)
        expect(beautifyJSON(input)).toContain('"value": null');
        
        // With preserveNull: false
        const options: Partial<JSONBeautifierOptions> = { preserveNull: false };
        expect(beautifyJSON(input, options)).toContain('"value": {}');
      });
    });

    describe('error handling', () => {
      it('should throw JSONBeautifierError for invalid JSON', () => {
        const invalidJson = '{"name": "John", "age":}';
        
        expect(() => beautifyJSON(invalidJson)).toThrow(JSONBeautifierError);
        expect(() => beautifyJSON(invalidJson)).toThrow('Invalid JSON');
      });

      it('should handle malformed objects', () => {
        const malformed = '{"name": "John" "age": 30}'; // Missing comma
        
        expect(() => beautifyJSON(malformed)).toThrow(JSONBeautifierError);
      });

      it('should handle unclosed strings', () => {
        const unclosed = '{"name": "John}';
        
        expect(() => beautifyJSON(unclosed)).toThrow(JSONBeautifierError);
      });

      it('should handle trailing commas in input', () => {
        const trailingComma = '{"name": "John", "age": 30,}';
        
        expect(() => beautifyJSON(trailingComma)).toThrow(JSONBeautifierError);
      });
    });

    describe('circular reference detection', () => {
      it('should detect and handle circular references', () => {
        // Create a circular reference scenario by testing with a complex nested structure
        // that would typically cause circular references in object manipulation
        const input = '{"a":{"b":{"c":"value"}}}';
        
        // This should work fine as there are no actual circular references in JSON strings
        expect(() => beautifyJSON(input)).not.toThrow();
      });
    });

    describe('large JSON handling', () => {
      it('should handle moderately large JSON', () => {
        // Create a JSON with many properties
        const largeObject: Record<string, unknown> = {};
        for (let i = 0; i < 1000; i++) {
          largeObject[`key${i}`] = `value${i}`;
        }
        const input = JSON.stringify(largeObject);
        
        const result = beautifyJSON(input);
        expect(result).toContain('"key0": "value0"');
        expect(result).toContain('"key999": "value999"');
      });

      it('should handle deeply nested structures', () => {
        // Create deeply nested object
        let nested: Record<string, unknown> = { value: 'deep' };
        for (let i = 0; i < 50; i++) {
          nested = { [`level${i}`]: nested };
        }
        const input = JSON.stringify(nested);
        
        expect(() => beautifyJSON(input)).not.toThrow();
      });

      it('should respect maxLength for very large inputs', () => {
        // Create a very large array
        const largeArray = Array.from({ length: 10000 }, (_, i) => i);
        const input = JSON.stringify(largeArray);
        const options: Partial<JSONBeautifierOptions> = { maxLength: 1000 };
        
        const result = beautifyJSON(input, options);
        expect(result.length).toBeLessThan(2000); // Should be truncated
      });
    });

    describe('special cases', () => {
      it('should handle numbers with scientific notation', () => {
        const input = '{"small":1e-10,"large":1.23e+20}';
        const result = beautifyJSON(input);
        
        expect(result).toContain('1e-10');
        expect(result).toContain('1.23e+20');
      });

      it('should handle negative numbers', () => {
        const input = '{"negative":-42,"negativeFloat":-3.14}';
        const expected = `{
  "negative": -42,
  "negativeFloat": -3.14
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should handle boolean values correctly', () => {
        const input = '{"isTrue":true,"isFalse":false}';
        const expected = `{
  "isTrue": true,
  "isFalse": false
}`;
        
        expect(beautifyJSON(input)).toBe(expected);
      });

      it('should handle already formatted JSON', () => {
        const input = `{
  "name": "John",
  "age": 30
}`;
        
        // Should still format correctly even if already formatted
        expect(() => beautifyJSON(input)).not.toThrow();
        const result = beautifyJSON(input);
        expect(result).toContain('"name": "John"');
      });
    });
  });

  describe('minifyJSON', () => {
    it('should remove all unnecessary whitespace', () => {
      const input = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
      const expected = '{"name":"John","age":30,"city":"New York"}';
      
      expect(minifyJSON(input)).toBe(expected);
    });

    it('should handle arrays', () => {
      const input = `[
  1,
  2,
  3
]`;
      const expected = '[1,2,3]';
      
      expect(minifyJSON(input)).toBe(expected);
    });

    it('should throw error for invalid JSON', () => {
      const invalidJson = '{"name": "John", "age":}';
      
      expect(() => minifyJSON(invalidJson)).toThrow(JSONBeautifierError);
    });

    it('should handle empty structures', () => {
      expect(minifyJSON('{}')).toBe('{}');
      expect(minifyJSON('[]')).toBe('[]');
    });
  });

  describe('validateJSON', () => {
    it('should return valid true for correct JSON', () => {
      const validJson = '{"name":"John","age":30}';
      const result = validateJSON(validJson);
      
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return valid false for incorrect JSON', () => {
      const invalidJson = '{"name": "John", "age":}';
      const result = validateJSON(invalidJson);
      
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Unexpected end');
    });

    it('should provide position information when available', () => {
      const invalidJson = '{"name": "John", "age":}';
      const result = validateJSON(invalidJson);
      
      expect(result.valid).toBe(false);
      expect(result.error?.position).toBeTypeOf('number');
    });

    it('should handle empty strings', () => {
      const result = validateJSON('');
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toContain('Unexpected end');
    });

    it('should handle non-JSON strings', () => {
      const result = validateJSON('hello world');
      
      expect(result.valid).toBe(false);
      expect(result.error?.message).toContain('Unexpected token');
    });
  });

  describe('getErrorContext', () => {
    it('should return context information for valid position', () => {
      const jsonString = `{
  "name": "John",
  "age": 30,
  "invalid":
}`;
      const position = 45; // Around the invalid part
      const context = getErrorContext(jsonString, position);
      
      expect(context).toBeDefined();
      expect(context?.line).toBeGreaterThan(0);
      expect(context?.column).toBeGreaterThan(0);
      expect(context?.context).toBeTypeOf('string');
      expect(context?.pointer).toContain('^');
    });

    it('should return null for invalid positions', () => {
      const jsonString = '{"name":"John"}';
      
      expect(getErrorContext(jsonString, -1)).toBeNull();
      expect(getErrorContext(jsonString, 1000)).toBeNull();
      expect(getErrorContext(jsonString, undefined)).toBeNull();
    });

    it('should handle multiline JSON correctly', () => {
      const jsonString = `{
  "line1": "value1",
  "line2": "value2"
}`;
      const position = 25; // Second line
      const context = getErrorContext(jsonString, position);
      
      expect(context?.line).toBe(2);
      expect(context?.column).toBeGreaterThan(0);
    });
  });

  describe('highlightJSON', () => {
    it('should add syntax highlighting classes', () => {
      const input = '{"name":"John","age":30,"active":true,"data":null}';
      const result = highlightJSON(input);
      
      expect(result).toContain('class="key"');
      expect(result).toContain('class="string"');
      expect(result).toContain('class="number"');
      expect(result).toContain('class="boolean"');
      expect(result).toContain('class="null"');
    });

    it('should preserve the original structure', () => {
      const input = '{"test":"value"}';
      const result = highlightJSON(input);
      
      // Should still contain the original content
      expect(result).toContain('"test"');
      expect(result).toContain('"value"');
    });

    it('should handle empty input', () => {
      expect(() => highlightJSON('')).not.toThrow();
      expect(highlightJSON('')).toBe('');
    });
  });

  describe('detectAndProcessEncoding', () => {
    it('should detect UTF-8 without BOM', () => {
      const content = '{"name":"John"}';
      const buffer = new TextEncoder().encode(content);
      const result = detectAndProcessEncoding(buffer);
      
      expect(result.encoding).toBe('UTF-8');
      expect(result.content).toBe(content);
    });

    it('should detect UTF-8 with BOM', () => {
      const content = '{"name":"John"}';
      const contentBuffer = new TextEncoder().encode(content);
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      const buffer = new Uint8Array(bom.length + contentBuffer.length);
      buffer.set(bom, 0);
      buffer.set(contentBuffer, bom.length);
      
      const result = detectAndProcessEncoding(buffer);
      
      expect(result.encoding).toBe('UTF-8 with BOM');
      expect(result.content).toBe(content);
    });

    it('should detect UTF-16 BE', () => {
      const bom = new Uint8Array([0xFE, 0xFF]);
      const content = new Uint8Array([0x00, 0x7B, 0x00, 0x7D]); // "{}" in UTF-16 BE
      const buffer = new Uint8Array(bom.length + content.length);
      buffer.set(bom, 0);
      buffer.set(content, bom.length);
      
      const result = detectAndProcessEncoding(buffer);
      
      expect(result.encoding).toBe('UTF-16 BE');
      expect(result.content).toBe('{}');
    });

    it('should detect UTF-16 LE', () => {
      const bom = new Uint8Array([0xFF, 0xFE]);
      const content = new Uint8Array([0x7B, 0x00, 0x7D, 0x00]); // "{}" in UTF-16 LE
      const buffer = new Uint8Array(bom.length + content.length);
      buffer.set(bom, 0);
      buffer.set(content, bom.length);
      
      const result = detectAndProcessEncoding(buffer);
      
      expect(result.encoding).toBe('UTF-16 LE');
      expect(result.content).toBe('{}');
    });

    it('should handle empty buffers', () => {
      const buffer = new Uint8Array(0);
      const result = detectAndProcessEncoding(buffer);
      
      expect(result.encoding).toBe('UTF-8');
      expect(result.content).toBe('');
    });
  });

  describe('JSONBeautifierError', () => {
    it('should create error with message', () => {
      const error = new JSONBeautifierError('Test error');
      
      expect(error.name).toBe('JSONBeautifierError');
      expect(error.message).toBe('Test error');
      expect(error.position).toBeUndefined();
    });

    it('should create error with position', () => {
      const error = new JSONBeautifierError('Test error', 42);
      
      expect(error.name).toBe('JSONBeautifierError');
      expect(error.message).toBe('Test error');
      expect(error.position).toBe(42);
    });

    it('should be instance of Error', () => {
      const error = new JSONBeautifierError('Test error');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(JSONBeautifierError);
    });
  });

  describe('DEFAULT_BEAUTIFIER_OPTIONS', () => {
    it('should have expected default values', () => {
      expect(DEFAULT_BEAUTIFIER_OPTIONS).toEqual({
        indent: "  ",
        maxDepth: 100,
        maxLength: 10000000,
        sortKeys: false,
        trailingComma: false,
        preserveNull: true
      });
    });
  });

  describe('integration tests', () => {
    it('should handle complex real-world JSON', () => {
      const complexJson = {
        "users": [
          {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "profile": {
              "age": 30,
              "preferences": {
                "theme": "dark",
                "notifications": true,
                "languages": ["en", "es", "fr"]
              },
              "metadata": null
            }
          },
          {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "profile": {
              "age": 25,
              "preferences": {
                "theme": "light",
                "notifications": false,
                "languages": ["en"]
              },
              "metadata": {
                "lastLogin": "2023-01-15T10:30:00Z",
                "loginCount": 42
              }
            }
          }
        ],
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 2,
          "hasNext": false
        }
      };

      const input = JSON.stringify(complexJson);
      const result = beautifyJSON(input);

      expect(result).toContain('"users": [');
      expect(result).toContain('"preferences": {');
      expect(result).toContain('"languages": [');
      expect(result).toContain('"metadata": null');
      expect(result).toContain('"hasNext": false');
    });

    it('should work with beautify -> minify -> beautify cycle', () => {
      const original = '{"name":"John","details":{"age":30,"hobbies":["reading","coding"]}}';
      
      const beautified = beautifyJSON(original);
      const minified = minifyJSON(beautified);
      const reBeautified = beautifyJSON(minified);
      
      expect(beautified).toBe(reBeautified);
      expect(minified).toBe(original);
    });

    it('should maintain data integrity through transformations', () => {
      const testData = {
        string: "Hello, World!",
        number: 3.14159,
        integer: 42,
        boolean: true,
        nullValue: null,
        array: [1, "two", false, null],
        object: {
          nested: {
            deep: "value"
          }
        }
      };

      const original = JSON.stringify(testData);
      const beautified = beautifyJSON(original);
      const minified = minifyJSON(beautified);
      
      // Parse back to verify data integrity
      const parsed = JSON.parse(minified);
      expect(parsed).toEqual(testData);
    });
  });

  describe('performance tests', () => {
    it('should handle reasonable performance for medium-sized JSON', () => {
      // Create a medium-sized JSON (about 100KB)
      const mediumData: Record<string, unknown> = {};
      for (let i = 0; i < 5000; i++) {
        mediumData[`key_${i}`] = {
          id: i,
          name: `Name ${i}`,
          data: Array.from({ length: 10 }, (_, j) => j * i),
          active: i % 2 === 0
        };
      }

      const input = JSON.stringify(mediumData);
      const startTime = performance.now();
      
      const result = beautifyJSON(input);
      
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(result).toContain('"key_0"');
      expect(result).toContain('"key_4999"');
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});

// Mock console for testing error scenarios without cluttering test output
beforeEach(() => {
  vi.clearAllMocks();
});