import { FC, useState } from 'react'
import { useEntries } from '../hooks/useEntries'
import QuestionBlock from './QuestionBlock'

const EntryForm: FC = () => {
  const { addEntry } = useEntries()
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    type: 'tip' as 'tip' | 'top',
    answers: {
      info: null as boolean | null,
      teams: null as boolean | null
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || 
        !formData.purpose.trim() || 
        formData.answers.info === null || 
        formData.answers.teams === null || 
        isSubmitting) {
      return
    }

    setIsSubmitting(true)

    const newEntry = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      purpose: formData.purpose.trim(),
      timestamp: new Date().toLocaleString('nl-NL'),
      type: formData.type,
      answers: formData.answers
    }

    await addEntry(newEntry)
    
    setFormData({
      name: '',
      purpose: '',
      type: 'tip',
      answers: {
        info: null,
        teams: null
      }
    })
    setIsSubmitting(false)
    window.location.reload() // Re-add the page refresh to show new submissions
  }

  const handleAnswerChange = (question: 'info' | 'teams', answer: boolean) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [question]: answer
      }
    }))
  }

  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.purpose.trim() !== '' && 
    formData.answers.info !== null && 
    formData.answers.teams !== null

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-8">
        <QuestionBlock 
          answers={formData.answers}
          onAnswerChange={handleAnswerChange}
        />

        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-6 text-woonstad-text text-center">
            Deel jouw inzichten uit de demo
          </h2>
          
          <div className="space-y-8">
            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'tip' }))}
                className={`px-16 py-5 text-xl rounded-full min-w-[160px] transition-colors duration-200 ${
                  formData.type === 'tip'
                    ? 'bg-woonstad-green text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-woonstad-green-light hover:text-woonstad-green'
                }`}
              >
                Tip
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'top' }))}
                className={`px-16 py-5 text-xl rounded-full min-w-[160px] transition-colors duration-200 ${
                  formData.type === 'top'
                    ? 'bg-woonstad-green text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-woonstad-green-light hover:text-woonstad-green'
                }`}
              >
                Top
              </button>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-woonstad-text">
                Naam
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-woonstad-green focus:ring-woonstad-green text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-woonstad-text">
                Jouw tip of top
              </label>
              <textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-woonstad-green focus:ring-woonstad-green text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full px-4 py-2 bg-woonstad-green text-white text-sm font-medium rounded-md hover:bg-woonstad-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-woonstad-green disabled:opacity-50"
            >
              Delen
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EntryForm