import SignInForm from '@/app/components/SignInForm'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='max-w-5xl m-auto w-full px-4  h-screen'>
        <h1 >
            Sign In
        </h1>
        <SignInForm />
    </div>
  )
}

export default SignInPage