import React from 'react'
import { Github, Heart, Code } from "lucide-react"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 px-6 border-t border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Dev Utilities</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/TamsaDevs/dev-utilities"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent"
              title="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Made with</span>
          <Heart className="h-3 w-3 text-red-500 fill-current" />
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer