'use client'
import { useMemo, useState } from 'react'
import { Icon } from '@/components/icons'
import { insights, type Severity } from '@/lib/mock'

const SEV: Record<Severity, { label: string; icon: string; color: string; tint: string }> = {
  high: { label: 'High', icon: 'alert', color: 'var(--danger-fg)', tint: 'var(--danger-dim)' },
  medium: { label: 'Medium', icon: 'info', color: 'var(--warning-fg)', tint: 'var(--warning-dim)' },
  low: { label: 'Low', icon: 'low', color: 'var(--text-muted)', tint: 'var(--surface-2)' },
}
const sevVar: Record<Severity, string> = { high: 'var(--danger)', medium: 'var(--warning)', low: 'var(--text-muted)' }
const order: Severity[] = ['high', 'medium', 'low']
const categories = ['all', 'finance', 'churn', 'sales', 'growth']

export default function Insights() {
  const [sev, setSev] = useState<Severity | null>(null)
  const [cat, setCat] = useState('all')

  const counts = useMemo(() => ({
    high: insights.filter((i) => i.severity === 'high').length,
    medium: insights.filter((i) => i.severity === 'medium').length,
    low: insights.filter((i) => i.severity === 'low').length,
  }), [])

  const visible = insights.filter((i) => (!sev || i.severity === sev) && (cat === 'all' || i.category === cat))
  const groups = order.map((s) => ({ s, items: visible.filter((i) => i.severity === s) })).filter((g) => g.items.length)

  return (
    <div className="page-scroll"><div className="wrap">
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1>Insights</h1><p>Generated automatically from documents shared with everyone at the company.</p></div>
        <span className="chip"><Icon name="clock" className="ic ic-xs" />Refreshed 4 min ago</span>
      </div>

      <div className="sev-strip">
        {order.map((s) => (
          <button key={s} className={`sev-btn${sev === s ? ' on' : ''}`} disabled={counts[s] === 0}
            onClick={() => setSev(sev === s ? null : s)}>
            <span style={{ color: SEV[s].color, display: 'inline-flex' }}><Icon name={SEV[s].icon} className="ic ic-xs" /></span>
            {SEV[s].label}<span className="cnt">{counts[s]}</span>
          </button>
        ))}
        <span className="new-note">2 new since your last visit</span>
      </div>

      <div className="tabs">
        {categories.map((c) => (
          <button key={c} className={`tab${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {groups.map(({ s, items }) => (
        <div className="sev-group" key={s} style={{ ['--sev-color' as string]: sevVar[s], ['--sev-tint' as string]: SEV[s].tint }}>
          <div className="sev-h" style={{ color: SEV[s].color }}>
            <Icon name={SEV[s].icon} className="ic ic-xs" />{SEV[s].label}<span className="cnt">{items.length}</span><span className="rule" />
          </div>
          {items.map((ins) => (
            <article className="ins" key={ins.id}>
              <div className={`ins-head${s === 'high' ? ' tinted' : ''}`}>
                <div className="ins-tags">
                  <span className="sev-chip"><Icon name={SEV[s].icon} className="ic ic-xs" />{SEV[s].label}</span>
                  <span className="cat-chip">{ins.category}</span>
                  {ins.isNew && <span className="new-chip"><Icon name="sparkles" className="ic ic-xs" />New</span>}
                </div>
                <span className="ins-age">{ins.age}</span>
              </div>
              <div className="ins-body">
                <h3>{ins.title}</h3>
                <p>{ins.body}</p>
                {ins.source && (
                  <div className="based">
                    <span className="lbl">Based on</span>
                    <span className="src-chip"><Icon name="file" className="ic ic-xs" /><span className="fn">{ins.source}</span></span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ))}
    </div></div>
  )
}
