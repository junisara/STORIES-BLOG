import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import useTagList from '@/hooks/use-tag-list'

type TagListProps = {
  currentTag?: string
}

const TagList = ({ currentTag }: TagListProps) => {
  const currentPath = currentTag ? decodeURIComponent(currentTag) : 'all'
  const { site, tags } = useTagList()
  tags.sort((a: any, b: any) => b.totalCount - a.totalCount)
  const tagsTop10 = tags.slice(0, 10)

  return (
    <section className="sidebar-tags mb-10">
      <h2 className="text-3xl my-5 font-thin">Tags</h2>
      <ul className="flex flex-col">
        <li className="mb-3 pl-5 text-sm">
          <Link to={`/tags`}>전체보기</Link>
        </li>
        {tagsTop10.map((tag: any) => {
          const isActive = tag.fieldValue === currentPath // Check if the tag is active
          return (
            <li key={tag.fieldValue} className={`mb-3 pl-5 text-sm ${isActive ? 'active' : ''}`}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="text-colorGray1 hover:text-primary">
                #{tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TagList
