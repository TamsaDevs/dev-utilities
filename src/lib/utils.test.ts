import { describe, it, expect } from 'vitest';
import { convertQueryToJson, convertJsonToQuery } from './utils';

describe('convertQueryToJson', () => {
  it('should parse a simple query string', () => {
    expect(convertQueryToJson('key=value&key2=value2')).toEqual({ key: 'value', key2: 'value2' });
  });

  it('should parse query string with numbers and booleans', () => {
    expect(convertQueryToJson('count=10&active=true&flag=false')).toEqual({ count: 10, active: true, flag: false });
  });

  it('should parse query string with arrays (bracket format)', () => {
    expect(convertQueryToJson('arr[]=1&arr[]=2&arr[]=true')).toEqual({ arr: [1, 2, true] });
  });

  it('should parse query string with special characters', () => {
    expect(convertQueryToJson('name=John%20Doe&email=test%40example.com')).toEqual({ name: 'John Doe', email: 'test@example.com' });
  });

  it('should parse query string from a full URL', () => {
    expect(convertQueryToJson('http://example.com/path?key=value&id=123')).toEqual({ key: 'value', id: 123 });
  });

  it('should parse query string from a full URL with hash', () => {
    expect(convertQueryToJson('http://example.com/path?key=value&id=123#section')).toEqual({ key: 'value', id: 123 });
  });

  it('should parse query string starting with ?', () => {
    expect(convertQueryToJson('?key=value&id=123')).toEqual({ key: 'value', id: 123 });
  });

  it('should handle query string with encoded components', () => {
    expect(convertQueryToJson('q=search%20term&lang=en%2Fus')).toEqual({ q: 'search term', lang: 'en/us' });
  });

  it('should handle empty input string', () => {
    expect(convertQueryToJson('')).toBeNull();
  });

  it('should handle input string without query parameters', () => {
    expect(convertQueryToJson('http://example.com/path')).toEqual({});
  });

   it('should handle input string with only ?', () => {
    expect(convertQueryToJson('?')).toEqual({});
  });

  it('should handle input string with only #', () => {
    expect(convertQueryToJson('#hash')).toEqual({}); // No query params, just fragment
  });

  it('should handle invalid URL gracefully', () => {
    expect(convertQueryToJson('http://?key=value')).toEqual({ key: 'value' }); // Should still parse query part
    expect(convertQueryToJson('just?key=value')).toEqual({ key: 'value' });
  });

  it('should return null for non-string input', () => {
    // @ts-expect-error - Testing invalid input type
    expect(convertQueryToJson(null)).toBeNull();
    // @ts-expect-error - Testing invalid input type
    expect(convertQueryToJson(undefined)).toBeNull();
    // @ts-expect-error - Testing invalid input type
    expect(convertQueryToJson(123)).toBeNull();
    // @ts-expect-error - Testing invalid input type
    expect(convertQueryToJson({})).toBeNull();
  });

  it('should handle nested structures if query-string supports them (usually flattened)', () => {
    // Note: query-string typically flattens nested objects unless specific formats are used.
    // Standard parsing might not produce nested objects directly.
    // Example: 'a[b]=c' might parse differently based on library settings.
    // Testing the default behavior here.
    expect(convertQueryToJson('user[name]=test&user[id]=1')).toEqual({ 'user[name]': 'test', 'user[id]': 1 });
  });
});

describe('convertJsonToQuery', () => {
  it('should stringify a simple object', () => {
    expect(convertJsonToQuery({ key: 'value', key2: 'value2' })).toBe('key=value&key2=value2');
  });

  it('should stringify an object with numbers and booleans', () => {
    expect(convertJsonToQuery({ count: 10, active: true, flag: false })).toBe('active=true&count=10&flag=false');
  });

  it('should stringify an object with arrays (bracket format)', () => {
    expect(convertJsonToQuery({ arr: [1, 2, true] })).toBe('arr[]=1&arr[]=2&arr[]=true');
  });

  it('should stringify an object with special characters', () => {
    expect(convertJsonToQuery({ name: 'John Doe', email: 'test@example.com' })).toBe('email=test%40example.com&name=John%20Doe');
  });

  it('should handle nested objects (query-string typically flattens)', () => {
    // query-string doesn't inherently create nested query params like 'user[name]=test' by default from nested JS objects.
    // It usually requires specific formatting or manual construction if that output is desired.
    // Testing standard stringify behavior:
    expect(convertJsonToQuery({ user: { name: 'test', id: 1 } })).toBe(''); // Stringify might ignore nested objects or handle them differently
    // If specific nested output is needed, the object structure or stringify options might need adjustment.
    // Let's test with a structure query-string understands for nesting:
    expect(convertJsonToQuery({ 'user[name]': 'test', 'user[id]': 1 })).toBe('user%5Bname%5D=test&user%5Bid%5D=1');
  });

  it('should handle null and undefined values (skip them)', () => {
    expect(convertJsonToQuery({ key: 'value', key2: null, key3: undefined, key4: '' })).toBe('key=value');
  });

  it('should handle empty object', () => {
    expect(convertJsonToQuery({})).toBe('');
  });

  it('should return empty string for non-object input', () => {
    // @ts-expect-error - Testing invalid input type
    expect(convertJsonToQuery(null)).toBe('');
    // @ts-expect-error - Testing invalid input type
    expect(convertJsonToQuery(undefined)).toBe('');
    // @ts-expect-error - Testing invalid input type
    expect(convertJsonToQuery(123)).toBe('');
    // @ts-expect-error - Testing invalid input type (string)
    expect(convertJsonToQuery('string')).toBe('');
    // Array is technically an object, but our function explicitly checks for !Array.isArray
    // However, TS might not require an error suppression if the base type 'object' is satisfied.
    // Let's keep it without suppression for now unless an error appears.
    expect(convertJsonToQuery([])).toBe(''); // Should not process arrays
  });

  it('should encode values correctly', () => {
    expect(convertJsonToQuery({ q: 'a/b c+d' })).toBe('q=a%2Fb%20c%2Bd');
  });
});
