"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const Menu = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
    <Image src={"/menu.png"} width={28} height={28} className='cursor-pointer' alt='menu' onClick={() => setOpen(!open)}/>
    {
      open && (
        <div className='absolute bg-black text-white top-20 left-0 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10'>
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>Shop</Link>
          <Link href={"/"}>Deals</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>Logout</Link>
          <Link href={"/"}>Cart(1)</Link>
        </div>
      )
    }
    </div>
  )
}

export default Menu