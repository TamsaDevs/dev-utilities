'use client';

import React, { useState, useCallback } from 'react';
import { convertQueryToJson, convertJsonToQuery } from '@/lib/utils'; // Using alias @/

const ConverterForm: React.FC = () => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [queryCopied, setQueryCopied] = useState<boolean>(false);
  const [jsonCopied, setJsonCopied] = useState<boolean>(false);

  const handleConvertToJSON = useCallback(() => {
    setError(null);
    setJsonCopied(false);
    const result = convertQueryToJson(queryInput);
    if (result !== null) {
      try {
        setJsonInput(JSON.stringify(result, null, 2)); // Pretty print JSON
      } catch {
        setError('Failed to stringify the resulting JSON object.');
        setJsonInput('');
      }
    } else {
      setError('Invalid query string or URL format.');
      setJsonInput('');
    }
  }, [queryInput]);

  const handleConvertToQuery = useCallback(() => {
    setError(null);
    setQueryCopied(false);
    try {
      const jsonObject = JSON.parse(jsonInput);
      if (typeof jsonObject === 'object' && jsonObject !== null && !Array.isArray(jsonObject)) {
        const result = convertJsonToQuery(jsonObject);
        setQueryInput(result);
      } else {
        setError('Input must be a valid JSON object (not an array or primitive).');
        setQueryInput('');
      }
    } catch {
      setError('Invalid JSON format.');
      setQueryInput('');
    }
  }, [jsonInput]);

  const handleCopy = useCallback(async (text: string, type: 'query' | 'json') => {
      if (!navigator.clipboard) {
          setError('Clipboard API not available in this browser.');
          return;
      }
      try {
          await navigator.clipboard.writeText(text);
          if (type === 'query') {
              setQueryCopied(true);
              setJsonCopied(false); // Reset other button
              setTimeout(() => setQueryCopied(false), 1500); // Reset after 1.5s
          } else {
              setJsonCopied(true);
              setQueryCopied(false); // Reset other button
              setTimeout(() => setJsonCopied(false), 1500); // Reset after 1.5s
          }
          setError(null); // Clear error on successful copy
      } catch {
          setError('Failed to copy text to clipboard.');
          setQueryCopied(false);
          setJsonCopied(false);
      }
  }, []);


  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Query String Input Area */}
      <div className="space-y-2">
        <label htmlFor="query-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Query String / URL
        </label>
        <div className="relative">
          <textarea
            id="query-input"
            rows={4}
            className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., key=value&arr[]=1&arr[]=2 or https://example.com?id=123"
            value={queryInput}
            onChange={(e) => { setQueryInput(e.target.value); setQueryCopied(false); }}
          />
          <button
            type="button"
            onClick={() => handleCopy(queryInput, 'query')}
            className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${queryCopied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'} transition duration-150 ease-in-out`}
            disabled={!queryInput}
            aria-label="Copy query string"
          >
            {queryCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={handleConvertToJSON}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={!queryInput}
        >
          Convert to JSON &darr;
        </button>
        <button
          type="button"
          onClick={handleConvertToQuery}
          className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={!jsonInput}
        >
          &uarr; Convert to Query Params
        </button>
      </div>

      {/* JSON Input/Output Area */}
      <div className="space-y-2">
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          JSON Object
        </label>
         <div className="relative">
          <textarea
            id="json-input"
            rows={8}
            className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-mono text-sm transition duration-150 ease-in-out"
            placeholder={`{\n  "key": "value",\n  "count": 10,\n  "arr": [\n    1,\n    2\n  ]\n}`}
            value={jsonInput}
            onChange={(e) => { setJsonInput(e.target.value); setJsonCopied(false); }}
            spellCheck="false"
          />
          <button
             type="button"
             onClick={() => handleCopy(jsonInput, 'json')}
             className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${jsonCopied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'} transition duration-150 ease-in-out`}
             disabled={!jsonInput}
             aria-label="Copy JSON object"
           >
             {jsonCopied ? 'Copied!' : 'Copy'}
           </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-center text-red-600 dark:text-red-400 text-sm font-medium p-2 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ConverterForm;
