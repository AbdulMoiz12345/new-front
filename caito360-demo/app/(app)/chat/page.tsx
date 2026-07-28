'use client'
import { useRef, useState } from 'react'
import { Icon, BrandMark } from '@/components/icons'
import { conversations } from '@/lib/mock'

interface Msg { role: 'user' | 'ai'; content: React.ReactNode }

const initial: Msg[] = [
  { role: 'user', content: 'What happened to revenue in Q3?' },
  {
    role: 'ai', content: (
      <>
        <p>Based on your Q3 revenue report, total revenue was <b>PKR 4.2M</b> — down 12% from Q2. The primary driver was a 28% drop in enterprise deal closures during July<span className="cite">1</span>, which your sales pipeline data attributes to two delayed procurement cycles in manufacturing<span className="cite">2</span>. Renewal rate held steady at 87%.</p>
        <p>By segment: enterprise revenue fell to PKR 2.1M (from PKR 2.9M in Q2), while SMB revenue stayed stable at PKR 1.8M. Four large deals expected to close in July slipped to Q4, roughly PKR 600K of the shortfall.</p>
        <div className="sources">
          <div className="lbl">Sources</div>
          <span className="src"><span className="n">1</span><span className="fn">Q3_Revenue_Report.pdf</span><span className="cell-muted">· p.4</span></span>
          <span className="src"><span className="n">2</span><span className="fn">Sales_Pipeline_June.xlsx</span><span className="cell-muted">· p.1</span></span>
        </div>
      </>
    ),
  },
]

const reply = (
  <>
    <p>Three enterprise accounts show elevated risk based on your churn analysis: <b>Zenith Manufacturing</b>, <b>Atlas Retail</b>, and <b>CoreTech Ltd</b><span className="cite">1</span> — combined ARR exposure of roughly PKR 3.2M.</p>
    <div className="sources">
      <div className="lbl">Sources</div>
      <span className="src"><span className="n">1</span><span className="fn">Customer_Churn_Analysis.pdf</span><span className="cell-muted">· p.2</span></span>
    </div>
  </>
)

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(initial)
  const [active, setActive] = useState(0)
  const [text, setText] = useState('')
  const bottom = useRef<HTMLDivElement>(null)

  const send = (value?: string) => {
    const q = (value ?? text).trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', content: q }])
    setText('')
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', content: reply }])
      bottom.current?.scrollIntoView({ behavior: 'smooth' })
    }, 450)
    setTimeout(() => bottom.current?.scrollIntoView({ behavior: 'smooth' }), 30)
  }

  return (
    <div className="chat-layout">
      <div className="conv-rail">
        <button className="btn btn-outline conv-new"><Icon name="plus" className="ic ic-sm" />New chat</button>
        {conversations.map((c, i) => (
          <div key={c} className={`conv-item${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
            <Icon name="chat" className="ic ic-sm" />{c}
          </div>
        ))}
      </div>
      <div className="chat-main">
        <div className="transcript">
          {messages.map((m, i) => (
            <div className={`msg ${m.role}`} key={i}>
              <div className="who">{m.role === 'user' ? 'AM' : <BrandMark />}</div>
              <div className="bubble">{typeof m.content === 'string' ? <p>{m.content}</p> : m.content}</div>
            </div>
          ))}
          <div ref={bottom} />
        </div>
        <div className="composer">
          <div className="starters">
            <button className="starter" onClick={() => send('Which accounts are at highest churn risk?')}>Which accounts are at highest churn risk?</button>
            <button className="starter" onClick={() => send('Summarise the board deck')}>Summarise the board deck</button>
            <button className="starter" onClick={() => send('What is our renewal rate trend?')}>Renewal rate trend?</button>
          </div>
          <div className="composer-box">
            <textarea rows={1} placeholder="Ask anything about your documents…" value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} />
            <button className="send" onClick={() => send()} aria-label="Send"><Icon name="send" className="ic ic-sm" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
