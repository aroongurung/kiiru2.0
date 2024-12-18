import type { Block } from 'payload'

export const CoverAdBlock: Block = {
  slug: 'coverAdBlock',
  interfaceName: 'CoverAdBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'coverAdBlocks',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: false,
        },
        {
          name: 'sub-heading',
          type: 'textarea',
          required: false,
        },
        {
          name: 'PostedBy',
          type: 'text',
          required: false,
        }
      ]
    }
  ],
}
