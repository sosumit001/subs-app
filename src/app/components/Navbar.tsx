import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className='max-w-5xl m-auto w-full px-4 py-4 flex justify-between font-bold text-base'>
         <Link href='/'>Logo</Link>
         <div className='flex gap-4 items-center text-sm font-semibold'>
            <Link className='flex gap-1 bg-violet-600 text-white p-4 rounded-lg' href='/dashboard'>Dashboard</Link>

            {session && session.user?.email ? (
                <>
                    <Link href='/auth/signout'>Sign out</Link>
                    <p>
                        <b>Signed in as {session.user?.email}</b>
                    </p>
                </>
            ) : (
                <>
                    <Link href='/auth/signin'>Sign in</Link>
                    <Link href='/auth/signup'>Sign up</Link>
                </>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
