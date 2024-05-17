import React from 'react'
import HomePostListPage from '@/containers/Home/home-post-list'
import Seo from '@/components/Common/seo'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
import { useThemeModeStore } from '@/stores/common-store'

export default HomePostListPage

export function Head() {
  const { themeMode } = useThemeModeStore()
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={BLOG_NAME || 'Home Page'} description={BLOG_DESC} />
    </>
  )
}
