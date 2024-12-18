"use client"

import React, { useState } from 'react'
import { Survey as SurveyType } from '../../payload-types'

// Helper function for making API calls
const apiRequest = async (method: string, url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // You can add authorization headers here if needed
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(data) : undefined,
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong')
    }
    return result
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

type Props = SurveyType & {
  className?: string
}

export const SurveyBlockComponent: React.FC<Props> = ({
  className,
  question,
  options,
  id: surveyId,
  isResultsVisible,
}) => {
  // Early return if no options
  if (!options || options.length === 0) {
    return (
      <div className="w-full p-4 bg-yellow-50 border border-yellow-200">
        <h2 className="text-yellow-700 font-bold">No Survey Options</h2>
      </div>
    )
  }

  // Hooks
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [comments, setComments] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Handle user option selection
  const handleOptionSelect = (index: number) => {
    if (!submitted) {
      setSelectedOption(index)
    }
  }

  // Submit the survey response
  const handleSubmit = async () => {
    setError(null)

    if (selectedOption === null) {
      setError('Please select an option before submitting.')
      return
    }

    try {
      setIsLoading(true)

      // Prepare the data for submission
      const data = {
        options: options.map((option, index) => ({
          ...option,
          clickCount: index === selectedOption
            ? (option.clickCount || 0) + 1
            : (option.clickCount || 0)
        })),
        additionalComments: comments ? `${new Date().toISOString()}: ${comments}\n` : ''
      }

      // Send API request (replace 'your-api-url' with the actual endpoint)
      const response = await apiRequest('PUT', `/api/surveys/${surveyId}`, data)

      if (response) {
        setSubmitted(true)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      console.error('Survey submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate total votes if results are visible
  const totalVotes = options.reduce((sum, option) => sum + (option.clickCount || 0), 0)

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-3xl mx-auto rounded-xl bg-card shadow-lg p-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-8 text-center">
          {question || 'Untitled Survey'}
        </h2>

        {/* Survey Options */}
        <div className="space-y-6">
          {options.map((option, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 transition-all ${submitted
                ? 'cursor-default opacity-70'
                : selectedOption === index
                  ? 'bg-blue-50 border-blue-500'
                  : 'hover:bg-gray-100 border-gray-300 cursor-pointer'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{option.text}</span>
                {submitted && isResultsVisible && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {option.clickCount || 0} votes
                    </span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${totalVotes > 0 
                            ? ((option.clickCount || 0) / totalVotes) * 100 
                            : 0}%`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Comments */}
        <div className="mt-8">
          <textarea
            className="w-full p-4 border rounded-md"
            placeholder="Additional comments (optional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={submitted}
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${submitted 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={submitted || isLoading}
          >
            {isLoading 
              ? 'Submitting...' 
              : submitted 
                ? 'Response Submitted ✓' 
                : 'Submit Response'}
          </button>
        </div>

        {/* Total Votes Summary */}
        {submitted && isResultsVisible && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Total Votes: {totalVotes}
          </div>
        )}
      </div>
    </div>
  )
}

export default SurveyBlockComponent
