import queryString from 'query-string';

export function convertQueryToJson(input: string): object | null {
  if (!input || typeof input !== 'string') return null;
  try {
    let queryPart = '';

    try {
      if (input.includes('://')) {
        const url = new URL(input);
        queryPart = url.search.startsWith('?') ? url.search.substring(1) : url.search;
      } else {
        throw new Error('No protocol, fall back to manual parsing');
      }
    } catch {
      const questionMarkIndex = input.indexOf('?');
      queryPart = questionMarkIndex !== -1 ? input.substring(questionMarkIndex + 1) : input;
    }
    

    // Handle fragment identifier if present after query string
    const hashIndex = queryPart.indexOf('#');
    if (hashIndex !== -1) {
        queryPart = queryPart.substring(0, hashIndex);
    }

    return queryString.parse(queryPart, {
      parseNumbers: true,
      parseBooleans: true,
      // Note: query-string doesn't directly parse fragment identifiers from the query part itself.
      // The fragment is part of the URL, not the query string. We handle basic fragment removal above.
      // If fragment parsing *within* the query values is needed, that's different.
      // Keeping parseFragmentIdentifier: true as it might affect parsing values like `key=#value` if intended.
      parseFragmentIdentifier: true,
      arrayFormat: 'bracket', // Use 'bracket' for arrays like key[]=value1&key[]=value2
    });
  } catch {
    // Catch potential errors during parsing
    return null;
  }
}

export function convertJsonToQuery(jsonObject: object): string {
  if (!jsonObject || typeof jsonObject !== 'object' || Array.isArray(jsonObject)) {
      // Ensure it's a non-array object
      return '';
  }
  try {
    return queryString.stringify(jsonObject, {
      arrayFormat: 'bracket', // Consistent array formatting
      encode: true, // Ensure values are URL-encoded
      skipNull: true, // Don't include null values in the output
      skipEmptyString: true, // Don't include empty string values
    });
  } catch {
    // Catch potential errors during stringification
    return '';
  }
}
