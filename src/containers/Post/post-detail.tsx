import React from 'react'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Seo from '@/components/Common/seo'
import Layout from '@/layouts/layout'
import Sidebar from '@/layouts/sidebar'
import TocSidebar from '@/components/Detail/toc-sidebar'
import { PostHeader } from '@/components/Common/headers'
import { HeadingItem } from '@/config/types'
import { useSidebarStore, useThemeModeStore } from '@/stores/common-store'
import kebabCase from 'lodash.kebabcase'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { MDXProvider } from '@mdx-js/react'
import PostRelated from '@/components/Detail/post-related '
const shortcodes = { Link } // Provide common components here

type DataProps = {
  site: any
  mdx: any
  previous: any
  next: any
  body: any
}
export default function PostPage({ data, children }: { data: any; children: any }) {
  // const PostPage: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const { open, setOpen } = useSidebarStore()

  console.log('data : ', data)
  //   console.log('children : ', children)
  //   console.log('body : ', data.mdx.body)
  //   console.log('data.mdx : ', data.mdx.frontmatter.title)
  //   console.log('data.previous : ', data.mdx.frontmatter.title)
  //   console.log('data.mdx : ', data.mdx.frontmatter.title)

  const siteMetadata = data.site.siteMetadata
  const etcmatter = data.mdx.fields
  const frontmatter = data.mdx.frontmatter
  const tags = data.mdx.frontmatter.taxonomy.tag
  const body = data.mdx.body
  const currentCategory = etcmatter.currentCategory
  const relatedPosts = data.allMdx.nodes
  const siteTitle: string = siteMetadata?.title || `Title`
  const toc = parseToc(body)

  console.log('relatedPosts : ', relatedPosts)

  return (
    <Layout title={siteTitle}>
      <section className="sidebar block lg:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="fixed top-0 left-0 mt-0 w-3/4 rounded-none">
            <Sidebar currentCategory={currentCategory} viewItems={['category']} />
          </DrawerContent>
        </Drawer>
      </section>
      <section className="sidebar hidden lg:block">
        <nav className="top-28 w-full hidden h-[calc(100%+150px)] md:block ">
          <TocSidebar toc={toc} category={currentCategory} />
        </nav>
      </section>
      <section className="w-full lg:min-w-[600px] px-0 lg:px-6">
        <PostHeader etcmatter={etcmatter} frontmatter={frontmatter} />
        <section className="markdown">
          <MDXProvider components={shortcodes}>{children}</MDXProvider>

          <div className="mt-[100px] ">
            <div className="tags">
              <ul className="flex flex-wrap justify-between">
                {tags
                  ? tags.map((tag: string) => (
                      <li key={kebabCase(tag)} className="list-none text-sm !ml-0 !pl-0 mr-2 my-1">
                        <Link to={`/tags/${kebabCase(tag)}`}>#{kebabCase(tag)}</Link>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </section>
        {/* <Bio className="my-5" /> */}

        <div className="flex justify-between mt-20 pt-4 border-t border-solid border-colorGray1 gap-20">
          <div className="text-left">
            {data.previous && (
              <Link to={'/' + data.previous.frontmatter.postId} rel="prev">
                <small>← Previous</small>
                <p className="font-bold  md:text-lg">{data.previous.frontmatter.title}</p>
              </Link>
            )}
          </div>
          <div className="text-right ">
            {data.next && (
              <Link to={'/' + data.next.frontmatter.postId} rel="next">
                <small>Next →</small>
                <p className=" font-bold md:text-lg">{data.next.frontmatter.title}</p>
              </Link>
            )}
          </div>
        </div>
        <PostRelated relatedPosts={relatedPosts} />
      </section>
    </Layout>
  )
}

// export default PostPage

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { themeMode } = useThemeModeStore()
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={data.mdx.frontmatter.title} />
    </>
  )
}

export const query = graphql`
  query BlogPostDetail($postId: String!, $previousId: String, $nextId: String, $currentCategory: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(frontmatter: { postId: { eq: $postId }, publish: { eq: "published" } }) {
      body
      frontmatter {
        title
        postId
        datePublished
        dateUpdated
        desc
        taxonomy {
          tag
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, height: 480, width: 640, quality: 85)
          }
          absolutePath
        }
        publish
      }
      fields {
        currentCategory
        readingMinutes
      }
      internal {
        contentFilePath
      }
    }
    previous: mdx(id: { eq: $previousId }, frontmatter: { publish: { eq: "published" } }) {
      body
      frontmatter {
        title
        postId
        datePublished
        dateUpdated
        desc
        taxonomy {
          tag
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, height: 480, width: 640, quality: 85)
          }
          absolutePath
        }
        publish
      }
      fields {
        currentCategory
        readingMinutes
      }
      internal {
        contentFilePath
      }
    }
    next: mdx(id: { eq: $nextId }, frontmatter: { publish: { eq: "published" } }) {
      body
      frontmatter {
        title
        postId
        datePublished
        dateUpdated
        desc
        taxonomy {
          tag
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, height: 480, width: 640, quality: 85)
          }
          absolutePath
        }
        publish
      }
      fields {
        currentCategory
        readingMinutes
      }
      internal {
        contentFilePath
      }
    }
    allMdx(filter: { fields: { currentCategory: { eq: $currentCategory } } }, limit: 6) {
      nodes {
        frontmatter {
          title
          postId
          thumbnail {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 240, height: 160, quality: 85)
            }
          }
        }
        fields {
          firstImageUrl {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 240, height: 160, quality: 85)
            }
          }
        }
      }
    }
  }
`

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(#|##|###) (.*$)/gim // 제목(#, ##)을 찾는 정규식
  const headingList = content.match(regex) || [] // null일 경우 빈 배열 반환
  return (
    headingList.map((heading: string) => ({
      text: heading.replace('###', '').replace('##', '').replace('#', ''),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: (heading.match(/#/g)?.length || 3) - 1,
    })) || []
  )
}
