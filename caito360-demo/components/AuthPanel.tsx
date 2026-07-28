import { BrandMark } from './icons'

/* Mini sparkline inside the floating stat card — same fixture shape the dashboard draws. */
function MiniSpark() {
  const data = [3, 11, 14, 9, 18, 6, 22, 17, 12, 26]
  const W = 160, H = 26, pad = 2
  const max = Math.max(...data)
  const step = W / (data.length - 1)
  const pts = data.map((v, i) => [i * step, H - pad - (v / max) * (H - pad * 2)] as const)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="rgba(255,255,255,0.10)" />
      <path d={line} fill="none" stroke="var(--accent-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.6" fill="var(--accent-2)" />
    </svg>
  )
}

export function AuthPanel() {
  return (
    <div className="brandpanel">
      <div className="aurora"><span className="a1" /><span className="a2" /><span className="a3" /></div>
      <div className="sheen" />
      <div className="grid-tex" />
      <div className="grain" />

      <div className="bp-top">
        <div className="lockup">
          <div className="mark"><BrandMark /></div>
          <div className="name">CAITO<b>360</b></div>
        </div>
      </div>

      <div className="bp-mid">
        <div className="pitch">
          <div className="eyebrow"><span className="eyebrow-dot" />AI Business Intelligence</div>
          <h2>Your documents,<br /><span>intelligently answered.</span></h2>
          <p>Upload financial reports, sales data and business documents. Ask questions in plain English. Get answers backed by your actual data — with citations.</p>
        </div>

        <div className="glassdeck">
          {/* faint thread linking question → answer → insight → trend */}
          <svg className="g-thread" viewBox="0 0 560 236" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 200 40 C 300 10, 360 10, 420 26 M 380 120 C 430 150, 450 170, 440 196"
              fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 5" />
          </svg>

          <div className="glass g-insight">
            <span className="tag"><span className="d" />High severity</span>
            <h4>Revenue dropped 12% in Q3</h4>
            <div className="sub">Insight · finance · surfaced overnight</div>
          </div>

          <div className="glass g-answer">
            <div className="g-q"><span className="u">AM</span>What happened to revenue in Q3?</div>
            <div className="g-a">
              <div className="ai"><BrandMark /></div>
              <div>
                <p>Q3 revenue was <b>PKR 4.2M</b> — down 12% from Q2, driven by a 28% drop in enterprise closures<span className="g-cite">1</span>.</p>
                <span className="g-src"><span className="fn">Q3_Revenue_Report.pdf</span> · p.4</span>
              </div>
            </div>
          </div>

          <div className="glass g-stat">
            <div className="lbl2">Questions · 14 days</div>
            <div className="num">151<em>▲ 34%</em></div>
            <MiniSpark />
          </div>
        </div>

        <div className="pstats">
          <div className="pstat"><div className="v">10k+</div><div className="l">Documents analysed</div></div>
          <div className="pstat"><div className="v">99.9%</div><div className="l">Uptime SLA</div></div>
          <div className="pstat"><div className="v">&lt; 2s</div><div className="l">Avg response time</div></div>
        </div>
      </div>

      <div className="bp-bot">
        <span>© 2026 CAITO360</span>
        <span className="trust"><svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: 'currentColor', fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Data isolated per tenant · RLS enforced</span>
      </div>
    </div>
  )
}
