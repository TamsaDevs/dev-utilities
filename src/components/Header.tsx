'use client'

import React, { useState } from 'react'
import { Github, Menu, X, Code, FileText, Key, Search } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitch from './ThemeSwitch'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const tools = [
  {
    title: "Base64 Encoder/Decoder",
    href: "/base-64-decoder",
    description: "Encode and decode Base64 strings with ease.",
    icon: Code,
  },
  {
    title: "JSON Formatter",
    href: "/json-formatter",
    description: "Format, validate and beautify JSON data.",
    icon: FileText,
  },
  {
    title: "JWT Token Parser",
    href: "/jwt-parser",
    description: "Decode and analyze JWT tokens securely.",
    icon: Key,
  },
  {
    title: "Query Params to JSON",
    href: "/query-params-json",
    description: "Convert URL query parameters to JSON format.",
    icon: Search,
  },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="font-bold text-xl text-primary">DevTools</div>
              </Link>

              {/* Desktop Navigation */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                   
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                         <Link href='/'>Home</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Code className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Developer Tools
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                A collection of essential utilities for developers.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {tools.map((tool) => (
                          <ListItem
                            key={tool.title}
                            title={tool.title}
                            href={tool.href}
                            icon={tool.icon}
                          >
                            {tool.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/docs">Docs </Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side: GitHub + Theme Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/TamsaDevs/dev-utilities"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <div className="p-2 rounded-full hover:bg-muted transition-colors">
                <ThemeSwitch />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`text-lg font-medium transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  Home
                </Link>

                <div className="text-lg font-medium text-muted-foreground mb-2">Tools</div>
                {tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary pl-4 ${pathname === tool.href ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.title}
                  </Link>
                ))}

                {/* Mobile GitHub link */}
                <a
                  href="https://github.com/TamsaDevs/dev-utilities"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<{ className?: string }> }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "/"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Header