import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  {
    to: '/', end: true,
    label: 'Áttekintés',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    )
  },
  {
    to: '/mail',
    label: 'Levélérkeztetés',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    )
  },
  {
    to: '/invoice',
    label: 'Számlaérkeztetés',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    )
  },
  {
    to: '/tcp',
    label: 'TCP Ellenőrzés',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    )
  },
  {
    to: '/reports',
    label: 'Riportok',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    )
  }
]

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate          = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { signOut(); navigate('/login') }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* ── Sidebar ── */}
      <aside className={`flex flex-col bg-yblue transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-ygreen rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-yblue font-black text-sm">Y</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-sm leading-tight">YETTEL</p>
              <p className="text-white/40 text-xs">Érkeztetés</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                 ${isActive
                   ? 'bg-ygreen text-yblue font-semibold'
                   : 'text-white/60 hover:text-white hover:bg-white/10'}`
              }
            >
              {item.icon}
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="border-t border-white/10 p-3 space-y-1">
          {!collapsed && (
            <div className="px-2 py-1">
              <p className="text-white/40 text-xs">Bejelentkezve</p>
              <p className="text-white text-sm font-medium truncate">{user?.username}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={collapsed ? 'Kijelentkezés' : undefined}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 flex-shrink-0">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            {!collapsed && <span className="text-sm">Kijelentkezés</span>}
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Breadcrumb area - empty, reserved */}
          <div className="flex-1" />

          {/* Avatar */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-yblue flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.username?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-600 font-medium hidden sm:block">{user?.username}</span>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
