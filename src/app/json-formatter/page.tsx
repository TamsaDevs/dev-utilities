import JsonFormatter from "@/components/jsonformatter/JsonFormatter";
import StructuredData, { createToolStructuredData } from "@/components/StructuredData";
import FAQ, { jsonFormatterFAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online | DevUtils",
  description: "Format, validate, and beautify JSON data instantly with our free online JSON formatter. Perfect for debugging APIs, organizing data structures, and validating JSON syntax. No registration required.",
  keywords: ["json formatter", "json validator", "json beautifier", "json pretty print", "json minifier", "json parser", "format json online", "validate json"],
  alternates: {
    canonical: 'https://devutils.dev/json-formatter',
  },
  openGraph: {
    title: "Free JSON Formatter & Validator Online | DevUtils",
    description: "Format, validate, and beautify JSON data instantly with our free online JSON formatter. Perfect for debugging APIs and organizing data structures.",
    url: 'https://devutils.dev/json-formatter',
    type: 'website',
  },
};

const toolData = {
  name: "JSON Formatter & Validator",
  description: "Format, validate, and beautify JSON data instantly. Perfect for debugging APIs and organizing data structures.",
  url: "https://devutils.dev/json-formatter",
  category: "JSON Tools",
  features: [
    "Format and beautify JSON",
    "Validate JSON syntax",
    "Minify JSON data",
    "Error highlighting",
    "Copy formatted output",
    "Privacy-focused processing"
  ]
};

export default function JSONFormatterPage() {
  return (
    <>
      <StructuredData data={createToolStructuredData(toolData)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Format, validate, and beautify your JSON data instantly. Perfect for debugging APIs and organizing data structures.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Free to use</span>
              <span>✓ No registration</span>
              <span>✓ Privacy-focused</span>
              <span>✓ Instant results</span>
            </div>
          </header>

          <JsonFormatter />

          <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">How to Use the JSON Formatter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Format JSON:</strong> Beautify and indent your JSON for better readability</li>
                  <li>• <strong>Validate JSON:</strong> Check for syntax errors and invalid structure</li>
                  <li>• <strong>Minify JSON:</strong> Remove whitespace to reduce file size</li>
                  <li>• <strong>Error Detection:</strong> Highlight and explain JSON syntax errors</li>
                  <li>• <strong>Copy Output:</strong> Easily copy formatted JSON to clipboard</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Debug API responses and requests</li>
                  <li>• Format configuration files</li>
                  <li>• Validate JSON before deployment</li>
                  <li>• Clean up messy JSON data</li>
                  <li>• Convert between formatted and minified JSON</li>
                  <li>• Learn proper JSON syntax</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">Why Use Our JSON Formatter?</h3>
            <p className="text-sm leading-relaxed">
              Our JSON formatter tool processes everything locally in your browser, ensuring your data remains private and secure.
              No files are uploaded to servers, making it perfect for sensitive data. The tool supports large JSON files and
              provides instant feedback on syntax errors with helpful error messages.
            </p>
          </section>

          <FAQ items={jsonFormatterFAQ} />
        </div>
      </main>
    </>
  );
}
