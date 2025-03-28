import { formatDateTime } from 'src/utilities/formatDateTime';
import React from 'react';

import type { Post } from '@/payload-types';

import { Media } from '@/components/Media';
import ReadTimeClient from '@/components/myCustom/readtimeclient'



export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title, content } = post;

  return (
    <div className="relative max-w-[52rem] mx-auto -mt-12 flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category;
                const titleToUse = categoryTitle || 'Untitled category';
                const isLast = index === categories.length - 1;

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">
              {populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Author</span>
                  <div className='author-names'>
                    {populatedAuthors.map((author, index) => {
                      const { name } = author;
                      const isLast = index === populatedAuthors.length - 1;
                      const secondToLast = index === populatedAuthors.length - 2;

                      return (
                        <React.Fragment key={index}>
                          {name}
                          {secondToLast && populatedAuthors.length > 2 && <React.Fragment>, </React.Fragment>}
                          {secondToLast && populatedAuthors.length === 2 && <React.Fragment> </React.Fragment>}
                          {!isLast && populatedAuthors.length > 1 && <React.Fragment>and </React.Fragment>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {publishedAt && (
              <div className="flex flex-col gap-1">
                <span className="text-sm">Date Published</span>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
            <div>
              {/* Client Component for Read Time */}
              {content && 'root' in content && (
                <ReadTimeClient content={content} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[50vh] select-none">

        {metaImage && typeof metaImage !== 'string' && (
          <Media 
          fill priority={false} 
          loading="lazy" 
          imgClassName="-z-10 object-cover" 
          resource={metaImage} 
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>

  );
};
