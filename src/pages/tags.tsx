import React from 'react'
import Tags from '@/containers/Tags'
import Seo from '@/components/Common/seo'
import { BLOG_DESC, BLOG_NAME } from '@/config/constants'
import { useThemeModeStore } from '@/stores/common-store'

export default Tags

export function Head() {
  const { themeMode } = useThemeModeStore()
  return (
    <>
      <html lang="ko" />
      <body className={themeMode} />
      <Seo title={BLOG_NAME || 'Tags Page'} description={BLOG_DESC} />
    </>
  )
}
