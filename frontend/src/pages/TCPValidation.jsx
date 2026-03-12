import { useState } from 'react'

const CONTRACT_TYPES = ['Mobilszolgáltatás', 'Internet', 'TV', 'Csomag', 'Üzleti']

const blank = () => ({
  contractNumber: '',
  customerName:   '',
  customerId:     '',
  contractType:   '',
  validationDate: new Date().toISOString().slice(0, 16),
  notes:          '',
})

export default function TCPValidation() {
  const [form, setForm]       = useState(blank())
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleValidate = async () => {
    if (!form.contractNumber) return
    setLoading(true); setStatus(null)
    await new Promise(r => setTimeout(r, 900))
    setStatus(form.contractNumber.startsWith('TCP') ? 'valid' : 'invalid')
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">TCP Szerződésellenőrzés</h1>
          <p className="text-gray-400 text-sm mt-1">Szerződések érvényesítése és ellenőrzése</p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
          Fejlesztés alatt
        </span>
      </div>

      {status === 'valid' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-5 text-green-700 text-sm font-medium">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          A szerződés érvényes és aktív.
        </div>
      )}
      {status === 'invalid' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5 text-red-600 text-sm font-medium">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
            <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
          </svg>
          A szerződés nem található vagy érvénytelen.
        </div>
      )}

      <div className="card p-6 space-y-4">
        <p className="section-title">Szerződés adatai</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Szerződésszám *</label>
            <input className="input-field" value={form.contractNumber} onChange={set('contractNumber')}
                   placeholder="pl. TCP-2026-001234" />
          </div>
          <div>
            <label className="form-label">Ügyfél neve</label>
            <input className="input-field" value={form.customerName} onChange={set('customerName')}
                   placeholder="Ügyfél neve" />
          </div>
          <div>
            <label className="form-label">Ügyfél azonosítója</label>
            <input className="input-field" value={form.customerId} onChange={set('customerId')}
                   placeholder="Ügyfél azonosítója" />
          </div>
          <div>
            {/* Combobox: predefined options + free-text entry */}
            <label className="form-label">Szerződés típusa</label>
            <input
              className="input-field"
              list="contract-types"
              value={form.contractType}
              onChange={set('contractType')}
              placeholder="Válasszon vagy írjon be típust…"
            />
            <datalist id="contract-types">
              {CONTRACT_TYPES.map(t => <option key={t} value={t} />)}
            </datalist>
          </div>
          <div>
            <label className="form-label">Ellenőrzés dátuma</label>
            <input type="datetime-local" className="input-field" value={form.validationDate} onChange={set('validationDate')} />
          </div>
        </div>

        <div>
          <label className="form-label">Megjegyzés</label>
          <textarea className="input-field resize-none" rows={3} value={form.notes} onChange={set('notes')}
                    placeholder="Megjegyzések a szerződéssel kapcsolatban…" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => { setForm(blank()); setStatus(null) }} className="btn-outline">
            Törlés
          </button>
          <button type="button" onClick={handleValidate} disabled={loading || !form.contractNumber} className="btn-primary">
            {loading
              ? <span className="w-4 h-4 border-2 border-yblue border-t-transparent rounded-full animate-spin" />
              : <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Ellenőrzés
                </>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
