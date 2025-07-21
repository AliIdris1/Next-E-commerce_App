'use client'
import { products } from '@wix/stores'
import React, { useEffect, useState } from 'react'
import Add from './Add'

type Props = {}

const CustomizeProducts = ({productid, variants, productOptions}: {productid:string, variants:products.Variant[], productOptions:products.ProductOption[]}) => {
  const [selectedOption, setselectedOption] = useState<{
    [key: string]: string
  }>({})

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>()

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if(!variantChoices) return false
      return Object.entries(selectedOption).every(
        ([key, value]) => variantChoices[key] == value
      )
    }) 
    setSelectedVariant(variant)
  },[selectedOption , variants])

  const handleOptionselect =(optionType:string, choice:string) => {
    setselectedOption((prev => ({...prev , [optionType]:choice}) ))
  }

  const isVariantinStock = (choices:{[key:string]: string}) => {
    return variants.some((variant) => {
      const VariantChoices = variant.choices
      if(!VariantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key , value]) => VariantChoices[key] == value
        ) && variant.stock?.inStock && variant.stock.quantity && variant.stock.quantity > 0
      )
    })
  }
  return (
    <div className='flex flex-col gap-6'>
      {
        productOptions?.map((option) => (

          <div className='flex flex-col gap-4' key={option.name}>
            <h4 className='font-medium'>{option.name}</h4>
            <ul className='flex items-center gap-3'>
          {option.choices?.map((choice) => {
            const disabled = isVariantinStock({...selectedOption, [option.name!]: choice.description!})

            const selected = selectedOption[option.name!] === choice.description
            
            const clickHandler = disabled
                ? undefined
                : () => handleOptionselect(option.name!, choice.description!);
            return option.name == "Color" ? (<li key={choice.value} className='w-8 h-8 rounded-full ring-1 ring-gray-300  relative' style={{backgroundColor:choice.value, cursor: disabled ? "not-allowed" : "pointer"}} onClick={clickHandler}>
              {selected && <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>}
              {disabled && <div className='absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>}
          </li>) : (<li key={choice.value} className='ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm ' style={{cursor: disabled ? "not-allowed" : "pointer" , backgroundColor: selected ? "#f35c7a" : disabled ? "#FBCFE8" : "white", color: selected || disabled ? "white" : "#f35c7a", boxShadow: disabled ? "none" : ""}} onClick={clickHandler}>{choice.description}</li>)
          })}
          </ul>
        </div>
        ))
        }
        <Add productId={productid} variantId={selectedVariant?._id || "00000000-0000-0000-0000-00000000000"} stockNumber={selectedVariant?.stock?.quantity || 0}  />
        {/*COLOER */}
        {/* 
        <ul className='flex items-center gap-3'>
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500'>
                <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
            </li>
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500'>
            </li>
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500'>
            <div className='absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
            </li>
        </ul> */}
        {/* OTHERS */}
        {/* <h4 className='font-medium'>Choose a size</h4>
        <ul className='flex items-center gap-3'>
            <li className='ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer'>Small</li>
            <li className='ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer'>Medium</li>
            <li className='ring-1 ring-pink-200 bg-pink-200 text-white rounded-md py-1 px-4 text-sm cursor-not-allowed'>Large</li>
        </ul> */}
    </div>
  )
}

export default CustomizeProducts