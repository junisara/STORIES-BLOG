import React from 'react'

/**
 * 1. icon: lucide Icons https://lucide.dev/icons | lucide.dev
 * @param param0 height, width
 * @returns
 * 샘플 :
 * import { Check, Link, XCircle } from "lucide-react";
 *  <Check size={16} strokeWidth={1} color="#3e9392" />
 */

/**
 * 2. icon: Simple Icons https://simpleicons.org | SimpleIcons.org
 * @param param0 height, width
 * @returns
 * 샘플 :
 * import {IconGithub, IconLinkedin} from "@/components/icon/icons";
 * <IconGithub className='transition fill-foreground hover:fill-pink-600' height={30}  width={30} />
 */

// Github
export function IconGithub({ ...props }) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

// 링크드인
export function IconLinkedin({ ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// 밤낫 테마변경 아이콘 (낯)
export function IconThemeMode_W({ ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4000" height="102" viewBox="0 0 4000 102" fill="none" {...props}>
      <path
        d="M1999.07 81.2583L1999.06 81.2495C1989.86 69.2847 1975.43 61.5562 1959.18 61.5H0.5V0.5H3999.5V61.5L2118.79 61.5C2102.81 61.5552 2088.57 69.036 2079.36 80.6706L2079.35 80.6806L2079.34 80.6909C2070.37 93.2871 2055.64 101.5 2039 101.5C2022.61 101.5 2008.08 93.5332 1999.07 81.2583Z"
        fill="white"
        stroke="#E2E2E2"
      />
    </svg>
  )
}
// 밤낫 테마변경 아이콘 (낯)
export function IconThemeMode_B({ ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4000" height="102" viewBox="0 0 4000 100" fill="none" {...props}>
      <path
        d="M1999.07 79.2583L1999.06 79.2495C1989.86 67.2847 1975.43 59.5562 1959.18 59.5H0.5V0.5H3999.5V59.5L2118.79 59.5C2102.81 59.5552 2088.57 67.036 2079.36 78.6706L2079.35 78.6806L2079.34 78.6909C2070.37 91.2871 2055.64 99.5 2039 99.5C2022.61 99.5 2008.08 91.5332 1999.07 79.2583Z"
        fill="#343434"
        stroke="#222222"
      />
    </svg>
  )
}
