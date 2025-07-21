import React from 'react'
import Menue from './Menu'
import Menu from './Menu'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from './SearchBar'
import dynamic from 'next/dynamic'
// import Navicons from './Navicons'

const Navicons = dynamic(() =>import("./Navicons"), {ssr: false})
type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      <div className='h-full flex justify-between items-center md:hidden'>
        <Link href={"/"}>
        <div className='text-2xl tracking-wide' >LAMA</div>
          </Link>
      <Menu />
      </div>
      {/* BIGGER SCREEN */}
      <div className=' hidden md:flex justify-between items-center h-full gap-8'>
      <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
        <Link href={"/"} className='flex items-center gap-3'>
        <Image src={"/logo.png"} alt='logo' width={24} height={24}/>
        <div className='text-2xl tracking-wide' >LAMA</div>
        </Link>
        <div className='hidden xl:flex gap-4'>
        <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>Shop</Link>
          <Link href={"/"}>Deals</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
        </div>
      </div>
        <div className='w-2/3 xl:w-1/2 flex justify-between items-center gap-8'>
          <SearchBar />
          <Navicons />
        </div>
      </div>
    </div>
  )
}

export default Navbar