"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const SearchBar = (props: Props) => {


  const router = useRouter()


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string

    if(name) {
      router.push(`/list?name=${name}`)
    }
  }
  return (
    <form className='flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1' onSubmit={handleSearch}>
      <input name='name' type="text" placeholder='Search' className='outline-none flex-1 bg-transparent'/>
      <button className='cursor-pointer'>
        <Image src={"/search.png"} alt='search' width={16} height={16}/>
      </button>
    </form>
  )
}

export default SearchBar