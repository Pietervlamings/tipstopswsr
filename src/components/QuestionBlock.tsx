import { FC } from 'react'

interface QuestionBlockProps {
  answers: {
    info: boolean | null
    teams: boolean | null
  }
  onAnswerChange: (question: 'info' | 'teams', answer: boolean) => void
}

const QuestionBlock: FC<QuestionBlockProps> = ({ answers, onAnswerChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-woonstad-text flex-grow">
          Heb je de informatie gekregen waar je op hoopte?
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onAnswerChange('info', true)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              answers.info === true
                ? 'bg-woonstad-green text-white'
                : 'bg-woonstad-green-light text-woonstad-green hover:bg-woonstad-green hover:text-white'
            }`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => onAnswerChange('info', false)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              answers.info === false
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            Nee
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-woonstad-text flex-grow">
          Weet je nu meer over wat de andere teams aan het doen zijn?
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onAnswerChange('teams', true)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              answers.teams === true
                ? 'bg-woonstad-green text-white'
                : 'bg-woonstad-green-light text-woonstad-green hover:bg-woonstad-green hover:text-white'
            }`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => onAnswerChange('teams', false)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              answers.teams === false
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionBlock