'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon, BrandMark } from './icons'
import { me } from '@/lib/mock'

interface NavItem {
  href?: string
  icon: string
  label: string
  badge?: string
}

const workspace: NavItem[] = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/chat', icon: 'chat', label: 'Chat' },
  { href: '/documents', icon: 'file', label: 'Documents' },
  { href: '/insights', icon: 'bulb', label: 'Insights', badge: '2' },
]

/**
 * Manage rows. Only Team is part of this visual pass, so it is the only one with an
 * `href`. The other three exist in the product (/help, /settings/profile,
 * /settings/billing) but are not restyled yet — they render as inert rows so the nav
 * keeps its real shape without pretending to navigate.
 *
 * Every href here MUST be unique across both lists: two rows sharing one path both
 * matched the pathname and both lit up.
 */
const manage: NavItem[] = [
  { icon: 'help', label: 'Help' },
  { icon: 'settings', label: 'Settings' },
  { href: '/team', icon: 'team', label: 'Team' },
  { icon: 'plan', label: 'Plan' },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const Row = (item: NavItem) => {
    const body = (
      <>
        <Icon name={item.icon} className="ic" />
        <span>{item.label}</span>
        {item.badge && <span className="badge-count">{item.badge}</span>}
      </>
    )
    if (!item.href) {
      return (
        <span key={item.label} className="nav-item inert" title="Not part of this visual demo yet" aria-disabled="true">
          {body}
        </span>
      )
    }
    const active = pathname === item.href || pathname.startsWith(item.href + '/')
    return (
      <Link key={item.label} href={item.href} className={`nav-item${active ? ' active' : ''}`}
        aria-current={active ? 'page' : undefined} onClick={onClose}>
        {body}
      </Link>
    )
  }

  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><BrandMark /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="brand-name">CAITO<b>360</b></div>
            <div className="brand-tenant">{me.tenant}</div>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-label">Workspace</div>
          {workspace.map(Row)}
          <div className="nav-label">Manage</div>
          {manage.map(Row)}
        </nav>

        <div className="user-card">
          <div className="user-row">
            <div className="avatar">{me.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">{me.name}</div>
              <span className="role-pill">{me.role}</span>
            </div>
          </div>
          <button className="signout" onClick={() => router.push('/login')}>
            <Icon name="logout" className="ic ic-xs" />Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
