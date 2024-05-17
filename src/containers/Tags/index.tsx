import React from 'react'
import { Link, graphql } from 'gatsby'
import { cn } from '@/lib/utils'
import kebabCase from 'lodash.kebabcase'
import type { HeadFC, PageProps } from 'gatsby'
import useTagList from '@/hooks/use-tag-list'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
import Layout from '@/layouts/layout'
import Sidebar from '@/layouts/sidebar'
import { useSidebarStore } from '@/stores/common-store'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { ListHeader } from '@/components/Common/headers'

const TagsPage = () => {
  const { site, tags } = useTagList()
  const { open, setOpen } = useSidebarStore()
  const siteTitle: string = site.siteMetadata?.title || BLOG_NAME
  const currentTag = '/'

  let stage: string = '1'
  // 크기 단계 설정 : 1~15까지 구분 - divideIntoStages(1);
  function divideIntoStages(value: number) {
    stage = value <= 1 ? '1' : stage
    stage = value > 1 && value <= 5 ? '2' : stage
    stage = value > 5 && value <= 10 ? '3' : stage
    for (let i = 2; i <= 10 && i * 10 <= 100; i++) {
      if (value > 10 && value <= i * 10) {
        stage = (i + 4).toString()
        break
      }
    }
    stage = value > 100 ? '15' : stage
    return stage
  }

  return (
    <Layout title={siteTitle}>
      <section className="sidebar block lg:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="fixed top-0 left-0 mt-0 w-3/4 rounded-none">
            <Sidebar currentTag={currentTag} viewItems={['category']} />
          </DrawerContent>
        </Drawer>
      </section>
      <section className="sidebar hidden lg:block">
        <Sidebar currentTag={currentTag} viewItems={['category']} />
      </section>

      <section className="w-full lg:min-w-[600px]">
        <ListHeader kind="tags" currentPath="Tags Keyword" />
        <ul className="flex flex-wrap justify-between">
          {tags.map((tag: any) => (
            <li key={tag.fieldValue} className={cn('p-2', `stage_${divideIntoStages(tag.totalCount)}`)}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                #{tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default TagsPage
