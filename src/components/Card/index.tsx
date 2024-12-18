'use client'

import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

// Define the structure for content's root
type ContentBlock = {
  type: string;
  children?: Array<{
    type: string;
    version: number;
    text?: string;
    children?: Array<{ text: string }>;
    [k: string]: unknown;
  }>;
}

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'content'>

const readTime = (content: { root: ContentBlock }): number => {
  let numWords = 0;

  if (!content?.root || !content.root.children) return 1;

  // Function to recursively count words in nested children
  const countWordsInChildren = (children: Array<any>) => {
    for (let child of children) {
      if (child.text) {
        numWords += child.text.split(' ').filter((r) => r !== "").length;
      }
      if (child.children) {
        countWordsInChildren(child.children); // Recurse into nested children
      }
    }
  };

  // Start counting words from the root's children
  countWordsInChildren(content.root.children);

  const timeToReadMinutes = Math.ceil(numWords / 200);
  return timeToReadMinutes;
};

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Calculate read time if content exists
  const readTimeNum = content && 'root' in content ? readTime(content) : 0;

  return (
    <article
      className={cn(
        'border border-border rounded-2xl overflow-hidden bg-card hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:opacity-90',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        <div className='flex justify-between'>
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}

          {/* Display Read Time */}
          <div className="text-sm">
            {readTimeNum} mins read
          </div>
        </div>

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
