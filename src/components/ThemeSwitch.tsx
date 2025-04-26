// app/components/ThemeSwitch.tsx
'use client'

import { Moon, Sun,CloudDrizzle } from "lucide-react"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <CloudDrizzle />
  )

  if (resolvedTheme === 'dark') {
    return <Sun onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <Moon onClick={() => setTheme('dark')} />
  }

}