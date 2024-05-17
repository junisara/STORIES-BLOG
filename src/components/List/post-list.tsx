import React from 'react'
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image'
import { Link, PageProps, navigate } from 'gatsby'
import { Post } from '@/config/types'
import kebabCase from 'lodash.kebabcase'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { timeFormat } from '@/lib/utils'

type DataProps = {
  // site: {
  //   siteMetadata: any
  // }
  // allMdx: any
  posts: [Post]
  currentCategory?: string
  currentTag?: string
}
const PostList: React.FC<DataProps> = ({ posts, currentCategory, currentTag }) => {
  return (
    <section className="">
      {posts.map((post: Post) => {
        const title = post.frontmatter.title || post.frontmatter.postId
        let tags =
          post.frontmatter.taxonomy?.tag &&
          post.frontmatter.taxonomy?.tag.map(
            (tag: string, index: number) =>
              tag &&
              !tag.includes('[@') && (
                <button
                  key={index}
                  onClick={() => navigate(`/tags/${kebabCase(tag)}/`)}
                  itemProp="url"
                  className="ml-2 text-colorText2 text-sm hover:text-primary"
                >
                  {' '}
                  #{tag}{' '}
                </button>
              ),
          )
        tags && tags.join('')
        // const thumbnail = post.frontmatter.thumbnail && post.frontmatter.thumbnail.ext === '.gif' ? post.frontmatter.thumbnail.publicURL : getImage(post.frontmatter.thumbnail)
        // const firstImageUrl = post.fields.firstImageUrl && post.fields.firstImageUrl.ext === '.gif' ? post.fields.firstImageUrl.publicURL : getImage(post.fields.firstImageUrl)
        const thumbnail = getImage(post.frontmatter.thumbnail)
        const firstImageUrl = getImage(post.fields.firstImageUrl)
        const frontImage = thumbnail || firstImageUrl

        return (
          <Card key={post.id} className="mb-3">
            <Link to={'/' + post.frontmatter.postId} itemProp="url">
              <CardHeader className="pb-4">
                <CardDescription className="text-colorText2">
                  <small>{timeFormat(post.frontmatter.datePublished)}</small>
                </CardDescription>
                <CardTitle className="text-colorText3">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                {frontImage && <GatsbyImage image={frontImage} alt="썸네일" className="float-left mr-5" />}
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.desc || post.excerpt,
                  }}
                  itemProp="description"
                  className="w-fit-content"
                />
              </CardContent>
              <CardFooter className="block">{tags}</CardFooter>
            </Link>
          </Card>
        )
      })}
    </section>
  )
}

export default PostList
