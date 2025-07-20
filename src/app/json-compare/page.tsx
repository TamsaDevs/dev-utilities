import StructuredData, { createToolStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Compare Tool - Compare JSON Objects Online | DevUtils",
    description: "Compare two JSON objects and highlight differences instantly. Perfect for API response comparison, debugging, and data validation. Free online JSON diff tool with detailed change detection.",
    keywords: ["json compare", "json diff", "json comparison tool", "compare json objects", "json difference", "json validator", "api response compare", "json merge"],
    alternates: {
        canonical: 'https://devutils.dev/json-compare',
    },
    openGraph: {
        title: "JSON Compare Tool - Compare JSON Objects Online | DevUtils",
        description: "Compare two JSON objects and highlight differences instantly. Perfect for API response comparison and debugging.",
        url: 'https://devutils.dev/json-compare',
        type: 'website',
    },
};

const toolData = {
    name: "JSON Compare Tool",
    description: "Compare two JSON objects and highlight differences. Perfect for API response comparison and debugging.",
    url: "https://devutils.dev/json-compare",
    category: "JSON Tools",
    features: [
        "Side-by-side comparison",
        "Highlight differences",
        "Deep object comparison",
        "Array order detection",
        "Type change detection",
        "Export diff results"
    ]
};

export default function JSONComparePage() {
    return (
        <>
            <StructuredData data={createToolStructuredData(toolData)} />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">JSON Compare Tool</h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            Compare two JSON objects and highlight differences instantly. Perfect for API response comparison,
                            debugging applications, and data validation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                            <span>✓ Side-by-side view</span>
                            <span>✓ Highlight changes</span>
                            <span>✓ Deep comparison</span>
                            <span>✓ Export results</span>
                        </div>
                    </header>

                    <div className="bg-card border rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                        <p className="text-muted-foreground mb-6">
                            We&apos;re working on an advanced JSON comparison tool that will help you easily spot
                            differences between JSON objects with detailed change detection and highlighting.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="text-left">
                                <h3 className="font-semibold mb-2">Planned Features:</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• Visual side-by-side comparison</li>
                                    <li>• Color-coded difference highlighting</li>
                                    <li>• Deep nested object comparison</li>
                                    <li>• Array order change detection</li>
                                    <li>• Type change identification</li>
                                    <li>• Export comparison results</li>
                                </ul>
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold mb-2">Use Cases:</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• API response comparison</li>
                                    <li>• Configuration file changes</li>
                                    <li>• Data migration validation</li>
                                    <li>• Database record comparison</li>
                                    <li>• Version control for JSON</li>
                                    <li>• Quality assurance testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <section className="mt-12 prose prose-gray dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">Why JSON Comparison Matters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Development Benefits</h3>
                                <p className="text-sm leading-relaxed mb-4">
                                    JSON comparison tools are essential for modern development workflows. They help developers
                                    quickly identify changes in API responses, validate data transformations, and debug
                                    applications by highlighting exactly what changed between different JSON structures.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Quality Assurance</h3>
                                <p className="text-sm leading-relaxed">
                                    Automated JSON comparison ensures data integrity across systems. Whether you&apos;re
                                    migrating databases, updating APIs, or validating test results, having a reliable
                                    way to compare JSON objects saves time and prevents errors.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
