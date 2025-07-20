interface StructuredDataProps {
    data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DevUtils - Free Developer Tools",
    "url": "https://devutils.dev",
    "description": "Free online developer tools for JSON formatting, JWT token parsing, Base64 encoding/decoding, and query parameter conversion.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://devutils.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    },
    "author": {
        "@type": "Organization",
        "name": "DevUtils"
    }
};

export const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DevUtils",
    "url": "https://devutils.dev",
    "description": "Providing free, fast, and secure online developer tools for developers worldwide.",
    "sameAs": [
        "https://github.com/TamsaDevs/dev-utilities"
    ]
};

export function createToolStructuredData(tool: {
    name: string;
    description: string;
    url: string;
    category: string;
    features: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "url": tool.url,
        "description": tool.description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": tool.features,
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "1.0",
        "author": {
            "@type": "Organization",
            "name": "DevUtils"
        }
    };
}
