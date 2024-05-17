/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import fs from 'fs'
import * as path from 'path'
import dayjs from 'dayjs'
import kebabCase from 'lodash.kebabcase'
import readingTime from 'reading-time'
import matter from 'gray-matter'

const { createFilePath } = require(`gatsby-source-filesystem`)
import { POSTS } from './src/config/constants'

// ui.shadcn.com 때문에 설정함
export const onCreateWebpackConfig = ({ actions }: { actions: any }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/lib/utils': path.resolve(__dirname, 'src/lib/utils'),
      },
    },
  })
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
/******************************************
 *  페이지 만들기
 ******************************************/
exports.createPages = async ({ graphql, actions, reporter }: { graphql: any; actions: any; reporter: any }) => {
  const { createPage } = actions
  const result = await graphql(`
    query CategoryTagsQuery {
      allDirectory(filter: { base: { nin: ["images", "pages", "_POSTS"] }, absolutePath: { regex: "/^(?!.*[0-9]{8}_)/" } }, sort: { absolutePath: ASC }) {
        nodes {
          absolutePath
          base
        }
      }
      allMdx(filter: { frontmatter: { publish: { eq: "published" } } }, sort: { frontmatter: { datePublished: ASC } }, limit: 2000) {
        edges {
          node {
            id
            frontmatter {
              postId
              taxonomy {
                tag
              }
            }
            internal {
              contentFilePath
            }
          }
          next {
            id
            frontmatter {
              title
              postId
            }
          }
          previous {
            id
            frontmatter {
              postId
              title
            }
          }
        }
        totalCount
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your category list`, result.errors)
    return
  }

  const paths = result.data.allDirectory.nodes
  const posts = result.data.allMdx.edges

  const categoryList = paths.map((path: { absolutePath: string }) => {
    const categorypath: string[] = path.absolutePath.split('/')
    const index = categorypath.indexOf(POSTS)
    index > 0 && categorypath.splice(0, index + 1)
    const category = categorypath.join('/')
    return category
  })

  const categoryTemplate = path.resolve(`src/containers/Category/category-post-list.tsx`)
  const tagTemplate = path.resolve('src/containers/Tags/tag-post-list.tsx')
  const postTemplate = path.resolve('src/containers/Post/post-detail.tsx')

  /******************************************
   *  Category 페이지 만들기
   ******************************************/
  if (categoryList.length > 0) {
    categoryList.forEach((category: string, index: number) => {
      // const previousPostId = index === 0 ? null : categoryList[index - 1].id
      // const nextPostId = index === categoryList.length - 1 ? null : categoryList[index + 1].id

      createPage({
        path: `category/${category}`,
        component: categoryTemplate,
        context: {
          currentCategory: category,
        },
      })
    })
  }

  /******************************************
   *  Tags 페이지 만들기
   ******************************************/
  let tags = new Set() // 3. set to store tags
  if (posts.length > 0) {
    posts.forEach((post: any) => {
      if (post.node.frontmatter.taxonomy.tag && Array.isArray(post.node.frontmatter.taxonomy.tag)) {
        post.node.frontmatter.taxonomy.tag.forEach((tag: string) => {
          tag && !tag.includes('[@') && tags.add(tag)
        })
      }
    })
  }

  tags.forEach((tag: any) => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })

  /******************************************
   *  Posts 페이지 만들기
   ******************************************/
  if (posts.length > 0) {
    // console.log('postspostsposts : ', posts)

    posts.forEach((post: any, index: number) => {
      const previousId = index === 0 ? null : post.previous.id
      const nextId = index === posts.length - 1 ? null : post.next.id

      createPage({
        path: `/${post.node.frontmatter.postId}`,
        component: `${postTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
        context: {
          postId: post.node.frontmatter.postId,
          nextId,
          previousId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// exports.createPages = async ({ graphql, actions, reporter }:{ graphql:any, actions:any, reporter:any }) => {
//   const result = await graphql(`
//     query tagsQuery {
//       allMdx(sort: {frontmatter: {datePublished: ASC}}, limit: 1000) {
//         nodes {
//           id
//           frontmatter {
//             postId
//             taxonomy {
//               tag
//             }
//           }
//         }
//       }
//     }
//   `)
//   const { createPage } = actions;
//   const posts = result.data.allMdx.nodes;
//   let tags = new Set() // 3. set to store tags
//   if (posts.length > 0) {
//     posts.forEach((post:any) => {
//       if (post.frontmatter.taxonomy.tag) {
//         post.frontmatter.taxonomy.tag.forEach((tag: string) => {
//           !tag.includes("[@") && tags.add(tag);
//         })
//       }
//     })
//   }

//   const tagTemplate = path.resolve("src/templates/tag-post-list.tsx")
//   tags.forEach((tag:any) => {
//     createPage({
//       path: `/tags/${kebabCase(tag)}/`,
//       component: tagTemplate,
//       context: {
//         tag,
//       },
//     })
//   })
// }

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }: { node: any; actions: any; getNode: any }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const { modifiedTime } = fileNode
    const modifiedDate = dayjs(modifiedTime).format()
    const contentFilePath = node.internal.contentFilePath
    const categorypath: string[] = contentFilePath.split('/')
    const index = categorypath.indexOf(POSTS)
    index > 0 && categorypath.splice(0, index + 1)
    categorypath.splice(-2)

    // 첫번째 이미지 찾기
    const body = node.body
    const regex = /!\[(.*?)\]\((.*?)\)/
    const match = regex.exec(body)

    // 추가 graphql 변수 설정
    const firstImageUrl = match && match.length >= 3 && match[2]
    const currentCategory = categorypath.join('/')
    const readingMinutes = Math.ceil(readingTime(node.body).minutes)

    // 실제 파일의 생성/변경된 날짜를 자동으로 작성 해줌
    // MD파일이 신규이면서 발행(published)된 경우 날짜가 없는 경우 날짜를 자동으로 달아줌
    if (node.frontmatter.publish === 'published' && (!node.frontmatter.datePublished || !node.frontmatter.postId)) {
      const grayMatter = node.frontmatter
      const now = dayjs()
      const nowDate = now.format()
      if (!grayMatter.postId) {
        // PostId 붙히기
        const randomNum = Math.floor(Math.random() * 10000)
        const formattedCount = randomNum.toString().padStart(4, '0') // 카운트를 4자리 숫자로 포맷팅합니다.
        const postIdCode = `${now.format('YYYYMMDDHH')}${formattedCount}`
        const postId = grayMatter.tistory?.postId || postIdCode
        grayMatter.postId = postId
      }

      if (!grayMatter.datePublished) {
        // 날짜 붙히기
        const am = '오전'
        const pm = '오후'
        let datePub: string
        let dateUpdate: string
        let publishedRegDatePub: string
        let publishedRegDateUpdate: string
        datePub = grayMatter.blogger && grayMatter.blogger.published.toString()
        datePub = grayMatter.tistory && grayMatter.tistory.published.toString()
        dateUpdate = grayMatter.blogger && grayMatter.blogger.updated.toString()
        dateUpdate = grayMatter.tistory && grayMatter.tistory.updated.toString()
        if (datePub) {
          if (datePub.includes(am) || datePub.includes(pm)) {
            const meridiem1 = (datePub.includes(am) && am) || (datePub.includes(pm) && pm)
            const [date1, time1] = datePub.split(/오전|오후/)
            const convertedMeridiem1 = meridiem1 === '오전' ? 'AM' : 'PM'
            publishedRegDatePub = dayjs(`${date1} ${time1} ${convertedMeridiem1}`).format()
          } else {
            publishedRegDatePub = dayjs(`${datePub}`).format()
          }

          // dateUpdate
          if (dateUpdate.includes(am) || dateUpdate.includes(pm)) {
            const meridiem2 = (dateUpdate.includes(am) && am) || (dateUpdate.includes(pm) && pm)
            const [date2, time2] = dateUpdate.split(/오전|오후/)
            const convertedMeridiem2 = meridiem2 === '오전' ? 'AM' : 'PM'
            publishedRegDateUpdate = dayjs(`${date2} ${time2} ${convertedMeridiem2}`).format()
          } else {
            publishedRegDateUpdate = dayjs(`${dateUpdate}`).format()
          }
        } else {
          publishedRegDatePub = nowDate
          publishedRegDateUpdate = nowDate
        }
        grayMatter.datePublished = publishedRegDatePub
        grayMatter.dateUpdated = publishedRegDateUpdate
      }

      // 1. Front Matter와 컨텐츠를 다시 합치기
      const updatedContent = matter.stringify(node.body, grayMatter)

      // 2. 업데이트된 내용을 파일에 쓰기
      fs.writeFileSync(contentFilePath, updatedContent)
      console.log('새로 발행되었네요 : ', contentFilePath)

      //   // MD파일이 수정이면서 발행(published)된 경우 dateUpdated 날짜가 수정된 날짜와 다른 경우 자동으로 수정해줌
      // } else if (node.frontmatter.publish === 'published' && node.frontmatter.dateUpdated !== modifiedDate) {
      //   const grayMatter = node.frontmatter
      //   grayMatter.dateUpdated = modifiedDate
      //   // 1. Front Matter와 컨텐츠를 다시 합치기
      //   const updatedContent = matter.stringify(node.body, grayMatter)

      //   // 2. 업데이트된 내용을 파일에 쓰기
      //   fs.writeFileSync(contentFilePath, updatedContent)
      //   console.log('수정되었네요 : ', contentFilePath)
    }

    // graphql에 필드 생성
    createNodeField({
      name: `firstImageUrl`,
      node,
      value: firstImageUrl,
    })
    createNodeField({
      name: `currentCategory`,
      node,
      value: currentCategory,
    })
    createNodeField({
      name: `readingMinutes`,
      node,
      value: readingMinutes, // 읽는데 걸리는 일반적인 시간
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
// exports.createSchemaCustomization = ({ actions }:{ actions:any }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type Mdx implements Node {
//       frontmatter: FrontMatter
//       fields: Fields
//     }

//     type FrontMatter {
//       title: String
//       publish: String
//       thumbnail: File
//       desc: String
//       postId: String
//       datePublished: Date @dateformat
//       dateUpdated: Date @dateformat
//       blogs: Blogs
//       taxonomy: Taxonomy
//       tistory: TistoryBlogger
//       blogger: TistoryBlogger
//     }

//     type Blogs {
//       tistory: BlogService
//       blogger: BlogService
//     }

//     type BlogService {
//       regist: Boolean
//       name: String
//     }

//     type Taxonomy {
//       category: String
//       tag: [String]
//     }

//     type TistoryBlogger {
//       postId: String
//       url: String
//       published: String
//       updated: String
//     }

//     type Fields {
//       currentCategory: String
//     }
//   `)
