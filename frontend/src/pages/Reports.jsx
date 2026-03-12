import { useState } from 'react'
import { getLevels } from '../api'

const blankFilters = () => ({
  barcode: '', ragszam: '', szervEgyKod: '',
  sender: '', reciever: '', City: '',
  regNum: '', recievedBy: '',
})

const COLS = [
  { key: 'barcode',      label: 'Vonalkód' },
  { key: 'ragszam',      label: 'Ragszám' },
  { key: 'datum',        label: 'Dátum', format: v => v ? new Date(v).toLocaleString('hu-HU') : '—' },
  { key: 'szerv',        label: 'Szervegységkód' },
  { key: 'nev',          label: 'Átvevő' },
  { key: 'kuldo',        label: 'Küldő' },
  { key: 'helyseg',      label: 'Helység' },
  { key: 'tart',         label: 'Tartalom' },
  { key: 'iktsz',        label: 'Iktatószám' },
  { key: 'cimzett_csop', label: 'Cimzett csoport' },
  { key: 'erkUserId',    label: 'Érkeztető' },
]

const filterFields = [
  { field: 'barcode',     label: 'Vonalkód' },
  { field: 'ragszam',     label: 'Ragszám' },
  { field: 'szervEgyKod', label: 'Szervegységkód' },
  { field: 'sender',      label: 'Küldő' },
  { field: 'reciever',    label: 'Átvevő' },
  { field: 'City',        label: 'Helység' },
  { field: 'regNum',      label: 'Iktatószám' },
  { field: 'recievedBy',  label: 'Érkeztető' },
]

export default function Reports() {
  const [filters, setFilters]     = useState(blankFilters())
  const [excludeMode, setExclude] = useState(false)
  const [results, setResults]     = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error,   setError]       = useState(null)

  const set = field => e => setFilters(f => ({ ...f, [field]: e.target.value }))

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const payload = {
        ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
        excludeMode,
      }
      const { data } = await getLevels(payload)
      setResults(data)
    } catch { setError('Hiba a lekérdezés során. Kérjük, próbálja újra.') }
    finally { setLoading(false) }
  }

  const handleReset = () => {
    setFilters(blankFilters()); setResults(null); setError(null); setExclude(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h1 className="page-title">Riportok</h1>
        <p className="text-gray-400 text-sm mt-1">Keresés a bejegyzett érkezések között</p>
      </div>

      {/* Filter panel */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="section-title">Szűrők</p>

          {/* Include / Exclude toggle */}
          <button
            type="button"
            onClick={() => setExclude(e => !e)}
            title={excludeMode ? 'Kizárja a megadott értékeket tartalmazó rekordokat' : 'Megadott értékeket tartalmazó rekordokat mutat'}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-150
                        ${excludeMode
                          ? 'bg-red-50 border-red-400 text-red-600'
                          : 'bg-ygreen/10 border-ygreen text-yblue'}`}
          >
            {excludeMode ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
                </svg>
                Kizárja a találatokat
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                Tartalmaz
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filterFields.map(({ field, label }) => (
              <div key={field}>
                <label className="form-label">{label}</label>
                <input
                  className={`input-field ${excludeMode ? 'border-red-200 focus:ring-red-400' : ''}`}
                  value={filters[field]}
                  onChange={set(field)}
                  placeholder={excludeMode ? `Kizárt: ${label}` : label}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button type="button" onClick={handleReset} className="btn-outline">Törlés</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading
                ? <span className="w-4 h-4 border-2 border-yblue border-t-transparent rounded-full animate-spin" />
                : <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    Keresés
                  </>
              }
            </button>
          </div>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm font-medium">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
          {error}
        </div>
      )}

      {/* Results */}
      {results !== null && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <p className="section-title">Találatok</p>
            <span className="text-sm text-gray-400 font-medium">{results.length} rekord</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 text-gray-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-14 h-14 mx-auto mb-3">
                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-sm text-gray-400">Nincs találat a megadott szűrőkre.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {COLS.map(c => (
                      <th key={c.key}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {results.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      {COLS.map(c => (
                        <td key={c.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                          {c.format ? c.format(row[c.key]) : (row[c.key] ?? '—')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
