import React from 'react'
import { graphql, HeadFC, PageProps } from 'gatsby'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
import { ListHeader } from '@/components/Common/headers'
import PostList from '@/components/List/post-list'
import Layout from '@/layouts/layout'
import Seo from '@/components/Common/seo'
import Sidebar from '@/layouts/sidebar'
import { useSidebarStore, useThemeModeStore } from '@/stores/common-store'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

type DataProps = {
  site: {
    siteMetadata: any
  }
  allMdx: any
}
const CategoryPostListPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const { open, setOpen } = useSidebarStore()
  const currentCategory: string = location.pathname.replace(/^\/category\/|\/$/g, '')
  const decodedCurrentCategory = decodeURIComponent(currentCategory)
  const siteTitle = data.site.siteMetadata?.title || BLOG_NAME
  const posts = data.allMdx.nodes

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
        <ListHeader kind="CATEGORY" currentPath={decodedCurrentCategory} />
        <PostList posts={posts} currentCategory={decodedCurrentCategory} />
      </section>
    </Layout>
  )
}

export default CategoryPostListPage

// export const Head: HeadFC = ({ location }) => {

export function Head({ location }: { location: any }) {
  const { themeMode } = useThemeModeStore()
  const currentCategory: string = location.pathname.replace(/^\/category\/|\/$/g, '')
  const decodedCurrentCategory = decodeURIComponent(currentCategory)
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={BLOG_NAME || decodedCurrentCategory + 'Category Page'} description={BLOG_DESC} />
    </>
  )
}

export const pageQuery = graphql`
  query PostListByCategory($currentCategory: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { frontmatter: { datePublished: DESC } }
      filter: { fields: { currentCategory: { eq: $currentCategory } }, frontmatter: { publish: { eq: "published" } } }
    ) {
      nodes {
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
`
