import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout          from './components/Layout'
import Login           from './pages/Login'
import Dashboard       from './pages/Dashboard'
import MailReceiving   from './pages/MailReceiving'
import InvoiceReceiving from './pages/InvoiceReceiving'
import TCPValidation   from './pages/TCPValidation'
import Reports         from './pages/Reports'

function Guard({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-yblue flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-ygreen border-t-transparent rounded-full animate-spin" />
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Guard><Layout /></Guard>}>
        <Route index           element={<Dashboard />} />
        <Route path="mail"     element={<MailReceiving />} />
        <Route path="invoice"  element={<InvoiceReceiving />} />
        <Route path="tcp"      element={<TCPValidation />} />
        <Route path="reports"  element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
