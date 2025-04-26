import React from 'react'
import { Github} from "lucide-react"
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header className="py-4 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="font-bold text-xl">DevTools</div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-muted transition-colors"
      >
        <Github className="h-5 w-5" />
      </a>
    </div>

    

    <button
    //   onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
        <ThemeSwitch />
      {/* {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} */}
    </button>
  </header>
  )
}

export default Header