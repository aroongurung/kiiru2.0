import React from 'react'
import Image from 'next/image'
import { CoverAdBlock as CoverAdBlockType } from '../../payload-types'

type Props = {
  className?: string
} & CoverAdBlockType

export const CoverAdBlockComponent: React.FC<Props> = ({
  heading,
  description,
  coverAdBlocks,
  media,
}) => {
  // Check if `media` is an object (not an ID)
  const isMediaObject = media && typeof media !== 'number'

  return (
    <div className='container my-4 mx-auto'>
      <div className="relative rounded-xl text-white py-4 px-4 overflow-hidden w-full">
        {/* Background Image */}
        {isMediaObject && media?.url && (
          <Image
            src={media.url}
            alt="Background pattern"
            width={52}
            height={32}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-100 z-1 transition-transform duration-500 ease-in-out transform hover:scale-110"
            priority
          />
        )}

        {/* Content */}
        <div className="relative z-10 w-full mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-1">
            <p className="text-red-500 -mt-2 mb-2 text-lg font-medium tracking-wide">{heading}</p>
            <h2 className="text-xl mb-4 md:text-2xl font-bold leading-tight text-shadow">{description}</h2>
          </div>

          {/* Cover Ad Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverAdBlocks?.map((coverAdBlock, index) => {
              // Check that coverAdBlock is valid
              if (!coverAdBlock || !coverAdBlock.image) {
                return null; // Skip invalid coverAdBlock
              }

              return (
                <div
                  key={index}
                  className="bg-zinc-950 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full"
                >
                  {/* Profile Image */}
                  <div className="w-full h-80 relative mb-2 rounded-2xl overflow-hidden">
                    {/* Check if image exists */}
                    {coverAdBlock.image && typeof coverAdBlock.image !== 'number' && coverAdBlock.image.url && (
                      <Image
                        src={coverAdBlock.image.url}
                        alt={coverAdBlock.title ?? 'Default Image Alt Text'}
                        fill
                        className="object-cover rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="px-4 pb-4">
                    {/* Name */}
                    <h3 className="text-xl font-semibold mb-2">{coverAdBlock.title}</h3>

                    {/* Sub-heading */}
                    <p className="text-gray-400 mb-1">{coverAdBlock['sub-heading']}</p>
                    <p className="text-gray-400 mb-2">{coverAdBlock['PostedBy']}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>


  )
}

export default CoverAdBlockComponent
