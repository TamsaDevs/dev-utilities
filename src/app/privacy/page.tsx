import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - DevUtils Developer Tools",
    description: "Learn how DevUtils protects your privacy. All processing happens locally in your browser with no data collection or transmission to servers.",
    keywords: ["privacy policy", "data protection", "local processing", "no data collection"],
    alternates: {
        canonical: 'https://devutils.dev/privacy',
    },
    openGraph: {
        title: "Privacy Policy - DevUtils Developer Tools",
        description: "Learn how DevUtils protects your privacy with local processing and no data collection.",
        url: 'https://devutils.dev/privacy',
        type: 'website',
    },
};

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-xl text-muted-foreground">
                        Your privacy is our priority. Learn how we protect your data.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Our Privacy Commitment</h2>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">🔒 Zero Data Collection</h3>
                            <p className="text-green-700 dark:text-green-300">
                                DevUtils is designed with privacy as the foundation. All tools process data entirely within
                                your browser. We do not collect, store, transmit, or have access to any of the data you
                                process using our tools.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">How Our Tools Work</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Client-Side Processing</h3>
                                <ul className="space-y-3">
                                    <li>• All JSON formatting happens in your browser</li>
                                    <li>• JWT tokens are decoded locally</li>
                                    <li>• Base64 encoding/decoding is done client-side</li>
                                    <li>• Query parameter conversion is local</li>
                                    <li>• No data leaves your device</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">No Server Communication</h3>
                                <ul className="space-y-3">
                                    <li>• Tools work offline after initial page load</li>
                                    <li>• No API calls to our servers for processing</li>
                                    <li>• No data transmission during tool usage</li>
                                    <li>• Processing happens entirely in JavaScript</li>
                                    <li>• Your data never leaves your browser</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Information We Do NOT Collect</h2>
                        <div className="bg-muted p-6 rounded-lg">
                            <ul className="space-y-3 text-lg">
                                <li>• ❌ Personal information or identification data</li>
                                <li>• ❌ JSON data you format or validate</li>
                                <li>• ❌ JWT tokens you decode</li>
                                <li>• ❌ Base64 strings you encode/decode</li>
                                <li>• ❌ Query parameters you convert</li>
                                <li>• ❌ Any files or content you process</li>
                                <li>• ❌ IP addresses or location data</li>
                                <li>• ❌ Browser fingerprinting data</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Minimal Analytics</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            To improve our service and understand usage patterns, we may collect minimal, anonymous analytics data:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">What We May Track</h3>
                                <ul className="space-y-2">
                                    <li>• Page views and tool usage (anonymous)</li>
                                    <li>• Browser type and version</li>
                                    <li>• General geographic region (country level)</li>
                                    <li>• Referrer information</li>
                                    <li>• Performance metrics</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Analytics Purpose</h3>
                                <ul className="space-y-2">
                                    <li>• Understand which tools are most useful</li>
                                    <li>• Identify performance issues</li>
                                    <li>• Plan new features and improvements</li>
                                    <li>• Ensure cross-browser compatibility</li>
                                    <li>• Optimize user experience</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Cookies and Local Storage</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Essential Cookies Only</h3>
                                <p className="leading-relaxed">
                                    We use minimal cookies and local storage only for essential functionality:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li>• Theme preferences (dark/light mode)</li>
                                    <li>• Tool settings and configurations</li>
                                    <li>• Recent tool usage for convenience</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">No Tracking Cookies</h3>
                                <p className="leading-relaxed">
                                    We do not use cookies for tracking, advertising, or cross-site identification.
                                    All stored data is for your convenience and remains on your device.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Content Delivery</h3>
                                <p className="leading-relaxed mb-4">
                                    Our website may be served through content delivery networks (CDNs) to ensure
                                    fast loading times worldwide. These services only have access to static website
                                    files, not your processed data.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Analytics Services</h3>
                                <p className="leading-relaxed">
                                    If we use analytics services, they are configured to respect privacy and
                                    anonymize data. We choose services that comply with privacy regulations
                                    and offer opt-out mechanisms.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Your Rights and Control</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Data Control</h3>
                                <ul className="space-y-2">
                                    <li>• Clear browser data to remove stored preferences</li>
                                    <li>• Disable cookies in your browser settings</li>
                                    <li>• Use private/incognito browsing mode</li>
                                    <li>• Use browser ad blockers if desired</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Privacy Tools</h3>
                                <ul className="space-y-2">
                                    <li>• Tools work with JavaScript disabled tracking</li>
                                    <li>• Compatible with privacy-focused browsers</li>
                                    <li>• No account creation required</li>
                                    <li>• Anonymous usage by design</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Security Measures</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Technical Security</h3>
                                <ul className="space-y-2">
                                    <li>• HTTPS encryption for all connections</li>
                                    <li>• Content Security Policy implementation</li>
                                    <li>• Regular security audits and updates</li>
                                    <li>• Secure hosting infrastructure</li>
                                    <li>• No data storage means no data breaches</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Operational Security</h3>
                                <ul className="space-y-2">
                                    <li>• Limited access to hosting infrastructure</li>
                                    <li>• Regular security monitoring</li>
                                    <li>• Incident response procedures</li>
                                    <li>• Privacy by design principles</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Changes to This Policy</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            We may update this privacy policy occasionally to reflect changes in our practices
                            or legal requirements. Any changes will be posted on this page with an updated
                            revision date.
                        </p>
                        <p className="leading-relaxed">
                            Significant changes that affect your privacy will be highlighted prominently
                            on our website. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            If you have questions about this privacy policy or our privacy practices,
                            please contact us through:
                        </p>
                        <ul className="space-y-2">
                            <li>• GitHub Issues on our repository</li>
                            <li>• Community discussions</li>
                            <li>• Developer feedback channels</li>
                        </ul>
                    </section>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                            📝 Summary: Your Privacy is Protected
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300">
                            DevUtils is built with privacy as the core principle. Your data is processed entirely
                            in your browser and never transmitted to our servers. We collect minimal anonymous
                            analytics to improve the service, but never access your sensitive data.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
