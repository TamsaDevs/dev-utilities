import React from 'react'
import { Github, Heart, Code } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-lg font-bold mb-4">
              <Code className="h-5 w-5 text-primary" />
              DevUtils
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Free, secure, and privacy-focused developer tools. All processing happens locally
              in your browser for maximum security and privacy.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/TamsaDevs/dev-utilities"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="font-semibold mb-4">Developer Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/json-formatter" className="text-muted-foreground hover:text-foreground transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/jwt-parser" className="text-muted-foreground hover:text-foreground transition-colors">
                  JWT Parser
                </Link>
              </li>
              <li>
                <Link href="/base-64-decoder" className="text-muted-foreground hover:text-foreground transition-colors">
                  Base64 Converter
                </Link>
              </li>
              <li>
                <Link href="/query-params-json" className="text-muted-foreground hover:text-foreground transition-colors">
                  Query Params Converter
                </Link>
              </li>
              <li>
                <Link href="/json-compare" className="text-muted-foreground hover:text-foreground transition-colors">
                  JSON Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/TamsaDevs/dev-utilities"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 sm:mb-0">
            <span>© {new Date().getFullYear()} DevUtils. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for developers</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Free • Secure • Privacy-Focused</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer