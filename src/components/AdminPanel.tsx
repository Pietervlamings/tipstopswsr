import React from 'react'
import { Entry } from '../types'
import { useEntries } from '../hooks/useEntries'

interface AdminPanelProps {
  onLogout: () => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const { entries, deleteEntry, getQuestionStats, clearAllEntries } = useEntries()
  const stats = getQuestionStats()

  const formatPercentage = (yes: number, total: number) => {
    if (total === 0) return '0%'
    return `${Math.round((yes / total) * 100)}%`
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-woonstad-text">Statistieken</h2>
          <div className="flex gap-2">
            <button
              onClick={clearAllEntries}
              className="px-3 py-1 bg-gray-500 text-white text-xs rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Alles wissen
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Uitloggen
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-woonstad-text">
              Informatie gekregen waar men op hoopte:
            </p>
            <div className="text-sm text-gray-600">
              <p>Ja: {formatPercentage(stats.info.yes, stats.info.total)} ({stats.info.yes} van {stats.info.total})</p>
              <p>Nee: {formatPercentage(stats.info.no, stats.info.total)} ({stats.info.no} van {stats.info.total})</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-woonstad-text">
              Meer kennis over andere teams:
            </p>
            <div className="text-sm text-gray-600">
              <p>Ja: {formatPercentage(stats.teams.yes, stats.teams.total)} ({stats.teams.yes} van {stats.teams.total})</p>
              <p>Nee: {formatPercentage(stats.teams.no, stats.teams.total)} ({stats.teams.no} van {stats.teams.total})</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-woonstad-text mb-4">Tips en Tops</h2>
        <div className="space-y-3">
          {entries.map((entry: Entry) => (
            entry.purpose && (
              <div
                key={entry.id}
                className="p-3 bg-woonstad-gray rounded-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm text-woonstad-text">{entry.name}</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-woonstad-green-light text-woonstad-green">
                      {entry.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{entry.purpose}</p>
                  <div className="text-xs text-gray-500">
                    <p>Informatie nuttig: {entry.answers?.info === true ? 'Ja' : entry.answers?.info === false ? 'Nee' : '-'}</p>
                    <p>Teams kennis: {entry.answers?.teams === true ? 'Ja' : entry.answers?.teams === false ? 'Nee' : '-'}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{entry.timestamp}</p>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
          {entries.filter(e => e.purpose).length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              Nog geen tips of tops gedeeld
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel