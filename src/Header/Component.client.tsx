'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative inset-x-0 top-0 z-50 mt-2"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/*</header><header className="container relative z-20 border-b border-zinc-200" {...(theme ? { 'data-theme': theme } : {})}>*/}
      <div className="border-b-2 border-zinc-200 flex items-center py-6 gap-4 md:justify-between">
        {/*<div className="py-8 flex gap-4 md:justify-between">*/}
        <Link className='flex-shrink-0' href="/">
          <Logo loading="eager" priority="high" className="invert light:invert-0" />
        </Link>
        {/* HeaderNav centered on larger screens */}
        <div className="flex-1 md:flex md:justify-center">
          <HeaderNav header={header} />
        </div>
      </div>
    </header>
  )
}
