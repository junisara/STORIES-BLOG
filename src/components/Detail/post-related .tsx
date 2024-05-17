'use client'
import React from 'react'
import { Link } from 'gatsby'
// import { Button } from "../ui/button";
import { ChevronLeft } from 'lucide-react'
import { ScrollToComment, ScrollTop } from '@/components/Common/toc-buttons'
import { HeadingItem, Post } from '@/config/types'
import { useHeadingsObserver } from '@/hooks/use-headings-observer'
import { cn } from '@/lib/utils'
import CopyLinkButton from '../Common/copy-link-button'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
// import { useRouter } from "next/navigation";

type DataProps = {
  relatedPosts: [Post]
}

const PostRelated: React.FC<DataProps> = ({ relatedPosts }) => {
  // const PostRelated = ({ relatedPost }: Props) => {
  return (
    <ul className="text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-16">
      {relatedPosts.map(post => {
        const thumbnail = getImage(post.frontmatter.thumbnail)
        const firstImageUrl = getImage(post.fields.firstImageUrl)
        const frontImage = thumbnail || firstImageUrl
        return (
          <li key={post.frontmatter.postId} className="text-center">
            <Link to={'/' + post.frontmatter.postId} className="flex flex-col">
              {frontImage && <GatsbyImage image={frontImage} alt="썸네일" />}
              {post.frontmatter.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default PostRelated
