'use client'

import Image from 'next/image'
import Link from 'next/link'
import { checkSubscription } from '../lib/subscription'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { getUser } from '../actions/UserActions/OperationsOnUser'
import getCheckoutUrl from '../actions/getCheckoutUrl/getCheckout'
import { getSubscribedProducts, getProductsUsingArray } from '../actions/getProduct/getProduct'
import prisma from '../lib/prisma'
import { useEffect, useState } from 'react'



 function page() {
     const [userid, setUserId] = useState<any>()
     const [subproducts, setSubproducts] = useState<any[]>([])
     const [finalProducts, setFinalProducts] = useState<any[]>([])
     
    useEffect(()=>{
       async function getUserId(){
            const user = await getUser()
            setUserId(user?.id)
       }

       getUserId()

    },[])

    useEffect(()=>{
       async function getSubProducts(){
            const sp = await getSubscribedProducts(userid)
            setSubproducts(sp)
       }

       getSubProducts()

    },[userid])

    useEffect(()=>{
       async function getProducts(){
            const sp = await getProductsUsingArray(subproducts)
            setFinalProducts(sp)
       }

       getProducts()

    },[subproducts])

 console.log(userid, subproducts, finalProducts)

    // const session = await getServerSession(authOptions)
    
    // if (!session?.user?.email) {
    //     return false;
    // }

    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: session?.user?.email as string
    //     }
    // })

    // const subscribedProducts = await prisma.userSubscription.findMany({
    //     where:{
    //         userId: user?.id
    //     }
    // })

    // const arrayOfIds = subscribedProducts.map(obj => obj.id);

    // const products = await prisma.products.findMany({
    //     where: {
    //       id: {
    //         in: arrayOfIds,
    //       },
    //     },
    //   });

    // console.log(subscribedProducts)

    // const products = await getProducts()
    // const isSubscribed = await checkSubscription()

    return (
        <>
            <div>
                {/* {isSubscribed ? */}
                    <div className='flex gap-5'>
                        {/* {products?.map((item: any, key: number) => {
                            return <div key={key} className=' p-8 flex flex-col gap-4 items-center justify-center rounded-md w-[300px] h-[100px] border-2'>
                                <span>{item.name}</span>
                                <button className='px-4 py-2 rounded-md bg-black text-white'>Manage</button>
                            </div>
                        })} */}
                    </div>

                    {/* : <>
                    
                        <Image className='m-auto' src="/empty-box.svg" width={500} height={500} objectFit='cover' alt="empty" />
                        <div className='text-center'><Link href='/products' className='border-2 bg-black text-white px-4 py-2 rounded-md'>Explore Products</Link></div>
                        

                    </> */}
            </div>
        </>
    )
}

export default page