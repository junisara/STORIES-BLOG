import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { cn } from '@/lib/utils'

const Bio = ({ className }: { className: string }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className={cn('bio mb-10 flex ', className)}>
      <StaticImage
        className="bio-avatar min-w-[50px] rounded-full mr-4"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../../static/images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>You should follow them on Twitter</a>
        </p>
      )}
    </div>
  )
}

export default Bio
