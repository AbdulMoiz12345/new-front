import { BrandMark } from './icons'

export function AuthPanel() {
  return (
    <div className="brandpanel">
      <div className="aurora"><span className="a1" /><span className="a2" /><span className="a3" /></div>
      <div className="grid-tex" />

      <div className="bp-top">
        <div className="lockup">
          <div className="mark"><BrandMark /></div>
          <div className="name">CAITO<b>360</b></div>
        </div>
      </div>

      <div className="bp-mid">
        <div className="pitch">
          <div className="eyebrow">AI Business Intelligence</div>
          <h2>Your documents,<br /><span>intelligently answered.</span></h2>
          <p>Upload financial reports, sales data and business documents. Ask questions in plain English. Get answers backed by your actual data — with citations.</p>
        </div>

        <div className="glassdeck">
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
