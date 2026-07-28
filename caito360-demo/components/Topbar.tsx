'use client'
import { usePathname } from 'next/navigation'
import { Icon } from './icons'
import { ThemeToggle } from './ThemeToggle'
import { me } from '@/lib/mock'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/chat': 'Chat', '/documents': 'Documents', '/insights': 'Insights', '/team': 'Team',
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'Dashboard'
  const pct = Math.round((me.questions / me.maxQuestions) * 100)

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <button className="icon-btn mobile-only" onClick={onMenu} aria-label="Open menu"><Icon name="menu" className="ic" /></button>
        <h1>{title}</h1>
      </div>
      <div className="topbar-right">
        <div className="usage-pill hide-sm">
          <div className="usage-bar"><i style={{ width: `${pct}%` }} /></div>
          <span className="usage-txt"><b>{me.questions}</b> / {me.maxQuestions.toLocaleString()} questions</span>
          <span className="plan-chip">{me.plan}</span>
        </div>
        <button className="icon-btn" aria-label="Search"><Icon name="search" className="ic ic-sm" /></button>
        <button className="icon-btn" aria-label="Notifications"><span className="dot" /><Icon name="bell" className="ic ic-sm" /></button>
        <ThemeToggle />
      </div>
    </header>
  )
}
