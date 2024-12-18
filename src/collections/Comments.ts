import { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { authenticated } from '../access/authenticated'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    defaultColumns: ['content', 'author', 'post', 'isApproved', 'createdAt'],
    description: 'Comments submitted by users on posts',
  },
  access: {
    read: authenticatedOrPublished,
    create: () => true,
    update: authenticated,
    delete: authenticated
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Comment',
      validate: (value: string | undefined) => {
        if (!value || value.length > 2000) return 'Comments must not exceed 2,000 characters in length.'
        return true
      }
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          maxLength: 100
        },
        {
          name: 'email',
          type: 'email',
          required: true
        }
      ]
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'All comments are subject to approval prior to being published publicly.'
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.isApproved && !value) {
              return new Date()
            }
            return value
          }
        ]
      }
    }
  ],
  timestamps: true
}