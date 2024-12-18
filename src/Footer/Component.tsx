import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import PageUpButton from '@/components/myCustom/pageUpbtn'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []

  return (
    <footer className="container border-t border-border rounded-lg bg-background/20">
      <div className="py-6 mx-auto flex justify-between md:flex-row md:justify-between">
        <div className='flex flex-col items-start justify-start md:flex-row md:items-center md:justify-center'>
          <Link className="flex items-center md:justify-start" href="/">
            <Logo />
          </Link>
          <div className='mt-1 pl-4 text-sm md:pl-0'>
            <p>&copy;{new Date().getFullYear()} All Rights Reserved.</p>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {/* PageUpButton will be visible at all screen sizes */}
            <PageUpButton />
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-base" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
