import JWTToeknParser from "@/components/jwttokenparser/JWTTokenParser";
import StructuredData, { createToolStructuredData } from "@/components/StructuredData";
import FAQ, { jwtParserFAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JWT Token Parser & Decoder Online | DevUtils",
  description: "Decode and parse JWT tokens safely with our free online JWT decoder. View header, payload, and signature details. Perfect for debugging authentication and API tokens. No data stored.",
  keywords: ["jwt decoder", "jwt parser", "jwt token decoder", "json web token decoder", "jwt debugger", "decode jwt", "jwt analyzer", "authentication token parser"],
  alternates: {
    canonical: 'https://devutils.dev/jwt-parser',
  },
  openGraph: {
    title: "Free JWT Token Parser & Decoder Online | DevUtils",
    description: "Decode and parse JWT tokens safely with our free online JWT decoder. View header, payload, and signature details.",
    url: 'https://devutils.dev/jwt-parser',
    type: 'website',
  },
};

const toolData = {
  name: "JWT Token Parser & Decoder",
  description: "Decode and parse JWT tokens safely and view header, payload, and signature. Essential for API authentication debugging.",
  url: "https://devutils.dev/jwt-parser",
  category: "Security Tools",
  features: [
    "Decode JWT tokens safely",
    "View header and payload",
    "Signature verification",
    "Token expiration check",
    "Algorithm identification",
    "Local processing only"
  ]
};

export default function JwtParser() {
  return (
    <>
      <StructuredData data={createToolStructuredData(toolData)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">JWT Token Parser & Decoder</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Decode and parse JWT tokens safely. View header, payload, and signature details. Perfect for debugging authentication and API tokens.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Secure decoding</span>
              <span>✓ No data stored</span>
              <span>✓ Algorithm support</span>
              <span>✓ Expiration check</span>
            </div>
          </header>

          <JWTToeknParser />

          <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Understanding JWT Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">What is JWT?</h3>
                <p className="text-sm leading-relaxed mb-4">
                  JSON Web Token (JWT) is a secure way to transmit information between parties as a JSON object.
                  JWTs are commonly used for authentication and authorization in web applications and APIs.
                </p>
                <h3 className="text-lg font-semibold mb-3">JWT Structure</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Header:</strong> Contains token type and signing algorithm</li>
                  <li>• <strong>Payload:</strong> Contains claims and user data</li>
                  <li>• <strong>Signature:</strong> Ensures token integrity</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Debug authentication issues</li>
                  <li>• Verify token expiration</li>
                  <li>• Check user permissions</li>
                  <li>• Understand token structure</li>
                  <li>• Validate API responses</li>
                  <li>• Security auditing</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Security Notice</h3>
                <p className="text-sm leading-relaxed text-amber-600 dark:text-amber-400">
                  All JWT decoding happens locally in your browser. No tokens are sent to our servers,
                  ensuring your sensitive data remains private and secure.
                </p>
              </div>
            </div>
          </section>

          <FAQ items={jwtParserFAQ} />
        </div>
      </main>
    </>
  );
}
