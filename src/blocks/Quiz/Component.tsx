"use client"
import React, { useState } from 'react'
import { Quiz as QuizBlockType } from '../../payload-types'

type Props = QuizBlockType & {
  className?: string
}

export const QuizBlockComponent: React.FC<Props> = ({
  className,
  question,
  options,
  explanation,
}) => {
  // Early return if no options
  if (!options || options.length === 0) {
    return (
      <div className="w-full p-4 bg-yellow-50 border border-yellow-200">
        <h2 className="text-yellow-700 font-bold">No Quiz Options</h2>
      </div>
    )
  }

  // State to track user responses
  const [userResponses, setUserResponses] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  // Calculate response percentages
  const calculateResponsePercentages = () => {
    if (userResponses.length === 0) return []

    const totalResponses = userResponses.length
    const optionCounts = options.map((_, index) => 
      userResponses.filter(resp => resp === index).length
    )

    return optionCounts.map(count => ({
      percentage: ((count / totalResponses) * 100).toFixed(1),
      count
    }))
  }

  const handleOptionSelect = (index: number) => {
    // Update selected option
    setSelectedOption(index)

    // Add to user responses
    setUserResponses(prev => [...prev, index])
  }

  // Calculate response statistics
  const responsePercentages = calculateResponsePercentages()

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-3xl mx-auto rounded-xl bg-card shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {question || 'Untitled Quiz'}
        </h2>
        
        <div className="space-y-6">
          {options.map((option, index) => (
            <div 
              key={index}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all
                ${selectedOption === index 
                  ? (option.isCorrect 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500')
                  : 'hover:bg-gray-100 border-gray-300'}
              `}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{option.text}</span>
                {selectedOption !== null && (
                  <span className="text-sm text-gray-600 font-semibold">
                    {responsePercentages[index]?.percentage || '0'}% 
                    ({responsePercentages[index]?.count || 0} clicks)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedOption !== null && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className={`font-bold text-xl mb-4 ${
              options[selectedOption].isCorrect 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {options[selectedOption].isCorrect ? 'Correct!' : 'Incorrect'}
            </h3>
            {explanation && (
              <p className="text-gray-700 text-base">{explanation}</p>
            )}
          </div>
        )}

        {selectedOption !== null && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Total Responses: {userResponses.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizBlockComponent