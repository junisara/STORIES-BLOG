import React from 'react'

import { Link, PageProps, graphql } from 'gatsby'
import Layout from '@/layouts/layout'

import Seo from '@/components/Common/seo'
import { ListHeader } from '@/components/Common/headers'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
// import  usePostList  from "@/hooks/use-post-list"
import PostList from '@/components/List/post-list'
import Sidebar from '@/layouts/sidebar'
import { useSidebarStore, useThemeModeStore } from '@/stores/common-store'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

type DataProps = {
  site: {
    siteMetadata: any
  }
  allMdx: any
}
const TagPostListPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const { open, setOpen } = useSidebarStore()
  const currentTag: string = location.pathname.replace(/^\/tags\/|\/$/g, '')
  const decodedCurrentTag = decodeURIComponent(currentTag)
  // const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const newNodeData = edges.map((node: any) => {
    return node.node
  })
  const siteTitle = data.site.siteMetadata?.title || BLOG_NAME

  return (
    <Layout title={siteTitle}>
      <section className="sidebar block lg:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="fixed top-0 left-0 mt-0 w-3/4 rounded-none">
            <Sidebar currentTag={currentTag} viewItems={['tags']} />
          </DrawerContent>
        </Drawer>
      </section>
      <section className="sidebar hidden lg:block">
        <Sidebar currentTag={currentTag} viewItems={['tags']} />
      </section>
      <section className="w-full lg:min-w-[600px]">
        <ListHeader kind="TAGS" currentPath={decodedCurrentTag} />
        <PostList posts={newNodeData} />
      </section>
    </Layout>
  )
}

export default TagPostListPage

export function Head({ location }: { location: any }) {
  const { themeMode } = useThemeModeStore()
  const currentTag: string = location.pathname.replace(/^\/tags\/|\/$/g, '')
  const decodedCurrentTag = decodeURIComponent(currentTag)
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={BLOG_NAME || decodedCurrentTag + 'Tag Page'} description={BLOG_DESC} />
    </>
  )
}

export const pageQuery = graphql`
  query TagList($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000, sort: { frontmatter: { datePublished: DESC } }, filter: { frontmatter: { taxonomy: { tag: { in: [$tag] } } } }) {
      totalCount
      edges {
        node {
          fields {
            currentCategory
            firstImageUrl {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, height: 100, width: 140, quality: 85)
              }
            }
          }
          frontmatter {
            datePublished
            title
            postId
            taxonomy {
              tag
            }
            thumbnail {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, height: 100, width: 140, quality: 85)
              }
            }
          }
          id
          excerpt
          parent {
            ... on File {
              modifiedTime
            }
          }
        }
      }
    }
  }
`
