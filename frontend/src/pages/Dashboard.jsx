import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getLevels } from '../api'

function StatCard({ label, value, sub, icon, dark }) {
  return (
    <div className={`card p-6 flex items-start gap-4 ${dark ? 'bg-yblue border-yblue' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                       ${dark ? 'bg-ygreen/20 text-ygreen' : 'bg-yblue/10 text-yblue'}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-white/50' : 'text-gray-400'}`}>
          {label}
        </p>
        <p className={`text-3xl font-bold mt-0.5 truncate ${dark ? 'text-white' : 'text-yblue'}`}>{value}</p>
        {sub && <p className={`text-xs mt-1 truncate ${dark ? 'text-white/40' : 'text-gray-400'}`}>{sub}</p>}
      </div>
    </div>
  )
}

function QuickLink({ to, icon, title, description, accent }) {
  return (
    <Link to={to} className="card p-5 hover:shadow-md transition-all duration-200 group block">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-yblue text-sm">{title}</p>
          <p className="text-xs text-gray-400 truncate mt-0.5">{description}</p>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
             className="w-4 h-4 text-gray-300 group-hover:text-yblue group-hover:translate-x-1 transition-all flex-shrink-0">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const { user }              = useAuth()
  const [todayCount, setTodayCount] = useState('—')

  const today   = new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })
  const hour    = new Date().getHours()
  const greeting = hour < 12 ? 'Jó reggelt' : hour < 18 ? 'Jó napot' : 'Jó estét'

  useEffect(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    getLevels({ date: start.toISOString().slice(0, 16) })
      .then(r => setTodayCount(r.data.length))
      .catch(() => setTodayCount('—'))
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Hero welcome banner */}
      <div className="bg-yblue rounded-2xl px-8 py-7 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 400 300" className="h-full">
            <circle cx="350" cy="0"   r="220" fill="#B4FF00"/>
            <circle cx="400" cy="300" r="150" fill="#B4FF00"/>
          </svg>
        </div>
        <p className="text-ygreen text-sm font-semibold">{today}</p>
        <h1 className="text-white text-2xl font-bold mt-1.5">{greeting}, {user?.username}!</h1>
        <p className="text-white/50 text-sm mt-1">Üdvözöljük a Yettel Érkeztetési rendszerben.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          dark
          label="Mai érkezések"
          value={todayCount}
          sub="Összes mai bejegyzés"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          }
        />
        <StatCard
          label="Felhasználó"
          value={user?.username ?? '—'}
          sub="Aktív munkamenet"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          }
        />
        <StatCard
          label="Csoportok"
          value={user?.groups?.length ?? 0}
          sub={user?.groups?.join(', ') || 'Nincs csoport'}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          }
        />
      </div>

      {/* Quick actions */}
      <div>
        <p className="section-title mb-3">Gyors műveletek</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickLink to="/mail"    accent="bg-yblue text-ygreen"
            title="Levélérkeztetés"     description="Új levél vagy küldemény rögzítése"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
          />
          <QuickLink to="/invoice" accent="bg-ygreen/20 text-yblue"
            title="Számlaérkeztetés"    description="Ügyfélpanasz vagy számla rögzítése"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>}
          />
          <QuickLink to="/tcp"     accent="bg-blue-50 text-blue-600"
            title="TCP Ellenőrzés"      description="Szerződés érvényesítése"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
          />
          <QuickLink to="/reports" accent="bg-slate-100 text-slate-500"
            title="Riportok"            description="Keresés és lekérdezés"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
          />
        </div>
      </div>
    </div>
  )
}
