import { useState, useRef } from 'react'
import { postLevel } from '../api'
import { useAuth } from '../context/AuthContext'

const blank = (username = '') => ({
  barcode: '', ragszam: '', Tert: false,
  date: new Date().toISOString().slice(0, 16),
  szervEgyKod: '', reciever: '', sender: '',
  areaCode: '', City: '', address: '',
  content: '', regNum: '', comment: '',
  recievedBy: username, toBeScanned: false,
})

function Toggle({ label, checked, onToggle }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ygreen focus:ring-offset-1
                    ${checked ? 'bg-ygreen' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                          ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  )
}

function Alert({ type, message }) {
  const styles = type === 'success'
    ? 'bg-green-50 border-green-200 text-green-700'
    : 'bg-red-50 border-red-200 text-red-600'
  const icon = type === 'success'
    ? <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    : <><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></>
  return (
    <div className={`flex items-center gap-3 border rounded-xl px-5 py-4 mb-1 text-sm font-medium ${styles}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">{icon}</svg>
      {message}
    </div>
  )
}

export default function MailReceiving() {
  const { user }              = useAuth()
  const [form, setForm]       = useState(blank(user?.username))
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)
  const firstFieldRef         = useRef(null)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const tog = field => () => setForm(f => ({ ...f, [field]: !f[field] }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      await postLevel({ ...form, areaCode: form.areaCode ? parseInt(form.areaCode) : null })
      setStatus('success')
      setForm(blank(user?.username))
      setTimeout(() => firstFieldRef.current?.focus(), 50)
    } catch { setStatus('error') }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="page-title">Levélérkeztetés</h1>
        <p className="text-gray-400 text-sm mt-1">Rögzítsen új bejövő küldeményt</p>
      </div>

      {status && (
        <Alert
          type={status}
          message={status === 'success' ? 'A küldemény sikeresen rögzítve!' : 'Hiba történt a rögzítés során.'}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Identification */}
        <div className="card p-6">
          <p className="section-title mb-4">Azonosítás</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Vonalkód</label>
              <input ref={firstFieldRef} className="input-field" value={form.barcode} onChange={set('barcode')} placeholder="pl. HU123456789" />
            </div>
            <div>
              <label className="form-label">Ragszám</label>
              <input className="input-field" value={form.ragszam} onChange={set('ragszam')} placeholder="Ragszám" />
            </div>
            <div>
              <label className="form-label">Dátum és idő *</label>
              <input type="datetime-local" className="input-field" value={form.date} onChange={set('date')} required />
            </div>
            <div>
              <label className="form-label">Iktatószám</label>
              <input className="input-field" value={form.regNum} onChange={set('regNum')} placeholder="Iktatószám" />
            </div>
            <div>
              <label className="form-label">Szervegységkód</label>
              <input className="input-field" value={form.szervEgyKod} onChange={set('szervEgyKod')} placeholder="Szervegységkód" />
            </div>
            <div>
              <label className="form-label">Tartalom</label>
              <input className="input-field" value={form.content} onChange={set('content')} placeholder="Tartalom rövid leírása" />
            </div>
          </div>
        </div>

        {/* Sender address */}
        <div className="card p-6">
          <p className="section-title mb-4">Küldő adatai</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="form-label">Küldő neve</label>
              <input className="input-field" value={form.sender} onChange={set('sender')} placeholder="Küldő neve" />
            </div>
            <div>
              <label className="form-label">Irányítószám</label>
              <input className="input-field" type="number" value={form.areaCode} onChange={set('areaCode')} placeholder="1234" />
            </div>
            <div>
              <label className="form-label">Helység</label>
              <input className="input-field" value={form.City} onChange={set('City')} placeholder="Város" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Utca, házszám</label>
              <input className="input-field" value={form.address} onChange={set('address')} placeholder="Utca, házszám" />
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div className="card p-6">
          <p className="section-title mb-4">Átvétel</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Átvevő *</label>
              <input className="input-field" value={form.reciever} onChange={set('reciever')} placeholder="Átvevő neve" required />
            </div>
            <div>
              <label className="form-label">Érkeztető *</label>
              <input className="input-field" value={form.recievedBy} onChange={set('recievedBy')} placeholder="Érkeztető azonosítója" required />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Megjegyzés</label>
              <textarea className="input-field resize-none" rows={3} value={form.comment} onChange={set('comment')} placeholder="Megjegyzés..." />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-5 pt-4 border-t border-gray-100">
            <Toggle label="Tértivevény"  checked={form.Tert}        onToggle={tog('Tert')} />
            <Toggle label="Szkennelendő" checked={form.toBeScanned} onToggle={tog('toBeScanned')} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { setForm(blank(user?.username)); firstFieldRef.current?.focus() }} className="btn-outline">
            Törlés
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading
              ? <span className="w-4 h-4 border-2 border-yblue border-t-transparent rounded-full animate-spin" />
              : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M5 13l4 4L19 7"/></svg>Rögzítés</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
