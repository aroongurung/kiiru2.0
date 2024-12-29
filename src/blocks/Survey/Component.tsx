"use client"

import React, { useState } from 'react'

// Define the necessary types internally
interface SurveyOption {
  text: string
  clickCount?: number
}

interface SurveyProps {
  id: string
  question?: string
  options?: SurveyOption[]
  isResultsVisible?: boolean
  className?: string
}

const apiRequest = async (method: string, url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
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

export const SurveyBlockComponent: React.FC<SurveyProps> = (props) => {
  const {
    className = '',
    question = 'Untitled Survey',
    options = [],
    id: surveyId,
    isResultsVisible = false,
  } = props

  // State management
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [comments, setComments] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)

  // Calculate total votes when needed
  React.useEffect(() => {
    if (options && options.length > 0) {
      const votes = options.reduce((sum, option) => sum + (option.clickCount || 0), 0)
      setTotalVotes(votes)
    }
  }, [options])

  // Handle user option selection
  const handleOptionSelect = (index: number) => {
    if (!submitted) {
      setSelectedOption(index)
    }
  }

  // Submit the survey response
  const handleSubmit = async () => {
    if (selectedOption === null) {
      setError('Please select an option before submitting.')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      const updatedOptions = options.map((option, index) => ({
        ...option,
        clickCount: index === selectedOption
          ? (option.clickCount || 0) + 1
          : (option.clickCount || 0)
      }))

      const data = {
        options: updatedOptions,
        additionalComments: comments 
          ? `${new Date().toISOString()}: ${comments}\n` 
          : ''
      }

      const response = await apiRequest('PUT', `/api/surveys/${surveyId}`, data)
      
      if (response) {
        setSubmitted(true)
        setTotalVotes(prev => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Early return for no options
  if (!options || options.length === 0) {
    return (
      <div className="w-full p-4 bg-yellow-50 border border-yellow-200">
        <h2 className="text-yellow-700 font-bold">No Survey Options</h2>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-3xl mx-auto rounded-xl bg-card shadow-lg p-8">
        {error ? (
          <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        ) : null}

        <h2 className="text-2xl font-bold mb-8 text-center">
          {question}
        </h2>

        <div className="space-y-6">
          {options.map((option, index) => {
            const votePercentage = totalVotes > 0 
              ? ((option.clickCount || 0) / totalVotes) * 100 
              : 0

            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 transition-all ${
                  submitted
                    ? 'cursor-default opacity-70'
                    : selectedOption === index
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-100 border-gray-300 cursor-pointer'
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{option.text}</span>
                  {submitted && isResultsVisible ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {option.clickCount || 0} votes
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${votePercentage}%` }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

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

        <div className="mt-8 flex justify-center">
          <button
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              submitted 
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

        {submitted && isResultsVisible ? (
          <div className="mt-4 text-center text-sm text-gray-600">
            Total Votes: {totalVotes}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SurveyBlockComponent