import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CAITO360 — AI Business Intelligence',
  description: 'Ask questions about your business data',
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5 }

const themeInit = `(function(){try{var t=localStorage.getItem('caito360_theme');if(t!=='dark'&&t!=='light')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>{children}</body>
    </html>
  )
}
