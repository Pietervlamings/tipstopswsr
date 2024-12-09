import { FC } from 'react'
import { useEntries } from '../hooks/useEntries'
import { Entry } from '../types'

const EntryList: FC = () => {
  const { entries } = useEntries()

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4 text-woonstad-text">Recente tips en tops</h2>
        <p className="text-gray-500 text-sm text-center py-4">
          Nog geen tips of tops gedeeld
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4 text-woonstad-text">Recente tips en tops</h2>
      <div className="space-y-3">
        {entries.map((entry: Entry) => (
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
              <p className="text-xs text-gray-500">{entry.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EntryList