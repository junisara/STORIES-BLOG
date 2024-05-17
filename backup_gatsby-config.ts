import type { GatsbyConfig } from 'gatsby'
import { BASE_DOMAIN, BLOG_NAME, BLOG_DESC, AUTHOR_NAME, AUTHOR_SUMMARY, AUTHOR_SOCIAL_twitter } from '@/config/constants'
import remarkGfm from 'remark-gfm'

// 사용 예>  siteMetadata: { apiEndpoint: process.env.POSTS,}
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  pathPrefix: `/`,
  siteMetadata: {
    title: `${process.env.BLOG_NAME}`,
    siteUrl: `${process.env.BASE_DOMAIN}`,
    author: {
      name: `${process.env.AUTHOR_NAME}`,
      summary: `${process.env.AUTHOR_SUMMARY}`,
    },
    description: `${process.env.BLOG_DESC}`,
    social: {
      twitter: `${process.env.AUTHOR_SOCIAL_twitter}`,
    },
  },

  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-sass',
    // "gatsby-plugin-google-gtag",
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    `gatsby-plugin-sharp`,
    // `gatsby-transformer-remark`,
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 630,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-responsive-iframe`,
    //         options: {
    //           wrapperStyle: `margin-bottom: 1.0725rem`,
    //         },
    //       },
    //       `gatsby-remark-prismjs`,
    //     ],
    //   },
    // },

    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': `${__dirname}/src`,
        },
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: { query: { site: any; allMdx: { nodes: any[] } } }) => {
              // serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  desc: node.excerpt,
                  datePublished: node.frontmatter.datePublished,
                  url: site.siteMetadata.siteUrl + node.fields.currentCategory,
                  guid: site.siteMetadata.siteUrl + node.fields.currentCategory,
                  custom_elements: [{ 'content:encoded': node.body }],
                })
              })
            },
            query: `{
              allMdx(sort: {frontmatter: {datePublished: DESC}}) {
                nodes {
                  excerpt
                  body
                  frontmatter {
                    title
                    datePublished
                    dateUpdated
                  }
                  fields {
                    currentCategory
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: 'junisara Stories Blog RSS Feed',
          },
        ],
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: `src/static/images/icon.png`,
        name: `junisara Stories Blog`,
        short_name: `Blog Stories`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },

    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'], // 이 줄을 추가하여 .md 파일도 인식하도록 확장자 목록을 확장합니다.
        mdxOptions: {
          // remarkPlugins: [remarkGfm],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 780,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/${process.env.POSTS}`,
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/static/images`,
      },
      __key: 'images',
    },
  ],
}

export default config
