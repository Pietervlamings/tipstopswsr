import React, { useState } from 'react'
import AdminPanel from './components/AdminPanel'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'
import { useAuth } from './hooks/useAuth'

const App: React.FC = () => {
  const { isAdmin, login, logout } = useAuth()
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const handleLogin = () => {
    const success = login('admin', password)
    if (!success) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-woonstad-gray">
      <header className="bg-white shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-woonstad-text">Astrid's Tips en Tops</h1>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {isAdmin ? (
          <AdminPanel onLogout={logout} />
        ) : (
          <>
            <EntryForm />
            <EntryList />
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="max-w-[200px] mx-auto space-y-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wachtwoord"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-woonstad-green focus:border-woonstad-green"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin()
                    }
                  }}
                />
                {showError && (
                  <p className="text-red-500 text-xs text-center">Incorrect wachtwoord</p>
                )}
                <button
                  onClick={handleLogin}
                  className="w-full px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400"
                >
                  Beheerder
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App