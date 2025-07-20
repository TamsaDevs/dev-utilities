import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - DevUtils Developer Tools",
    description: "Terms of service for DevUtils developer tools. Free to use, no warranties, open source licensing terms.",
    keywords: ["terms of service", "terms of use", "legal", "license"],
    alternates: {
        canonical: 'https://devutils.dev/terms',
    },
    openGraph: {
        title: "Terms of Service - DevUtils Developer Tools",
        description: "Terms of service for DevUtils developer tools.",
        url: 'https://devutils.dev/terms',
        type: 'website',
    },
};

export default function TermsPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
                    <p className="text-xl text-muted-foreground">
                        Terms and conditions for using DevUtils developer tools
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Acceptance of Terms</h2>
                        <p className="text-lg leading-relaxed">
                            By accessing and using DevUtils (&quot;the Service&quot;), you accept and agree to be bound by
                            the terms and provision of this agreement. If you do not agree to abide by the above,
                            please do not use this service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Description of Service</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            DevUtils provides free online developer tools including but not limited to:
                        </p>
                        <ul className="space-y-2 text-lg">
                            <li>• JSON formatting and validation tools</li>
                            <li>• JWT token parsing and decoding tools</li>
                            <li>• Base64 encoding and decoding tools</li>
                            <li>• Query parameter conversion tools</li>
                            <li>• JSON comparison and diff tools</li>
                            <li>• Other developer utilities as added</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Use License</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Personal and Commercial Use</h3>
                                <p className="leading-relaxed">
                                    Permission is granted to use DevUtils for personal, educational, and commercial purposes.
                                    The tools are provided free of charge and without restriction on usage volume or frequency.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Restrictions</h3>
                                <p className="leading-relaxed mb-4">You may not:</p>
                                <ul className="space-y-2">
                                    <li>• Attempt to reverse engineer or copy the service</li>
                                    <li>• Use the service for illegal or harmful activities</li>
                                    <li>• Attempt to overwhelm or disrupt the service</li>
                                    <li>• Remove or modify any copyright notices</li>
                                    <li>• Redistribute the service as your own</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Privacy and Data Processing</h2>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">Data Privacy</h3>
                            <p className="text-green-700 dark:text-green-300 leading-relaxed">
                                All data processing occurs locally in your browser. DevUtils does not collect,
                                store, or transmit any of the data you process using our tools. Your data
                                remains private and under your control at all times.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Disclaimer</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">No Warranty</h3>
                                <p className="leading-relaxed">
                                    The information and tools on this website are provided on an &quot;as is&quot; basis.
                                    To the fullest extent permitted by law, DevUtils excludes all representations,
                                    warranties, conditions and terms whether express or implied.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Accuracy</h3>
                                <p className="leading-relaxed">
                                    While we strive to ensure the accuracy and functionality of our tools,
                                    we make no guarantees about their correctness, reliability, or suitability
                                    for any particular purpose.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Limitation of Liability</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            In no event shall DevUtils or its developers be liable for any indirect,
                            incidental, special, consequential, or punitive damages, including without
                            limitation, loss of profits, data, use, goodwill, or other intangible losses
                            resulting from your use of the service.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-200">Important Notice</h3>
                            <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                                The tools are provided for convenience and should not be relied upon for
                                critical or sensitive operations without independent verification. Always
                                validate important results using multiple sources.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Service Availability</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Uptime</h3>
                                <p className="leading-relaxed">
                                    While we strive to maintain high availability, we do not guarantee
                                    uninterrupted access to the service. Maintenance, updates, or technical
                                    issues may temporarily affect availability.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Modifications</h3>
                                <p className="leading-relaxed">
                                    We reserve the right to modify, suspend, or discontinue any part of
                                    the service at any time without prior notice.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Intellectual Property</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Open Source</h3>
                                <p className="leading-relaxed">
                                    DevUtils is open source software. The source code is available under
                                    the terms specified in the project repository. You are free to view,
                                    modify, and contribute to the codebase according to the license terms.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Trademarks</h3>
                                <p className="leading-relaxed">
                                    &quot;DevUtils&quot; and related marks are trademarks of the project.
                                    Usage of these marks should comply with standard trademark guidelines.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">User Conduct</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Users are expected to use the service responsibly and in compliance with
                            applicable laws. This includes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Acceptable Use</h3>
                                <ul className="space-y-2">
                                    <li>• Use for legitimate development purposes</li>
                                    <li>• Respect service limitations</li>
                                    <li>• Report bugs and issues constructively</li>
                                    <li>• Provide helpful feedback</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Prohibited Use</h3>
                                <ul className="space-y-2">
                                    <li>• Attempting to break or exploit the service</li>
                                    <li>• Using for illegal activities</li>
                                    <li>• Disrupting service for other users</li>
                                    <li>• Circumventing security measures</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Termination</h2>
                        <p className="text-lg leading-relaxed">
                            We may terminate or suspend access to the service immediately, without prior
                            notice or liability, for any reason whatsoever, including without limitation
                            if you breach the Terms of Service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Changes to Terms</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            We reserve the right to modify or replace these Terms at any time. If a
                            revision is material, we will try to provide at least 30 days notice prior
                            to any new terms taking effect.
                        </p>
                        <p className="leading-relaxed">
                            Your continued use of the service after any such changes constitutes your
                            acceptance of the new Terms of Service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Governing Law</h2>
                        <p className="text-lg leading-relaxed">
                            These Terms shall be interpreted and governed by the laws of the jurisdiction
                            in which the service is operated, without regard to conflict of law provisions.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            If you have any questions about these Terms of Service, please contact us through:
                        </p>
                        <ul className="space-y-2">
                            <li>• GitHub Issues on our repository</li>
                            <li>• Community discussions and forums</li>
                            <li>• Developer feedback channels</li>
                        </ul>
                    </section>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                            📄 Terms Summary
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                            DevUtils is provided free of charge for any legitimate use. We prioritize
                            your privacy and don&apos;t collect your data. Use the tools responsibly and
                            verify important results independently.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
