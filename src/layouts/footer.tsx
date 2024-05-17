import React from 'react'
import { Link } from 'gatsby'
import { IconGithub, IconLinkedin } from '@/components/Icon/icons'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 pt-20 pb-16 mt-32 -mx-6 bg-gray-700  text-colorText2 text-center">
      <div className="flex justify-center gap-4">
        {/* <a href="https://github.com/junisara" target="_blank">
          <IconGithub className="transition fill-foreground hover:fill-pink-600" height={30} width={30} />
        </a>
        <a href="https://www.linkedin.com/in/dohkim777" target="_blank">
          <IconLinkedin className="transition fill-foreground hover:fill-pink-600" height={30} width={30} />
        </a> */}
      </div>
      <div className="font-thin">
        Copyright 2020. <span className="font-semibold">junisara</span> All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
