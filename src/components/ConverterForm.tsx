'use client';

import React, { useState, useCallback } from 'react';
import { convertQueryToJson, convertJsonToQuery } from '@/utils/utils';


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {Copy,ArrowBigDown, ArrowBigUp } from "lucide-react"
import { toast } from "sonner"


const ConverterForm: React.FC = () => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleConvertToJSON = useCallback(() => {
    setError(null);
    const result = convertQueryToJson(queryInput);
    if (result !== null) {
      try {
        setJsonInput(JSON.stringify(result, null, 2)); // Pretty print JSON
      } catch {
        setError('Failed to stringify the resulting JSON object.');
        setJsonInput('');
        toast("Failed to process",{
          description: "Please retry!"
        })
      }
    } else {
      setError('Invalid query string or URL format.');
      setJsonInput('');
      toast("Invalid Query-String or URL format",{
        description: "Please enter valid query parameters to convert"
      })
    }
  }, [queryInput]);

  const handleConvertToQuery = useCallback(() => {
    setError(null);
    try {
      const jsonObject = JSON.parse(jsonInput);
      if (typeof jsonObject === 'object' && jsonObject !== null && !Array.isArray(jsonObject)) {
        const result = convertJsonToQuery(jsonObject);
        setQueryInput(result);
      } else {
        setError('Input must be a valid JSON object (not an array or primitive).');
        setQueryInput('');
        toast("Invalid JSON object",{
          description: "Please enter valid JSON to convert"
        })
      }
    } catch {
      setError('Invalid JSON format.');
      setQueryInput('');
      toast("Invalid JSON format",{
        description: "Please enter valid JSON to convert"
      })
    }
  }, [jsonInput]);

  const handleCopy = useCallback(async (text: string, type: 'query' | 'json') => {
    console.log("Copying to clipboard:", type, text);
      if (!navigator.clipboard) {
          setError('Clipboard API not available in this browser.');
          toast("Clipboard API not available in this browser")
          return;
      }
      try {
          await navigator.clipboard.writeText(text);
          setError(null); // Clear error on successful copy
          toast("Copied to clipboard",{
            description: "You can paste it anywhere now!"
          })
      } catch {
          setError('Failed to copy text to clipboard.');
          toast(error)
      }
  }, []);


  return (
<main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
    <div className="space-y-6">
      {/* Input field */}
      <label htmlFor="query-input" className="block mb-0 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
           Query String / URL
      </label>
      <div className="relative">
        <Textarea
          id="query-input"
          rows={4}
          spellCheck="false"
          value={queryInput}
          onChange={(e) => { setQueryInput(e.target.value)}}
          placeholder="e.g., key=value&arr[]=1&arr[]=2 or https://example.com?id=123"
          className="min-h-[120px] pr-10 font-mono text-sm"
        />
        <button
          onClick={() => handleCopy(queryInput, 'query')}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Copy input"
          disabled={!queryInput}
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleConvertToJSON} className="gap-2">
          <ArrowBigDown className="h-4 w-4" />
          Convert to JSON
        </Button>
        <Button onClick={handleConvertToQuery} className="gap-2">
          Convert to Query
          <ArrowBigUp className="h-4 w-4" />
        </Button>
      </div>

      {/* Output field */}
      <label htmlFor="json-input" className="block mb-0 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          JSON Object
      </label>
      <div className="relative">
        <Textarea
          id='json-input'
          rows={8}
          placeholder={`{\n  "key": "value",\n  "count": 10,\n  "arr": [\n    1,\n    2\n  ]\n}`}
          value={jsonInput}
          onChange={(e) => { setJsonInput(e.target.value) }}
          spellCheck="false"
          className="min-h-[180px] pr-10 font-mono text-sm bg-muted/30"
        />
        <button
          onClick={() => handleCopy(jsonInput, 'json')}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Copy output"
          disabled={!jsonInput}
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  </main>


  );
};

export default ConverterForm;
