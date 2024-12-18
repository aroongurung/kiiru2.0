import type { Block } from 'payload'

export const SurveyBlock: Block = {
  slug: 'survey',
  interfaceName: 'Survey',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Survey Question',
      admin: {
        description: 'Enter the main question for the survey',
      },
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      labels: {
        singular: 'Option',
        plural: 'Options',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Option Text',
        },
        {
          name: 'clickCount', // This field will store the number of clicks for this option
          type: 'number',
          defaultValue: 0, // Initialize click count as 0
        },
      ],
      admin: {
        description: 'Add 2-4 options for the survey question',
      },
    },
    {
      name: 'additionalComments',
      type: 'textarea',
      label: 'Additional Comments',
      admin: {
        description: 'Optional space for respondents to provide more context or feedback',
      },
    },
    {
      name: 'isResultsVisible',
      type: 'checkbox',
      label: 'Show Survey Results?',
      defaultValue: true, // Default to true, i.e., results are visible
      admin: {
        description: 'Check this box to show the survey results after submission.',
      },
    },
  ],
}
