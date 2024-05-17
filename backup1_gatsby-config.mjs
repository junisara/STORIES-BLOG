import { dirname } from 'path'
import { fileURLToPath } from 'url'

import remarkGfm from 'remark-gfm'
import remarkExternalLinks from 'remark-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  pathPrefix: `/`,
  // siteMetadata: {
  //   title: `${process.env.BLOG_NAME}`,
  //   siteUrl: `${process.env.BASE_DOMAIN}`,
  //   author: {
  //     name: `${process.env.AUTHOR_NAME}`,
  //     summary: `${process.env.AUTHOR_SUMMARY}`,
  //   },
  //   description: `${process.env.BLOG_DESC}`,
  //   social: {
  //     twitter: `${process.env.AUTHOR_SOCIAL_twitter}`,
  //   },
  // },

  siteMetadata: {
    title: `Gatsby`,
    siteUrl: `https://www.gatsbyjs.com`,
    description: `Blazing fast modern site generator for React`,
    author: {
      name: `junisara`,
      summary: `junisara`,
    },
    social: {
      twitter: `junisara`,
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
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
            [rehypeAutolinkHeadings, { behavior: `wrap` }],
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
        path: `${__dirname}/_POSTS_dev`,
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
  ],
}

export default config
