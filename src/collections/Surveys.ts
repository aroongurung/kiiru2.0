import { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { authenticated } from '../access/authenticated'

export const Surveys: CollectionConfig = {
  slug: 'surveys',
  admin: {
    defaultColumns: ['question', 'options', 'createdAt'],
    description: 'Interactive surveys with trackable responses',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Survey Question',
      validate: (value: string | undefined) => {
        if (!value || value.length > 500) return 'Survey question must not exceed 500 characters.'
        return true
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
        plural: 'Options',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Option Text',
          validate: (value: string | undefined) => {
            if (!value || value.length > 200) return 'Option text must not exceed 200 characters.'
            return true
          }
        },
        {
          name: 'clickCount',
          type: 'number',
          defaultValue: 0,
          label: 'Response Count',
          admin: {
            description: 'Number of times this option has been selected',
            readOnly: true
          }
        }
      ]
    },
    {
      name: 'additionalComments',
      type: 'textarea',
      label: 'Aggregated Comments',
      admin: {
        description: 'Compiled comments from survey respondents',
        readOnly: true
      }
    },
    {
      name: 'isResultsVisible',
      type: 'checkbox',
      label: 'Show Survey Results?',
      defaultValue: true,
      admin: {
        description: 'Determines if survey results are publicly visible'
      }
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Survey Start Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Survey End Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Prevent direct manipulation of click counts via API
        if (data.options) {
          data.options = data.options.map((option: any, index: number) => ({
            ...option,
            clickCount: originalDoc && originalDoc.options 
              ? originalDoc.options[index]?.clickCount || 0 
              : 0
          }))
        }
        return data
      }
    ]
  }
}

export default Surveys