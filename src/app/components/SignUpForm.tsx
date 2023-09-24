'use client';

import React, { useState } from 'react';
import { signUp } from '../actions/users/signUp';
import { Loader } from 'lucide-react';
import Link from 'next/link'

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const error = ['minimum length of 8 characters', 'one uppercase letter', 'one special character', 'atleast one number', 'atleast one lowercase letter']

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (emailRegex.test(email) && passwordRegex.test(password)) {
            setToggle(true);
            setMessage('...')
            const message = await signUp(email, password);
            setToggle(false)
            setMessage(message);
            window.location.href = '/auth/signin'
        }
        else {

            alert('please fill the form correctly')
        }
    };

    return (
        <div className=' border-2 min-w-[350px] h-[500px] w-[35%] m-auto rounded-md bg-zinc-50 shadow-md flex p-4 flex-col gap-4 items-center justify-center absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]'>
            <div className='text-center'>Sign up</div>
            <form className="flex p-4 flex-col gap-4">
                <input className='rounded-md border-2 w-[300px] h-[50px] m-auto p-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='email' />
                <input className='rounded-md border-2 w-[300px] m-auto h-[50px] p-2' type='password' value={password} placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} required />
                <div className='text-center'>
                    {error.map((item, key) => <div key={key} className='text-center text-red-600 mr-2 text-sm'>
                        {item}</div>)}
                </div>
                <div>{message}</div>
                <button className='flex p-2 justify-center items-center bg-black text-white w-[100px] rounded-md m-auto' onClick={(e) => handleSubmit(e)}>Sign up {toggle && <Loader color='white' size={15} />}</button>
            </form>
              
            <div className='text-center'>Already have an account? <Link href='/auth/signin'>Sign in</Link></div>
        </div>
    );
};

export default SignUpForm;
