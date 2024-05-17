import { dirname } from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
import remarkGfm from 'remark-gfm'
import remarkExternalLinks from 'remark-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import adapter from 'gatsby-adapter-netlify'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = `.env.${process.env.NODE_ENV}`
dotenv.config({ path: envPath })

const config = {
  // adapter: adapter({
  //   excludeDatastoreFromEngineFunction: false,
  //   imageCDN: false,
  // }),
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
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sass`,
    // "gatsby-plugin-google-gtag",
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          // `gatsby-remark-autolink-headers`,
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [remarkExternalLinks, { target: false }],
          ],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            rehypeSlug,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [rehypeAutolinkHeadings, { behavior: `before` }],
          ],
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/${process.env.POSTS}`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/static/images`,
      },
    },

    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': `${__dirname}/src`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-output`,
      options: {
        // default values
        publicPath: 'public',
        rmPublicFolder: false,
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
            serialize: ({ query: { site, allMdx } }) => {
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
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          // optional, any index settings
          // Note: by supplying settings, you will overwrite all existing settings on the index
        },
        mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
        concurrentQueries: false, // default: true
        dryRun: false, // default: false, only calculate which objects would be indexed, but do not push to Algolia
        continueOnFailure: false, // default: false, don't fail the build if Algolia indexing fails
        algoliasearchOptions: undefined, // default: { timeouts: { connect: 1, read: 30, write: 30 } }, pass any different options to the algoliasearch constructor
      },
    },
  ],
}

// const algoliaQuery = `
//   query {
//     pages: allSitePage {
//       nodes {
//         # querying id is required
//         id
//         component
//         path
//         componentChunkName
//         jsonName
//         internal {
//           # querying internal.contentDigest is required
//           contentDigest
//           type
//           owner
//         }
//       }
//     }
//   }
// `

// const queries = [
//   {
//     query: algoliaQuery,
//     queryVariables: {}, // optional. Allows you to use graphql query variables in the query
//     transformer: ({ data }) => data.pages.nodes, // optional
//     indexName: 'index name to target', // overrides main index name, optional
//     settings: {
//       // optional, any index settings
//       // Note: by supplying settings, you will overwrite all existing settings on the index
//     },
//     mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
//   },
// ]

export default config
