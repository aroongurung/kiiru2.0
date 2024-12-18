import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'Services',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'textarea',
      required: false,
    },

    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'serviceTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'serviceDescription',
          type: 'textarea',
          required: false,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
    },
  ],
}