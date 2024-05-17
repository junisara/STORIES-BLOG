import React from 'react'
import { Link, PageProps } from 'gatsby'
import Header from './header'
import Footer from './footer'
import { cn } from '@/lib/utils'

type LayoutProps = {
  title: string
  children: any
}

const Layout = ({ title, children }: LayoutProps) => {
  // type DataProps = {
  //   title: string
  //   children: any
  // }

  // const Layout: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  return (
    <div className="flex flex-col min-h-screen text-colorText1 px-2">
      <Header title={title} />

      <main className="flex flex-row w-full lg:w-[64vw] min-h-[calc(100vh-390px)] mx-auto">
        {/* <section className="grid w-full max-w-screen-lg gap-4 mx-auto my-16 sm:grid-cols-none" style={{ gridTemplateColumns: "15rem calc(100% - 15rem - 1rem )" }}> */}
        <section className="lg:grid w-full max-w-screen-lg lg:gap-4 mx-auto mt-6 mb-16 grid-cols-none lg:grid-cols-[13rem_calc(100%-13rem-1rem)] ">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
