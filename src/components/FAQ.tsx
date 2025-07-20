interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-border pb-6 last:border-b-0">
                        <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Predefined FAQ sets for different tools
export const jsonFormatterFAQ: FAQItem[] = [
    {
        question: "Is my JSON data secure when using this formatter?",
        answer: "Yes, absolutely. All JSON formatting and validation happens entirely in your browser. Your data never leaves your device or gets sent to our servers, ensuring complete privacy and security."
    },
    {
        question: "Can I format large JSON files?",
        answer: "Yes, our JSON formatter can handle large JSON files efficiently since processing happens locally in your browser. However, very large files may slow down based on your device's capabilities."
    },
    {
        question: "What JSON validation errors can this tool detect?",
        answer: "Our validator detects common JSON syntax errors including missing quotes, trailing commas, unescaped characters, missing brackets or braces, and invalid data types."
    },
    {
        question: "Can I minify JSON to reduce file size?",
        answer: "Yes, our tool can both format (beautify) JSON for readability and minify it to remove whitespace and reduce file size for production use."
    },
    {
        question: "Does the tool work offline?",
        answer: "Yes, once the page is loaded, the JSON formatter works completely offline since all processing happens in your browser using JavaScript."
    }
];

export const jwtParserFAQ: FAQItem[] = [
    {
        question: "Is it safe to paste JWT tokens here?",
        answer: "Yes, it's completely safe. All JWT decoding happens locally in your browser. No tokens are transmitted to our servers, ensuring your sensitive authentication data remains private."
    },
    {
        question: "Can this tool verify JWT signatures?",
        answer: "Our tool can decode JWT tokens and display signature information, but signature verification requires the secret key. For security reasons, never paste secret keys into online tools."
    },
    {
        question: "What information can I see in a decoded JWT?",
        answer: "You can view the header (algorithm, token type), payload (claims, user data, expiration), and signature details. The tool also highlights token expiration status."
    },
    {
        question: "Why does my JWT token show as expired?",
        answer: "JWT tokens have an expiration time (exp claim). If the current time is past the expiration time, the token is considered expired and should not be used for authentication."
    },
    {
        question: "Can I decode JWT tokens from any provider?",
        answer: "Yes, our tool can decode standard JWT tokens from any provider that follows RFC 7519 specifications, including tokens from Auth0, Firebase, AWS Cognito, and custom implementations."
    }
];

export const base64FAQ: FAQItem[] = [
    {
        question: "What is Base64 encoding used for?",
        answer: "Base64 encoding is used to convert binary data into ASCII text format for safe transmission over text-based protocols like email, HTTP, and JSON. It's commonly used for images in data URLs, API authentication, and file storage."
    },
    {
        question: "Is my data secure when using this Base64 tool?",
        answer: "Yes, all encoding and decoding happens locally in your browser. No data is transmitted to our servers, ensuring your information remains completely private and secure."
    },
    {
        question: "Can I encode files using this tool?",
        answer: "Currently, our tool focuses on text-based Base64 encoding and decoding. For file encoding, you can copy file contents as text, but for binary files, you may need specialized tools."
    },
    {
        question: "What's the difference between Base64 and URL-safe Base64?",
        answer: "URL-safe Base64 replaces + with - and / with _ characters, and may omit padding (=) characters. This makes the encoded string safe to use in URLs without encoding issues."
    },
    {
        question: "Why is my Base64 output longer than the original text?",
        answer: "Base64 encoding increases data size by approximately 33% because it represents 3 bytes of binary data using 4 ASCII characters. This is the trade-off for text-safe encoding."
    }
];

export const queryParamsFAQ: FAQItem[] = [
    {
        question: "Can this tool handle complex query parameter structures?",
        answer: "Yes, our tool supports arrays (using [] notation), nested objects (using dot notation), and URL-encoded values. It automatically parses and structures them into clean JSON format."
    },
    {
        question: "Is my URL data kept private?",
        answer: "Absolutely. All query parameter parsing happens locally in your browser. Your URLs and data are never sent to our servers, ensuring complete privacy."
    },
    {
        question: "What URL formats are supported?",
        answer: "You can paste complete URLs, or just the query string portion. The tool handles both encoded and decoded parameters, and supports various parameter naming conventions."
    },
    {
        question: "Can I convert JSON back to query parameters?",
        answer: "Currently, our tool focuses on converting query parameters to JSON. For the reverse operation, you may need to use JSON stringification and URL encoding manually."
    },
    {
        question: "How are duplicate parameter names handled?",
        answer: "When multiple parameters have the same name, they're automatically converted into an array in the JSON output, preserving all values."
    }
];
