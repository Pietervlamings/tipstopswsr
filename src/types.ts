export interface Entry {
  id: string
  name: string
  purpose: string
  timestamp: string
  type: 'tip' | 'top'
  answers?: {
    info: boolean | null
    teams: boolean | null
  }
}

export interface QuestionStats {
  info: {
    yes: number
    no: number
    total: number
  }
  teams: {
    yes: number
    no: number
    total: number
  }
}