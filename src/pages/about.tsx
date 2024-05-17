import React from 'react'
import { Link, graphql } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'

import Seo from '../components/Common/seo'
import { useThemeModeStore } from '@/stores/common-store'

type DataProps = {
  site: {
    siteMetadata: any
  }
  allMdx: any
}

const AboutPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  return <div>About</div>
}

export default AboutPage

export function Head() {
  const { themeMode } = useThemeModeStore()
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={BLOG_NAME || 'About Page'} />
    </>
  )
}
