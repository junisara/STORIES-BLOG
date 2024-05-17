import React from 'react'
import { Link } from 'gatsby'

import { FrontMatter, EtcMatter } from '@/config/types'
import { CalendarDays, Clock3 } from 'lucide-react'
import { timeFormat } from '@/lib/utils'

export const PostHeader = ({ frontmatter, etcmatter }: { frontmatter: FrontMatter; etcmatter: EtcMatter }) => {
  return (
    <header className="text-left">
      <div className="mb-3 text-base">
        <Link to={`/category/${etcmatter.currentCategory}`} className="font-semibold no-underline text-primary underline-offset-4 hover:underline">
          {etcmatter.currentCategory}
        </Link>
      </div>
      <h1 className="mb-5 text-2xl md:text-5xl md:leading-tight font-bold leading-snug tracking-tighter">{frontmatter.title}</h1>
      <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3.5" />
          <span>{timeFormat(frontmatter.datePublished)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock3 className="w-3.5" />
          <span>{etcmatter.readingMinutes}분</span>
        </div>
      </div>
      <hr className="mt-5" />
    </header>
  )
}
