import { wixClientServer } from '@/lib/wixClientServer'
import { products } from '@wix/stores'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import  DOMPurify  from 'isomorphic-dompurify'
import Pagination from './Pagination'
type Props = {}

const PRODUCT_PER_PAGE = 20;

const ProdustList = async ({categoryId , limit , searchParams}:{categoryId:string ; limit?:number ; searchParams?:any}) => {

    const wixClient = await wixClientServer();
    
    // Initialize base query
    let productQuery = wixClient.products.queryProducts()
        .startsWith("name", searchParams?.name || "")
        .eq("collectionIds", categoryId)
        .hasSome("productType", [searchParams?.type || "physical", "digital"])
        .gt("priceData.price", searchParams?.min || 0)
        .lt("priceData.price", searchParams?.max || 99999);

    // Apply sorting if specified
    if(searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(" ");

        // Reassign the query with sorting applied
        if(sortType === "asc") {
            productQuery = productQuery.ascending(sortBy);
        } else if(sortType === "desc") {
            productQuery = productQuery.descending(sortBy);
        }
    }

    // Apply pagination after sorting
    productQuery = productQuery
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0);

    const res = await productQuery.find();
return (
    <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap mt-12'>
        {res.items.map((product: products.Product) => (
        <Link href={"/"+product.slug} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]' key={product._id}>
        <div className='relative h-80 w-full'>
            <Image
            src={product.media?.mainMedia?.image?.url || "product.png"}
            alt='kk'
            fill 
            sizes='25vw'
            className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
            />
            <Image
            src={product.media?.mainMedia?.image?.url || "product.png"} 
            alt='kk'
            fill
            sizes='25vw'
            className='absolute object-cover rounded-md'
            />
        </div>
        <div className='flex justify-between'>
            <span className='font-medium'>{product.name}</span>
            <span className='font-semibold'>{product.price?.price}$</span>
        </div>
        {
            product.additionalInfoSections && (
        <div className='text-sm text-gray-500'  dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
            product.additionalInfoSections.find(
                (section: any) => section.title === "shortDesc"
            )?.description || ""
            ),
        }}></div>
            )
        }
        <button className=' w-max rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white transition-all duration-500'>Add Cart</button>
        </Link>
        ))}
        <Pagination currentPage={res.currentPage || 0} hasPrev={res.hasPrev()} hasNext={res.hasNext()} />
    </div>
  )
}

export default ProdustList