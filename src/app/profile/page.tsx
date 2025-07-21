import { wixClientServer } from '@/lib/wixClientServer';
import React from 'react';

type Props = {}

const ProfilePage = async (props: Props) => {
  const wixClient = await wixClientServer();

  // const user = await wixClient.members.getCurrentMember();


  return (
    <div className='flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 '>
      <div className='w-full md:w-1/2'>User</div>
      <div className='w-full md:w-1/2'>Order</div>
    </div>
  );
};

export default ProfilePage;
