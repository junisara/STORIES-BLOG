import { useStaticQuery, graphql } from 'gatsby'

const usePostList = () => {
  const data = useStaticQuery(graphql`
    query PostList {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
      allMdx(sort: { frontmatter: { datePublished: DESC } }, filter: { frontmatter: { publish: { eq: "published" } } }) {
        nodes {
          fields {
            currentCategory
            firstImageUrl {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, height: 120, width: 160, quality: 85)
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
                gatsbyImageData(layout: CONSTRAINED, height: 120, width: 160, quality: 85)
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
  `)

  return { site: data.site, posts: data.allMdx.nodes }
}

export default usePostList
