'use client';

import React, { useEffect, useState } from 'react';
import { signUp } from '../actions/users/signUp';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


const SignInForm = () => {
    const router = useRouter();

    const { status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setMessage('Signing in...');

        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!signInResponse || signInResponse.ok !== true) {
                setMessage("Invalid credentials");
            } else {
                router.refresh();
            }

        } catch (err) {
            console.log(err);
        }

        setMessage(message);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
        }
    }, [status]);

    return (
        <div className=' border-2 min-w-[350px] h-[500px] w-[35%] m-auto rounded-md bg-zinc-50 shadow-md flex p-4 flex-col gap-4 items-center justify-center absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]'>
            <div className='text-center'>Sign in</div>
            <form className="flex p-4 flex-col gap-4">
                <input className='rounded-md border-2 w-[300px] h-[50px] m-auto p-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='email' />
                <input className='rounded-md border-2 w-[300px] m-auto h-[50px] p-2' type='password' value={password} placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} required />
                <div>{message}</div>
                <button className='flex p-2 justify-center bg-black text-white w-[100px] rounded-md m-auto' onClick={(e) => handleSubmit(e)}>Sign in </button>
            </form>

            <div className='text-center'>Create new Account? <Link href='/auth/signup'>Sign up</Link></div>
        </div>
    );
};

export default SignInForm;
