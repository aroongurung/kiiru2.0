import { Config } from 'payload'
import {   
  BoldFeature,   
  ItalicFeature,   
  LinkFeature,   
  ParagraphFeature,   
  lexicalEditor,   
  UnderlineFeature, 
} from '@payloadcms/richtext-lexical'

// Custom function to resolve internal document href
const resolveInternalLink = (doc: any, collection: any) => {
  if (!doc || !collection) return '/';

  switch (collection.slug) {
    case 'pages':
      return doc.slug 
        ? `/${doc.slug}` 
        : `/page/${doc.id}`;
    
    case 'posts':
      return doc.slug 
        ? `/posts/${doc.slug}` 
        : `/post/${doc.id}`;
    
    case 'categories':
      return doc.slug 
        ? `/categories/${doc.slug}` 
        : `/category/${doc.id}`;
    
    default:
      return `/`;
  }
}

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts', 'categories',],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })
          
          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
            // Add a hidden field to store the resolved href
            {
              name: 'resolvedHref',
              type: 'text',
              admin: {
                hidden: true,
              },
              hooks: {
                beforeValidate: [
                  ({ data, originalDoc }) => {
                    // Resolve href for internal links
                    if (data?.linkType === 'internal' && data?.doc) {
                      const collection = data.doc.relationTo;
                      const doc = data.doc.value;

                      data.resolvedHref = resolveInternalLink(doc, { slug: collection });
                    }
                    return data;
                  }
                ]
              }
            }
          ]
        },
      }),
    ]
  }, 
})

// Export the helper function in case you need to use it elsewhere
export { resolveInternalLink }