"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Pagination = ({currentPage , hasPrev, hasNext}: {currentPage:number , hasPrev:boolean, hasNext:boolean}) => {
  const pathName = usePathname()
  const searchPrams = useSearchParams() 
  const { replace } = useRouter()

  const currentPageUrl =(pageNumber:number) => {
    const params = new URLSearchParams(searchPrams)
    params.set("page" , pageNumber.toString())
    replace(`${pathName}?${params.toString()}`)
  }
  return (
    <div className='mt-12 flex justify-between w-full'>
        <button className='rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200' disabled={!hasPrev} onClick={() => currentPageUrl(currentPage - 1)}>Previous</button>
        <button className='rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200' disabled={!hasNext} onClick={() => currentPageUrl(currentPage + 1)}>Next</button>
    </div>
  )
}

export default Pagination