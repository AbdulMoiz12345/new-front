'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthPanel } from '@/components/AuthPanel'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Icon } from '@/components/icons'

const COLORS = ['var(--danger)', 'var(--warning)', 'var(--accent)', 'var(--success)']
const LABELS = ['Weak', 'Fair', 'Good', 'Strong']

function score(v: string) {
  let s = 0
  if (v.length >= 8) s++
  if (v.length >= 12) s++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++
  if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++
  return s
}

export default function Signup() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)

  const s = score(pw)
  const idx = Math.min(Math.max(s - 1, 0), 3)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 800)
  }

  return (
    <div className="auth-layout">
      <AuthPanel />
      <div className="formside">
        <div className="form-top"><ThemeToggle className="theme-btn" /></div>
        <div className="form-scroll">
          <form className="formcard" onSubmit={submit}>
            <div className="mobile-lockup">
              <div className="mark"><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: '#fff', fill: 'none', strokeWidth: 1.6, strokeLinejoin: 'round' }}><path d="M12 2l2.2 5.5L20 9.5l-4.4 3.3L17 19l-5-3.2L7 19l1.4-6.2L4 9.5l5.8-2z" /></svg></div>
              <div className="name">CAITO<b>360</b></div>
            </div>

            <div className="seg">
              <Link href="/login">Sign in</Link>
              <span className="on">Create account</span>
            </div>

            <div className="head"><h1>Create your workspace</h1><p>Get started in under 2 minutes</p></div>

            <div className="field">
              <label htmlFor="s-name">Full name</label>
              <input id="s-name" className="inp" type="text" placeholder="Your name" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="s-email">Work email</label>
              <input id="s-email" className="inp" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="s-pw">Password</label>
              <div className="inp-wrap">
                <input id="s-pw" className="inp pw" type={showPw ? 'text' : 'password'} placeholder="10+ characters"
                  autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <button type="button" className="eye" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <div className="pw-meter">
                {[0, 1, 2, 3].map((i) => (
                  <i key={i} style={{ background: i < s ? COLORS[idx] : 'var(--surface-3)' }} />
                ))}
              </div>
              <div className="pw-label" style={{ color: pw ? COLORS[idx] : 'var(--text-muted)' }}>
                {pw ? `${LABELS[idx]} password` : 'Use 10+ characters with a mix of letters, numbers & symbols'}
              </div>
            </div>

            <button className="submit" type="submit">
              {loading ? <><span className="sp" />Creating account…</> : <>Create account<Icon name="arrowRight" className="" /></>}
            </button>

            <div className="legal">By signing up you agree to our <a href="#" onClick={(e) => e.preventDefault()}>Terms</a> and <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></div>
            <div className="switch">Already have an account? <Link href="/login">Sign in</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}
