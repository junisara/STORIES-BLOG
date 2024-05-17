'use client'
import React from 'react'
import { Link } from 'gatsby'
// import { Button } from "../ui/button";
import { ChevronLeft } from 'lucide-react'
import { ScrollToComment, ScrollTop } from '@/components/Common/toc-buttons'
import { HeadingItem } from '@/config/types'
import { useHeadingsObserver } from '@/hooks/use-headings-observer'
import { cn } from '@/lib/utils'
import CopyLinkButton from '../Common/copy-link-button'
// import { useRouter } from "next/navigation";

interface Props {
  toc: HeadingItem[]
  category: string
}
const TableOfContent = ({ toc, category }: Props) => {
  const activeIdList = useHeadingsObserver('h1, h2, h3')
  return (
    <div className="sticky top-20 mt-[200px] ">
      <div className="mb-4 border-r px-4 py-2">
        <Link to={'/category/' + category} className="flex items-center mb-5">
          <ChevronLeft size={14} /> <span className="ml-2">Back to the blog</span>
        </Link>

        <ul className="text-sm ">
          {toc.map(item => {
            const isH1 = item.indent === 0
            const isH2 = item.indent === 1
            const isH3 = item.indent === 2
            const isIntersecting = activeIdList && activeIdList.includes(item.link)

            return (
              <li key={item.link} className={cn(isH2 && 'ml-3', isH3 && 'ml-6', isIntersecting && 'font-medium text-primary', 'py-1 transition')}>
                <Link to={item.link}>{item.text}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex gap-2">
        <ScrollTop />
        <ScrollToComment />
        <CopyLinkButton />
      </div>
    </div>
  )
}

export default TableOfContent
