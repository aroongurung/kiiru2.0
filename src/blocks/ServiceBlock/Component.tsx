import React from 'react'
import Image from 'next/image'
import { Services as ServicesBlockType } from '../../payload-types'


type Props = {
  className?: string
  media?: any 
} & Omit<ServicesBlockType, 'media'> 

export const ServicesBlockComponent: React.FC<Props> = ({
  heading,
  subHeading,
  services,
  
}) => {
  return (
    <section className="container mx-auto bg-card py-16 px-6 rounded-2xl">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
        {subHeading && <p className="text-lg max-w-2xl">{subHeading}</p>}
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service, index) => (
          <div key={index} className="bg-zinc-50/40 shadow-xl rounded-2xl overflow-hidden">
            {/* Project Content */}
            <div className="p-6">
              {/* Icon */}
              {service.media && typeof service.media !== 'number' && service.media.url && (
                <Image
                  src={service.media.url}
                  alt={service.serviceTitle || 'Service Icon'}
                  width={32}
                  height={32}
                />
              )}
              <h3 className="text-xl font-bold my-4">{service.serviceTitle}</h3>
              <h4 className="text-base">{service.serviceDescription}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesBlockComponent