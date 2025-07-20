import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About DevUtils - Free Developer Tools for Modern Development",
    description: "Learn about DevUtils, our mission to provide free, secure, and privacy-focused developer tools. Discover why thousands of developers trust our online utilities for JSON, JWT, Base64, and more.",
    keywords: ["about devutils", "developer tools", "free online tools", "privacy-focused", "open source tools"],
    alternates: {
        canonical: 'https://devutils.dev/about',
    },
    openGraph: {
        title: "About DevUtils - Free Developer Tools for Modern Development",
        description: "Learn about DevUtils and our mission to provide free, secure, and privacy-focused developer tools.",
        url: 'https://devutils.dev/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About DevUtils</h1>
                    <p className="text-xl text-muted-foreground">
                        Free, secure, and privacy-focused developer tools for modern development
                    </p>
                </header>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            DevUtils was created with a simple mission: to provide developers with fast, reliable, and secure
                            online tools that respect privacy and don&apos;t compromise on functionality. We believe that essential
                            developer utilities should be free, accessible, and trustworthy.
                        </p>
                        <p className="text-lg leading-relaxed">
                            In an era where data privacy is paramount, we&apos;ve built our tools to process everything locally
                            in your browser. No data is ever sent to our servers, ensuring your sensitive information
                            remains completely private and secure.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Why Choose DevUtils?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">🔒 Privacy First</h3>
                                <p className="mb-6">
                                    All processing happens locally in your browser. We never see, store, or transmit your data.
                                    Your information stays on your device, exactly where it belongs.
                                </p>

                                <h3 className="text-xl font-semibold mb-4">⚡ Lightning Fast</h3>
                                <p className="mb-6">
                                    Our tools are optimized for speed and efficiency. No server round trips, no waiting times -
                                    just instant results when you need them.
                                </p>

                                <h3 className="text-xl font-semibold mb-4">🆓 Always Free</h3>
                                <p>
                                    We believe essential developer tools should be accessible to everyone. All our tools are
                                    completely free with no registration required, no ads, and no hidden costs.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">🛠️ Developer Focused</h3>
                                <p className="mb-6">
                                    Built by developers, for developers. We understand your workflow and create tools that
                                    integrate seamlessly into your development process.
                                </p>

                                <h3 className="text-xl font-semibold mb-4">🎨 Clean Interface</h3>
                                <p className="mb-6">
                                    Simple, intuitive interfaces that don&apos;t get in your way. Dark mode support and
                                    responsive design for comfortable use across all devices.
                                </p>

                                <h3 className="text-xl font-semibold mb-4">🔧 Reliable</h3>
                                <p>
                                    Robust error handling, comprehensive validation, and consistent performance.
                                    Our tools work when you need them to.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Our Tools</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            We&apos;ve carefully curated a collection of essential developer utilities that cover the most
                            common tasks in modern web development:
                        </p>
                        <ul className="space-y-3 text-lg">
                            <li><strong>JSON Formatter & Validator</strong> - Format, validate, and beautify JSON data</li>
                            <li><strong>JWT Token Parser</strong> - Decode and analyze JSON Web Tokens safely</li>
                            <li><strong>Base64 Encoder/Decoder</strong> - Convert between text and Base64 encoding</li>
                            <li><strong>Query Params Converter</strong> - Transform URL parameters to JSON format</li>
                            <li><strong>JSON Compare Tool</strong> - Compare JSON objects and highlight differences</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Technology & Security</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            DevUtils is built with modern web technologies to ensure security, performance, and reliability:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Frontend Technology</h3>
                                <ul className="space-y-2">
                                    <li>• Next.js 15 with App Router</li>
                                    <li>• React 19 for interactive components</li>
                                    <li>• TypeScript for type safety</li>
                                    <li>• Tailwind CSS for styling</li>
                                    <li>• Radix UI for accessibility</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Security Features</h3>
                                <ul className="space-y-2">
                                    <li>• Client-side only processing</li>
                                    <li>• No data transmission to servers</li>
                                    <li>• Secure HTTPS encryption</li>
                                    <li>• Content Security Policy</li>
                                    <li>• Regular security audits</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Open Source & Community</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            We believe in transparency and community collaboration. DevUtils is open source,
                            allowing developers to review our code, contribute improvements, and suggest new features.
                        </p>
                        <div className="bg-muted p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
                            <ul className="space-y-2">
                                <li>• View our source code on GitHub</li>
                                <li>• Report bugs and request features</li>
                                <li>• Contribute to development</li>
                                <li>• Join our developer community</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Contact & Support</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Have questions, suggestions, or need help? We&apos;d love to hear from you:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                                <ul className="space-y-2">
                                    <li>• GitHub Issues for bug reports</li>
                                    <li>• Feature requests welcome</li>
                                    <li>• Community discussions</li>
                                    <li>• Developer feedback</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Follow Updates</h3>
                                <ul className="space-y-2">
                                    <li>• GitHub repository stars</li>
                                    <li>• Release notifications</li>
                                    <li>• New tool announcements</li>
                                    <li>• Security updates</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
