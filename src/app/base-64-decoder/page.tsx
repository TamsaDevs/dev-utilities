import Base64Converter from "@/components/base64/Base64Converter";
import StructuredData, { createToolStructuredData } from "@/components/StructuredData";
// import FAQ, { base64FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Base64 Encoder & Decoder Online | DevUtils",
  description: "Encode and decode Base64 strings instantly with our free online Base64 converter. Supports text, URLs, and file content encoding. Fast, secure, and privacy-focused tool for developers.",
  keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64", "decode base64", "base64 tool", "base64 online", "text to base64"],
  alternates: {
    canonical: 'https://devutils.dev/base-64-decoder',
  },
  openGraph: {
    title: "Free Base64 Encoder & Decoder Online | DevUtils",
    description: "Encode and decode Base64 strings instantly with our free online Base64 converter. Supports text, URLs, and file content encoding.",
    url: 'https://devutils.dev/base-64-decoder',
    type: 'website',
  },
};

const toolData = {
  name: "Base64 Encoder & Decoder",
  description: "Encode and decode Base64 strings quickly. Supports text, URLs, and file content encoding.",
  url: "https://devutils.dev/base-64-decoder",
  category: "Encoding Tools",
  features: [
    "Encode text to Base64",
    "Decode Base64 strings",
    "URL safe encoding",
    "File content support",
    "Batch processing",
    "Copy to clipboard"
  ]
};

export default function Base64Decode() {
  return (
    <>
      <StructuredData data={createToolStructuredData(toolData)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Base64 Encoder & Decoder</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Encode and decode Base64 strings instantly. Perfect for encoding text, URLs, and file content.
              All processing happens locally for maximum privacy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Instant conversion</span>
              <span>✓ URL safe encoding</span>
              <span>✓ File support</span>
              <span>✓ Local processing</span>
            </div>
          </header>

          <Base64Converter />

          <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About Base64 Encoding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">What is Base64?</h3>
                <p className="text-sm leading-relaxed mb-4">
                  Base64 is a binary-to-text encoding scheme that converts binary data into ASCII text format.
                  It&apos;s commonly used to encode data for transmission over text-based protocols like email and HTTP.
                </p>
                <h3 className="text-lg font-semibold mb-3">How it Works</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Uses 64 ASCII characters (A-Z, a-z, 0-9, +, /)</li>
                  <li>• Converts 3 bytes into 4 Base64 characters</li>
                  <li>• Adds padding with = characters if needed</li>
                  <li>• Results in ~33% size increase</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Email attachment encoding</li>
                  <li>• Data URLs for images</li>
                  <li>• API authentication</li>
                  <li>• Configuration file encoding</li>
                  <li>• Database binary storage</li>
                  <li>• Web development and APIs</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Encode text to Base64</li>
                  <li>• Decode Base64 to text</li>
                  <li>• URL-safe Base64 support</li>
                  <li>• File content encoding</li>
                  <li>• Error handling and validation</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}