import ConverterForm from "@/components/queryparamjson/ConverterForm";
import StructuredData, { createToolStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Query Parameters to JSON Converter Online | DevUtils",
  description: "Convert URL query parameters to clean JSON format instantly. Perfect for API testing, data transformation, and debugging web applications. Free online query string parser tool.",
  keywords: ["query params converter", "url to json", "query string parser", "query parameters to json", "url query converter", "query string to json", "parse url parameters"],
  alternates: {
    canonical: 'https://devutils.dev/query-params-json',
  },
  openGraph: {
    title: "Query Parameters to JSON Converter Online | DevUtils",
    description: "Convert URL query parameters to clean JSON format instantly. Perfect for API testing and data transformation.",
    url: 'https://devutils.dev/query-params-json',
    type: 'website',
  },
};

const toolData = {
  name: "Query Parameters to JSON Converter",
  description: "Convert URL query parameters to clean JSON format. Useful for API testing and data transformation.",
  url: "https://devutils.dev/query-params-json",
  category: "Data Conversion Tools",
  features: [
    "Parse URL query strings",
    "Convert to JSON format",
    "Handle arrays and objects",
    "URL decoding support",
    "Pretty print output",
    "Copy formatted JSON"
  ]
};

export default function QueryParamsJson() {
  return (
    <>
      <StructuredData data={createToolStructuredData(toolData)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Query Parameters to JSON Converter</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Convert URL query parameters to clean, formatted JSON. Perfect for API testing,
              data transformation, and debugging web applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ URL decoding</span>
              <span>✓ Array support</span>
              <span>✓ Nested objects</span>
              <span>✓ Pretty formatting</span>
            </div>
          </header>

          <ConverterForm />

          <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Working with URL Query Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">What are Query Parameters?</h3>
                <p className="text-sm leading-relaxed mb-4">
                  Query parameters are key-value pairs that appear after the ? in a URL. They&apos;re used to
                  pass data to web applications and APIs, making URLs dynamic and interactive.
                </p>
                <h3 className="text-lg font-semibold mb-3">Example Formats</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs font-mono">
                  <div>?name=John&age=30&city=New%20York</div>
                  <div className="mt-2">?tags[]=js&tags[]=react&active=true</div>
                  <div className="mt-2">?user[name]=John&user[email]=john@example.com</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• API testing and debugging</li>
                  <li>• Form data analysis</li>
                  <li>• URL data extraction</li>
                  <li>• Configuration parsing</li>
                  <li>• Data transformation</li>
                  <li>• Analytics data processing</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Automatic URL decoding</li>
                  <li>• Array parameter support</li>
                  <li>• Nested object handling</li>
                  <li>• Pretty JSON formatting</li>
                  <li>• Error handling</li>
                  <li>• Copy to clipboard</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">How to Use</h3>
            <ol className="space-y-2 text-sm">
              <li>1. Paste your URL or query string in the input field</li>
              <li>2. The tool automatically extracts and parses query parameters</li>
              <li>3. View the formatted JSON output</li>
              <li>4. Copy the result to your clipboard</li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
