import type { Block } from 'payload'

export const OnlyTextBlock: Block = {
  slug: 'onlytext',
  interfaceName: 'OnlyText',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
   
    {
      name: 'OnlyTextBox',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'OnlyTextTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'OnlyTextDescription',
          type: 'textarea',
          required: false,
        },
       
      ],
    },
  ],
}