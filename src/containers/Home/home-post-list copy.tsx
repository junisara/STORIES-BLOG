import React from 'react'
import { Link } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
import usePostList from '@/hooks/use-post-list'
import PostList from '@/components/List/post-list'
import Layout from '@/layouts/layout'
import Seo from '@/components/Common/seo'
import Sidebar from '@/layouts/sidebar'
import useSidebarStore from '@/stores/store-sidebar'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

const HomePage = () => {
  const { open, setOpen } = useSidebarStore()
  const { site, posts } = usePostList()
  const siteTitle: string = site.siteMetadata?.title || BLOG_NAME
  const currentCategory = '/'

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "_POSTS" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout title={siteTitle}>
      <section className="sidebar block lg:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="fixed top-0 left-0 mt-0 w-3/4 rounded-none">
            <Sidebar currentCategory={currentCategory} viewItems={['category', 'tags']} />
          </DrawerContent>
        </Drawer>
      </section>
      <section className="sidebar hidden lg:block">
        <Sidebar currentCategory={currentCategory} viewItems={['category', 'tags']} />
      </section>
      <section className="w-full lg:min-w-[600px]">
        {/* <Bio /> */}
        <PostList posts={posts} />
      </section>
    </Layout>
  )
}

export default HomePage
