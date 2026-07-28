import { Icon } from '@/components/icons'

const members = [
  { initials: 'MK', name: 'Moiz Khan', email: 'moiz@acmecorp.com', dept: 'Finance', role: 'Owner', rt: 'rt-owner', active: 'Jun 29', bg: 'linear-gradient(135deg,var(--accent),var(--accent-2))' },
  { initials: 'SA', name: 'Sara Ahmed', email: 'sara@acmecorp.com', dept: 'Sales', role: 'Admin', rt: 'rt-admin', active: 'Jun 28', bg: 'linear-gradient(135deg,var(--success),#0ea567)' },
  { initials: 'AR', name: 'Ali Raza', email: 'ali@acmecorp.com', dept: 'Finance', role: 'Member', rt: 'rt-member', invited: true, bg: 'var(--surface-3)', fg: 'var(--text-secondary)' },
]
const invites = [
  { email: 'zara.rehman@acmecorp.com', role: 'Admin', rt: 'rt-admin', dept: 'Sales', expires: 'in 6 days' },
  { email: 'hina@acmecorp.com', role: 'Viewer', rt: 'rt-viewer', dept: '—', expires: 'in 2 hours' },
]

export default function Team() {
  return (
    <div className="page-scroll"><div className="wrap">
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1>Team</h1><p>Manage who has access to your workspace and what they can do.</p></div>
        <button className="btn btn-primary"><Icon name="userPlus" className="ic ic-sm" />Invite member</button>
      </div>

      <div className="section-head"><h2>Members <span className="cell-muted mono">3</span></h2></div>
      <div className="card tbl-card" style={{ marginBottom: 28 }}>
        <table>
          <thead><tr><th>Member</th><th className="hide-sm">Department</th><th>Role</th><th className="hide-sm">Last active</th><th /></tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email}>
                <td><div className="member">
                  <div className="avatar" style={{ background: m.bg, color: m.fg ?? '#fff' }}>{m.initials}</div>
                  <div><div className="nm">{m.name}</div><div className="em">{m.email}</div></div>
                </div></td>
                <td className="hide-sm cell-muted">{m.dept}</td>
                <td><span className={`role-tag ${m.rt}`}>{m.role}</span></td>
                <td className="hide-sm">{m.invited ? <span className="role-tag pending-tag">Invited</span> : <span className="cell-muted">{m.active}</span>}</td>
                <td><button className="kebab" aria-label="Actions"><Icon name="kebab" className="ic ic-sm" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-head"><h2>Pending invitations <span className="cell-muted mono">2</span></h2></div>
      <div className="card tbl-card">
        <table>
          <thead><tr><th>Email</th><th>Role</th><th className="hide-sm">Department</th><th className="hide-sm">Expires</th><th /></tr></thead>
          <tbody>
            {invites.map((i) => (
              <tr key={i.email}>
                <td className="mono" style={{ fontSize: 12.5 }}>{i.email}</td>
                <td><span className={`role-tag ${i.rt}`}>{i.role}</span></td>
                <td className="hide-sm cell-muted">{i.dept}</td>
                <td className="hide-sm cell-muted">{i.expires}</td>
                <td><button className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 11px' }}>Resend</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div>
  )
}
