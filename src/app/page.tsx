import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, Star } from "lucide-react";
import StructuredData, { websiteStructuredData, organizationStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevUtils - Free Online Developer Tools | JSON, JWT, Base64 & More",
  description: "Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion. Fast, secure, and privacy-focused developer utilities used by 10,000+ developers worldwide.",
  alternates: {
    canonical: 'https://devutils.dev',
  },
  openGraph: {
    title: "DevUtils - Free Online Developer Tools | JSON, JWT, Base64 & More",
    description: "Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion.",
    url: 'https://devutils.dev',
    type: 'website',
  },
};

export default function Home() {
  const cardData = [
    {
      title: "JSON Formatter & Validator",
      description: "Format, validate, and beautify JSON data instantly. Perfect for debugging APIs and organizing data structures.",
      url: "/json-formatter",
      cta: "Format JSON",
      keywords: "json formatter, json validator, json beautifier"
    },
    {
      title: "JWT Token Parser & Decoder",
      description: "Decode JWT tokens safely and view header, payload, and signature. Essential for API authentication debugging.",
      url: "/jwt-parser",
      cta: "Decode JWT",
      keywords: "jwt decoder, jwt parser, token decoder"
    },
    {
      title: "Base64 Encoder & Decoder",
      description: "Encode and decode Base64 strings quickly. Supports text, URLs, and file content encoding.",
      url: "/base-64-decoder",
      cta: "Convert Base64",
      keywords: "base64 encoder, base64 decoder, base64 converter"
    },
    {
      title: "Query Params to JSON Converter",
      description: "Convert URL query parameters to clean JSON format. Useful for API testing and data transformation.",
      url: "/query-params-json",
      cta: "Convert Query Params",
      keywords: "query params converter, url to json, query string parser"
    },
    {
      title: "JSON Compare Tool",
      description: "Compare two JSON objects and highlight differences. Perfect for API response comparison and debugging.",
      url: "/json-compare",
      cta: "Compare JSON",
      keywords: "json compare, json diff, json comparison tool"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Private & Secure",
      description: "All processing happens locally in your browser. No data is sent to our servers."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant results with optimized algorithms. No waiting, no loading screens."
    },
    {
      icon: Users,
      title: "Developer Focused",
      description: "Built by developers, for developers. Clean interface, powerful features."
    }
  ];

  return (
    <>
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={organizationStructuredData} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Free Online Developer Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Fast, secure, and privacy-focused developer utilities for JSON formatting, JWT parsing, Base64 encoding, and more.
            Trusted by <span className="font-semibold text-primary">10,000+</span> developers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DevUtils?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border bg-card">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Developer Tools Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription className="text-sm">{card.description}</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">
                    Keywords: {card.keywords}
                  </div>
                </CardHeader>
                <CardFooter>
                  <Link href={card.url} className="w-full">
                    <Button className="w-full">
                      {card.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-16 prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Professional Developer Tools for Modern Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold mb-4">Essential JSON Tools</h3>
              <p className="mb-4">
                Our JSON formatter and validator helps developers quickly format, validate, and debug JSON data.
                Whether you&apos;re working with API responses, configuration files, or data structures, our tool ensures
                your JSON is properly formatted and error-free.
              </p>
              <p className="mb-4">
                The JSON compare tool allows you to easily spot differences between two JSON objects, making it
                perfect for API testing, data migration, and debugging applications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Security & Authentication Tools</h3>
              <p className="mb-4">
                Our JWT token parser safely decodes JSON Web Tokens to help you debug authentication issues and
                understand token structure. View headers, payloads, and verify signatures without compromising security.
              </p>
              <p className="mb-4">
                All tools prioritize privacy and security - processing happens entirely in your browser with no
                data transmitted to external servers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}