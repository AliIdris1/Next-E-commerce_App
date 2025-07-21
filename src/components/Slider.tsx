"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const slides = [
    {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];


type Props = {}

const Slider = (props: Props) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
    const intarvel = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0: prev + 1 ))
    }, 3000)

    return () =>  clearInterval(intarvel)
    }, [])
    
return (
    <div className='h-[calc(100vh-80px)] overflow-hidden relative'>
        <div className='w-max h-full flex transition-all ease-in-out duration-1000'
        style={{transform:`translateX(-${current * 100}vw)`}}
        >
            {slides.map((slide) => (
                <div className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`} key={slide.id}>
                    <div className='h-1/2 xl:w-1/2 xl:h-full flex items-center justify-center flex-col gap-8 2xl:gap-12 text-center'>
                        <h2 className='text-xl lg:text-3xl 2xl:text-8xl font-semibold'>{slide.description}</h2>
                        <h1 className='text-5xl lg:text-6xl 2xl:text-8xl font-semibold'>{slide.title}</h1>
                        <Link href={slide.url}><button className='rounded-md bg-black text-white py-3 px-4'>SHOP NOW </button></Link>
                    </div>
                    <div className='h-1/2 xl:w-1/2 xl:h-full relative'>
                        <Image src={slide.img} alt='a' fill sizes='100%' className='object-cover'/>
                    </div>
                </div>
            ))}
        </div>
        <div className='absolute bottom-8 left-1/2 m-auto flex gap-4'>
            {slides.map((slide, index) => (
                <div className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex justify-center items-center ${current == index ? "scale-150" : ""}`}
                key={slide.id}
                onClick={() => setCurrent(index)}
                >
                    {current == index && (
                        <div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
                    )}
                </div>
            ))}
            
        </div>
    </div>
)
}

export default Slider