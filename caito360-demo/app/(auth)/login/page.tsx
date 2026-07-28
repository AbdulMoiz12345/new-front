'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthPanel } from '@/components/AuthPanel'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Icon } from '@/components/icons'

export default function Login() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

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
              <span className="on">Sign in</span>
              <Link href="/signup">Create account</Link>
            </div>

            <div className="head"><h1>Welcome back</h1><p>Sign in to your workspace</p></div>

            <div className="field">
              <label htmlFor="l-email">Email</label>
              <input id="l-email" className="inp" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className="field">
              <div className="frow"><label htmlFor="l-pw">Password</label><a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a></div>
              <div className="inp-wrap">
                <input id="l-pw" className="inp pw" type={showPw ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" />
                <button type="button" className="eye" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
            </div>

            <button className="submit" type="submit">
              {loading ? <><span className="sp" />Signing in…</> : <>Sign in<Icon name="arrowRight" className="" /></>}
            </button>

            <div className="switch">Don&apos;t have an account? <Link href="/signup">Sign up free</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}
