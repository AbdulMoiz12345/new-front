import Link from 'next/link'
import { Icon } from '@/components/icons'
import { uploadsByDay, questionsByDay, insights, documents } from '@/lib/mock'

function Sparkline({ data }: { data: number[] }) {
  const W = 300, H = 40, pad = 3
  const max = Math.max(...data, 1)
  const step = W / (data.length - 1)
  const pts = data.map((v, i) => [i * step, H - pad - (v / max) * (H - pad * 2)] as const)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H} Z`
  const last = pts[pts.length - 1]
  const gid = `g${data.length}${max}`
  return (
    <svg className="spark" viewBox="0 0 300 40" preserveAspectRatio="none">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
      </linearGradient></defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="3" fill="var(--accent)" />
    </svg>
  )
}

const sevColor: Record<string, string> = { high: 'var(--danger)', medium: 'var(--warning)', low: 'var(--warning)' }
const statusMap: Record<string, { cls: string; label: string }> = {
  ready: { cls: 'b-ready', label: 'Ready' }, processing: { cls: 'b-proc', label: 'Processing' }, failed: { cls: 'b-failed', label: 'Failed' },
}

export default function Dashboard() {
  const uploadsTotal = uploadsByDay.reduce((a, b) => a + b, 0)
  const questionsTotal = questionsByDay.reduce((a, b) => a + b, 0)
  return (
    <div className="page-scroll"><div className="wrap">
      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Your workspace today</div>
            <h1>Welcome back, Abdul <span className="wave">👋</span></h1>
            <p>Ask questions across your company&apos;s documents, or review what the insight agent surfaced overnight.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-outline" href="/documents"><Icon name="upload" className="ic ic-sm" />Upload</Link>
            <Link className="btn btn-primary" href="/chat"><Icon name="chat" className="ic ic-sm" />Ask a question</Link>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat">
          <span className="eyebrow"><Icon name="file" className="ic ic-xs" />Documents</span>
          <div className="val tnum">12 <small>/ 250</small></div>
          <div className="meter"><i style={{ width: '4.8%' }} /></div>
          <div className="sub">238 remaining on your Growth plan</div>
        </div>
        <div className="card stat">
          <span className="eyebrow"><Icon name="chat" className="ic ic-xs" />Questions</span>
          <div className="val tnum">340 <small>/ 5,000</small></div>
          <div className="meter"><i style={{ width: '6.8%' }} /></div>
          <div className="sub">Resets at the start of next month</div>
        </div>
        <div className="card stat">
          <span className="eyebrow"><Icon name="team" className="ic ic-xs" />Seats in use</span>
          <div className="val tnum">3 <small>/ 10</small></div>
          <div className="meter"><i style={{ width: '30%' }} /></div>
          <div className="sub">7 seats available to invite</div>
        </div>
      </div>

      <div className="two-col">
        <div className="card activity">
          <span className="eyebrow"><Icon name="upload" className="ic ic-xs" />Uploads · last 14 days</span>
          <div className="val tnum">{uploadsTotal} <span className="delta up">▲ 21%</span></div>
          <Sparkline data={uploadsByDay} />
        </div>
        <div className="card activity">
          <span className="eyebrow"><Icon name="chat" className="ic ic-xs" />Questions · last 14 days</span>
          <div className="val tnum">{questionsTotal} <span className="delta up">▲ 34%</span></div>
          <Sparkline data={questionsByDay} />
        </div>
      </div>

      <div className="two-col">
        <div className="card" style={{ padding: 18 }}>
          <div className="section-head"><h2>Latest insights</h2><Link className="viewall" href="/insights">View all<Icon name="arrowRight" className="ic ic-xs" /></Link></div>
          {insights.slice(0, 3).map((ins) => (
            <div className="ins-mini" key={ins.id}>
              <span className="ins-sev" style={{ background: sevColor[ins.severity] }} />
              <div style={{ flex: 1, minWidth: 0 }}><div className="t">{ins.title}</div><div className="b">{ins.body}</div></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="section-head"><h2>Recent documents</h2><Link className="viewall" href="/documents">View all<Icon name="arrowRight" className="ic ic-xs" /></Link></div>
          {documents.slice(0, 3).map((d) => (
            <div className="doc-mini" key={d.id}>
              <div className="doc-ico"><Icon name="file" className="ic ic-sm" /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="name mono">{d.filename}</div>
                <div className="meta">{d.sub || d.visibility}</div>
              </div>
              <span className={`badge ${statusMap[d.status].cls}`}><span className="dot" />{statusMap[d.status].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div></div>
  )
}
