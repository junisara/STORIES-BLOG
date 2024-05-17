import React from 'react'
import { CategoryDetail } from '../../config/types'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { navigate } from 'gatsby'
import { useSidebarStore } from '@/stores/common-store'
import useCategoryList from '@/hooks/use-category-list'
import { POSTS } from '@/config/constants'

interface CategoryListProps {
  currentCategory?: string
}
const CategoryList = ({ currentCategory }: CategoryListProps) => {
  const { open, setOpen } = useSidebarStore()
  const currentPath = currentCategory ? decodeURIComponent(currentCategory) : 'all'
  const data = useCategoryList()
  const { categoryList, allPostCount } = CategoryData(data)

  const handleMenuItemClick = (value: string) => {
    if (value === 'all') {
      navigate('/category')
    } else if (value === '/') {
      navigate(`/`)
    } else {
      navigate(`/category/${value}`)
    }
    setOpen(false)
  }

  return (
    <section className="sidebar-category mb-10">
      <h2 className="text-3xl mt-5 mb-2 font-thin">Category</h2>
      <ul className="flex flex-col gap-3">
        {/* <CategoryButton href="/category" isCurrent={currentPath === "all"} displayName="All" count={allPostCount} /> */}

        <Sidebar width="100%" backgroundColor="transparent">
          <Menu
            menuItemStyles={{
              button: {
                [`&:hover`]: {
                  backgroundColor: '#e1e1e1',
                },
                [`&.active`]: {
                  backgroundColor: 'transparent',
                  color: '#b6c8d9',
                },
              },
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick('/')}>전체 ({allPostCount})</MenuItem>

            {Object.keys(categoryList).map((key: any) => {
              const item = categoryList[key]
              if (Object.keys(item).length === 0) {
                const isActive = key === currentPath ? true : false
                return (
                  <MenuItem active={isActive} key={key} onClick={() => handleMenuItemClick(key)}>
                    {key}
                  </MenuItem>
                )
              } else {
                const isActive = currentPath && currentPath.includes(key) ? true : false
                return (
                  <SubMenu
                    key={key}
                    label={key}
                    active={isActive}
                    defaultOpen={isActive}
                    rootStyles={{
                      div: {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {Object.keys(item).map((subKey: any) => {
                      const isActive = currentPath && currentPath.includes(subKey) ? true : false
                      return (
                        <MenuItem key={subKey} active={isActive} onClick={() => handleMenuItemClick(`${key}/${subKey}`)}>
                          {subKey}
                        </MenuItem>
                      )
                    })}
                  </SubMenu>
                )
              }
            })}
          </Menu>
        </Sidebar>
      </ul>
    </section>
  )
}

export default CategoryList

const CategoryData = (data: any) => {
  const paths = data.allDirectory.nodes
  const allPostCount = data.allMdx.totalCount
  const category = paths.map((path: { absolutePath: string }) => {
    const categorypath: string[] = path.absolutePath.split('/')
    const index = categorypath.indexOf(POSTS)
    index > 0 && categorypath.splice(0, index + 1)
    return categorypath
  })

  const filteredCategory = category.filter((item: string[]) => item.length > 0)
  const categoryList = filteredCategory.reduce((acc: any, cur: any) => {
    const [depth1, depth2, depth3] = cur

    // 1. 카테고리 1레벨
    if (!acc[depth1]) {
      acc[depth1] = {}
    }

    // 2. 카테고리 2레벨
    if (depth2 && !acc[depth1][depth2]) {
      acc[depth1][depth2] = {}
    }

    // 3. 카테고리 3레벨
    if (depth3) {
      acc[depth1][depth2][depth3] = {}
    }

    return acc
  }, {})

  return { categoryList, allPostCount }
}
