'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Productimages = ({ items }: {items: any}) => {
  const [index, setindex] = useState(0)
  return (
    <div>
      <div className='h-[500px] relative'>
        <Image src={items[index].image?.url} alt='pro' fill sizes='50vw' className='object-cover rounded-md'/>
      </div>

      <div className='flex justify-between gap-4'>
      {items.map((item: any, idx: number) => 
      <div key={item.id} className='cursor-pointer w-1/4 h-32 relative gap-4 mt-8' onClick={() => setindex(idx)}>
        <Image src={item.image.url} alt='pro' fill sizes='30vw' className='object-cover rounded-md'/>
      </div>
      )}
      </div>
    </div>
  )
}

export default Productimages
