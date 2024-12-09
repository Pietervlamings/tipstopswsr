import { useState, useEffect } from 'react'
import { Entry, QuestionStats } from '../types'

const STORAGE_KEY = 'tips-and-tops-entries'

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load entries from localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to save entries to localStorage:', error)
    }
  }, [entries])

  const addEntry = async (entry: Entry) => {
    setEntries(prev => [entry, ...prev])
  }

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const clearAllEntries = () => {
    setEntries([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const getQuestionStats = (): QuestionStats => {
    const stats = {
      info: { yes: 0, no: 0, total: 0 },
      teams: { yes: 0, no: 0, total: 0 }
    }

    entries.forEach(entry => {
      if (entry.answers) {
        if (entry.answers.info !== null) {
          stats.info.total++
          if (entry.answers.info) {
            stats.info.yes++
          } else {
            stats.info.no++
          }
        }
        
        if (entry.answers.teams !== null) {
          stats.teams.total++
          if (entry.answers.teams) {
            stats.teams.yes++
          } else {
            stats.teams.no++
          }
        }
      }
    })

    return stats
  }

  return { 
    entries, 
    addEntry, 
    deleteEntry, 
    getQuestionStats,
    clearAllEntries
  }
}