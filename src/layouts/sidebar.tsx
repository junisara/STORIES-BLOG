import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import CategoryList from '@/components/Category/category-list.sidebar'
import TagList from '@/components/Tag/tag-list.sidebar'
import { POSTS } from '@/config/constants'

type SidebarProps = {
  currentCategory?: string
  currentTag?: string
  viewItems: ('category' | 'tags')[]
}

export const Sidebar: React.FC<SidebarProps> = ({ currentCategory, currentTag, viewItems, ...props }) => {
  return (
    <nav className="sticky flex flex-col gap-3 top-28">
      {Array.isArray(viewItems) && viewItems.includes('category') && <CategoryList currentCategory={currentCategory} />}
      {Array.isArray(viewItems) && viewItems.includes('tags') && <TagList currentTag={currentTag} />}
      {/* {viewItems === 'category' && <CategoryList currentCategory={currentCategory} />}
      {viewItems === 'tags' && <TagList currentTag={currentTag} />} */}
    </nav>
  )
}

export default Sidebar

// viewItems=["category", "tags"]
