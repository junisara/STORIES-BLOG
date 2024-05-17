import React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { AlignJustify } from 'lucide-react'
import ScrollProgressBar from '@/components/Common/scroll-progress-bar'
import { useSidebarStore, useThemeModeStore } from '@/stores/common-store'
import { Button } from '../components/ui/button'
import SwitchTheme from '@/components/Common/switch-theme'

const Header = ({ title }: { title: string }) => {
  const { open, setOpen } = useSidebarStore()
  const { themeMode } = useThemeModeStore()
  const ToggleBtn = () => {
    setOpen(true)
  }

  const svgBackgroundCode_W = `
  <svg xmlns="http://www.w3.org/2000/svg" width="4000" height="102" viewBox="0 0 4000 102" fill="none">
    <path d="M1999.07 81.2583L1999.06 81.2495C1989.86 69.2847 1975.43 61.5562 1959.18 61.5H0.5V0.5H3999.5V61.5L2118.79 61.5C2102.81 61.5552 2088.57 69.036 2079.36 80.6706L2079.35 80.6806L2079.34 80.6909C2070.37 93.2871 2055.64 101.5 2039 101.5C2022.61 101.5 2008.08 93.5332 1999.07 81.2583Z" fill="white" stroke="#E2E2E2"/>
  </svg>`
  const svgBackgroundCode_B = `
<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="102" viewBox="0 0 4000 100" fill="none">
  <path d="M1999.07 79.2583L1999.06 79.2495C1989.86 67.2847 1975.43 59.5562 1959.18 59.5H0.5V0.5H3999.5V59.5L2118.79 59.5C2102.81 59.5552 2088.57 67.036 2079.36 78.6706L2079.35 78.6806L2079.34 78.6909C2070.37 91.2871 2055.64 99.5 2039 99.5C2022.61 99.5 2008.08 91.5332 1999.07 79.2583Z" fill="#343434" stroke="#222222"/>
</svg>
`

  return (
    <header
      className="header sticky top-0 h-[84px] lg:h-[100px] z-10 -mx-6"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(themeMode === 'dark' ? svgBackgroundCode_B : svgBackgroundCode_W)}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'calc(50% - 32px) center',
      }}
    >
      <nav className="flex flex-col items-center justify-center w-full h-12 lg:h-16 ">
        <div className="my-1 h-full flex w-full  mx-auto items-center justify-between px-4">
          <div className="flex items-center justify-normal w-20  h-8 lg:h-10 text-lg font-medium ">
            <Link to="/" className={cn('logo', 'text-xl hidden lg:flex items-center')}>
              <span className="ux text-3xl">UX</span>.STORIES.PE.KR
            </Link>
            <Button variant="ghost" size="icon" onClick={ToggleBtn} className="lg:hidden">
              <AlignJustify />
            </Button>
          </div>

          <div className={cn('justify-center items-center text-lg mt-9  h-16 lg:h-20  w-16 lg:w-20 rounded-full font-medium')}>
            <Link to="/" className="flex justify-center">
              <StaticImage
                className="logoBreathe drop-shadow-lg bio-avatar rounded-full  !w-[60px] !h-[60px] lg:!w-[80px]  lg:!h-[80px] "
                layout="fixed"
                formats={['auto', 'webp', 'avif']}
                src="../static/images/ux_logo_100X100.png"
                width={80}
                height={80}
                quality={95}
                alt="Profile picture"
              />
            </Link>

            {/* <Avatar className="logoBreathe h-20 w-20 drop-shadow-lg">
            <AvatarImage src="../../images/ux_logo_100X100.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          </div>

          <div className="flex items-center justify-end w-20 h-8 lg:h-10 lg:mt-0 text-lg font-medium">
            {/* {title} */}
            <SwitchTheme />
            {/* <Button asChild variant="ghost" size="icon">
            <Link href="https://github.com/d5br5" target="_blank">
              <Github className="size-[1.6rem]" />
            </Link>
          </Button> */}
          </div>
        </div>
        <ScrollProgressBar />
      </nav>
    </header>
  )
}

export default Header
