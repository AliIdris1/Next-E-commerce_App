// 'use client';
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProdustList";
import Slider from "@/components/Slider";
import { WixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       console.log("Fetching products...");
  //       if (!wixClient) {
  //         throw new Error("wixClient is not initialized");
  //       }
  //       const res = await wixClient.products.queryProducts().find();
  //       console.log(res);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   getProducts();
  // }, [wixClient]);

  const wixClient = await wixClientServer();

  const res = wixClient.products.queryProducts().find();

  console.log(res);
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl mb-11">Featured Products</h1>
        <Suspense fallback={"loading"}>
        <ProductList categoryId={"a9c4cf8e-7728-4694-d104-d49f6c06f6c4"} limit={4}/>
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categories</h1>
        <Suspense fallback={"loading"}>
        <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl mb-11">New Products</h1>
        
        <ProductList categoryId={""} />
      </div>
    </div>
  );
};

export default HomePage;
