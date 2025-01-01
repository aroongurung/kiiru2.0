import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <>
      <nav className='container flex items-center gap-1'>
        <Image
          src={"/kiirulogo_whitebg.png"}
          alt="Kiiru Logo"
          width={193}
          height={34}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('max-w-[3rem] w-auto h-auto object-contain', className)}
        />
        <div className='ml-0 pl-0'>
          <span className='font-bold text-3xl'>Kiiru<sup>&reg;</sup></span>
        </div>
      </nav>
    </>
  )
}
