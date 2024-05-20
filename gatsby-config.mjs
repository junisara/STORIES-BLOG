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
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL || `https://localhost/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },

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
  ],
}

export default config
