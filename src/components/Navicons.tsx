'use client'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CartModel from './CartModel';
import Link from 'next/link';
import { useWixClient } from '@/hooks/useWixClient';
import Cookies from 'js-cookie';
import { useCartStore } from '@/hooks/useCartStore';

type Props = {}

const Navicons: React.FC<Props> = () => {
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const wixClient = useWixClient();
  const isLogedin = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLogedin) {
      router.push("/login");
    } else {
      setisProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setisLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setisLoading(false);
    setisProfileOpen(false);
    router.push(logoutUrl);
  };

  const { getCart, cart, counter } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      <Image src={"/profile.png"} width={22} height={22} alt='Profile' className='cursor-pointer' onClick={handleProfile} />
      {isProfileOpen && (
        <div className='absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-md z-20'>
          <Link href={"/Profile"}>Profile</Link>
          <div className='mt-2 cursor-pointer' onClick={handleLogout}>{isLoading ? "Logging out" : "Logout"}</div>
        </div>
      )}
      <Image src={"/notification.png"} width={22} height={22} alt='notification' className='cursor-pointer' />
      <div className='cursor-pointer relative' onClick={() => setisCartOpen(!isCartOpen)}>
        <Image src={"/cart.png"} width={22} height={22} alt='cart' />
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-sm text-white flex items-center justify-center'>{counter}</div>
      </div>
      {isCartOpen && <CartModel />}
    </div>
  );
}

export default Navicons;
