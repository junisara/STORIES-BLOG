import React from 'react'
import { Link } from 'gatsby'

import { FrontMatter, EtcMatter } from '@/config/types'
import { CalendarDays, Clock3 } from 'lucide-react'
import { timeFormat } from '@/lib/utils'

type HeaderProps = {
  kind: string
  currentPath: string
}

export const ListHeader: React.FC<HeaderProps> = ({ currentPath, ...props }) => {
  return (
    <header className="text-left mb-8 px-6 mt-7">
      <div className="text-sm font-light">{props.kind}</div>
      <h1 className="mb-5 text-2xl md:text-5xl md:leading-tight font-thin leading-snug tracking-tighter">
        {props.kind === 'TAGS' && '#'}
        {currentPath}
      </h1>
      <hr className="mt-5" />
    </header>
  )
}

type PostHeaderProps = {
  frontmatter: FrontMatter
  etcmatter: EtcMatter
}

export const PostHeader: React.FC<PostHeaderProps> = ({ frontmatter, etcmatter, ...props }) => {
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
          /
          <Clock3 className="w-3.5" />
          <span>
            대략 <b>{etcmatter.readingMinutes}분</b> 정도 소요
          </span>
        </div>
      </div>
      <hr className="mt-5" />
    </header>
  )
}
