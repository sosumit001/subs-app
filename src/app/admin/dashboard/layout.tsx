import { getServerSession } from 'next-auth/next';
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route';
import Navbar from '../../components/Navbar';

interface ProtectedLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email) {
        return (
            <div className='max-w-5xl p-4 m-auto w-full'>
                This is protected and you do not have access to it.
            </div>
        )
    }

  return (

      <div className='max-w-5xl p-4 m-auto w-full'>
        <Navbar/>
        {children}
      </div>

  );
}

export default ProtectedLayout