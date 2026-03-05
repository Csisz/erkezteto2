import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authLogin } from '../api'

export default function Login() {
  const [form, setForm]     = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const { signIn }          = useAuth()
  const navigate            = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await authLogin(form.username, form.password)
      signIn(data)
      navigate('/')
    } catch {
      setError('Hibás felhasználónév vagy jelszó.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-yblue flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ygreen/5 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-ygreen/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />

      <div className="relative w-full max-w-md">

        {/* Logo block */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-ygreen rounded-2xl mb-5 shadow-xl">
            <span className="text-yblue font-black text-3xl">Y</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Yettel Érkeztetés</h1>
          <p className="text-white/40 text-sm mt-1.5">Kérjük, jelentkezzen be a folytatáshoz</p>
        </div>

        {/* Form card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Felhasználónév
              </label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white
                           placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-ygreen
                           focus:border-transparent transition-all text-sm"
                placeholder="domain\felhasználónév"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Jelszó
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white
                           placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-ygreen
                           focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/20 border border-red-400/30 rounded-lg px-4 py-3 text-red-200 text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ygreen text-yblue font-bold py-3 rounded-lg
                         hover:bg-ygreen-light active:bg-ygreen-dark
                         transition-all duration-150
                         focus:outline-none focus:ring-2 focus:ring-ygreen focus:ring-offset-2 focus:ring-offset-yblue
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-yblue border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Bejelentkezés
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          © {new Date().getFullYear()} Yettel Hungary Zrt. Minden jog fenntartva.
        </p>
      </div>
    </div>
  )
}
