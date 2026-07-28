import { Icon } from '@/components/icons'
import { documents } from '@/lib/mock'

const statusMap: Record<string, { cls: string; label: string }> = {
  ready: { cls: 'b-ready', label: 'Ready' }, processing: { cls: 'b-proc', label: 'Processing' }, failed: { cls: 'b-failed', label: 'Failed' },
}

export default function Documents() {
  return (
    <div className="page-scroll"><div className="wrap">
      <div className="page-head"><h1>Documents</h1><p>Your company library — upload, organise visibility, and track processing.</p></div>

      <div className="toolbar">
        <div className="search"><Icon name="search" className="ic ic-sm" /><input placeholder="Search documents…" /></div>
        <span className="chip">All departments</span>
        <span className="chip">All statuses</span>
        <button className="btn btn-primary"><Icon name="upload" className="ic ic-sm" />Upload</button>
      </div>

      <div className="card tbl-card">
        <table>
          <thead><tr><th>Name</th><th className="hide-sm">Type</th><th className="hide-sm">Visibility</th><th>Status</th><th className="hide-sm">Uploaded</th><th /></tr></thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id}>
                <td>
                  <div className="fname">
                    <div className="ico"><Icon name="file" className="ic ic-sm" /></div>
                    <div>
                      <div className="mono">{d.filename}</div>
                      {d.err ? <div className="err-note">{d.err}</div> : <div className="cell-muted">{d.sub}</div>}
                    </div>
                  </div>
                </td>
                <td className="hide-sm"><span className="chip mono">{d.type}</span></td>
                <td className="hide-sm"><span className="cell-muted">{d.visibility}</span></td>
                <td><span className={`badge ${statusMap[d.status].cls}`}><span className="dot" />{statusMap[d.status].label}</span></td>
                <td className="hide-sm cell-muted">{d.uploaded}</td>
                <td><button className="kebab" aria-label="Actions"><Icon name="kebab" className="ic ic-sm" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dropzone">
        <div className="z-ic"><Icon name="upload" className="ic" /></div>
        <h3>Drop files to upload</h3>
        <p>PDF, DOCX, XLSX, CSV, TXT, MD — up to 50MB each, 20 at a time</p>
      </div>
    </div></div>
  )
}
