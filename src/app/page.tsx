import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const cardData = [
    {
      title: "Query Params to JSON",
      description: "Convert URL query parameters to JSON object format.",
      url: "/query-params-json",
      cta: "Convert Query Params",
    },
    {
      title: "JWT Token Parser",
      description: "Decode and parse JWT tokens easily.",
      url: "/jwt-parser",
      cta: "Decode JWT",
    },
    {
      title: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings easily.",
      url: "/base-64-decoder",
      cta: "Convert Base64",
    },
    {
      title: "JSON Formatter",
      description: "Format and beautify your JSON data.",
      url: "/json-formatter",
      cta: "Format JSON",
    },
    
  ];

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardData.map((card, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
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
    </main>
  );
}