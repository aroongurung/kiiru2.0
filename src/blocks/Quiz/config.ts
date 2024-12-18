import type { Block } from 'payload'

export const QuizBlock: Block = {
  slug: 'quiz',
  interfaceName: 'Quiz',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Quiz Question',
      admin: {
        description: 'Enter the main question for the quiz'
      }
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      labels: {
        singular: 'Option',
        plural: 'Options'
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Option Text'
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          label: 'Is This the Correct Answer?',
          defaultValue: false
        }
      ],
      admin: {
        description: 'Add 2-4 options for the quiz question'
      }
    },
    {
      name: 'explanation',
      type: 'textarea',
      label: 'Answer Explanation',
      admin: {
        description: 'Provide additional context or explanation for the correct answer'
      }
    }
  ]
}