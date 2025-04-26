import React from 'react'
import { Linkedin, Twitter} from "lucide-react"


const Footer = () => {
  return (
    <footer className="py-3 px-6 border-t border-border/30">
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Query Param Converter</span>
      </div>
    </footer>
  )
}

export default Footer