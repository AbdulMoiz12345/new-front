'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon, BrandMark } from './icons'
import { me } from '@/lib/mock'

const workspace = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/chat', icon: 'chat', label: 'Chat' },
  { href: '/documents', icon: 'file', label: 'Documents' },
  { href: '/insights', icon: 'bulb', label: 'Insights', badge: '2' },
]
const manage = [
  { href: '/dashboard', icon: 'help', label: 'Help' },
  { href: '/team', icon: 'settings', label: 'Settings' },
  { href: '/team', icon: 'team', label: 'Team' },
  { href: '/dashboard', icon: 'plan', label: 'Plan' },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const Row = (item: { href: string; icon: string; label: string; badge?: string }) => (
    <Link href={item.href} className={`nav-item${isActive(item.href) ? ' active' : ''}`} onClick={onClose}>
      <Icon name={item.icon} className="ic" />
      <span>{item.label}</span>
      {item.badge && <span className="badge-count">{item.badge}</span>}
    </Link>
  )

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
          {workspace.map((i) => <Row key={i.label} {...i} />)}
          <div className="nav-label">Manage</div>
          {manage.map((i) => <Row key={i.label} {...i} />)}
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
