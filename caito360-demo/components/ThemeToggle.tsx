'use client'
import { useEffect, useState } from 'react'

const Sun = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.2" y1="4.2" x2="5.6" y2="5.6" /><line x1="18.4" y1="18.4" x2="19.8" y2="19.8" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.2" y1="19.8" x2="5.6" y2="18.4" /><line x1="18.4" y1="5.6" x2="19.8" y2="4.2" /></svg>)
const Moon = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>)

export function ThemeToggle({ className = 'icon-btn' }: { className?: string }) {
  const [dark, setDark] = useState(false)
  useEffect(() => { setDark(document.documentElement.getAttribute('data-theme') === 'dark') }, [])
  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('caito360_theme', next) } catch {}
    setDark(!dark)
  }
  return (
    <button className={className} onClick={toggle} aria-label="Toggle theme">
      {dark ? <Sun /> : <Moon />}
    </button>
  )
}
