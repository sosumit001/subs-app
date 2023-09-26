'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getUser } from '../actions/UserActions/OperationsOnUser'
import getCheckoutUrl from '../actions/getCheckoutUrl/getCheckout'
import { getSubscribedProducts, getProductsUsingArray } from '../actions/getProduct/getProduct'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'




function page() {
    const [userid, setUserId] = useState<any>()
    const [subproducts, setSubproducts] = useState<any[]>([])
    const [finalProducts, setFinalProducts] = useState<any[]>([])

    useEffect(() => {
        async function getUserId() {
            const user = await getUser()
            setUserId(user?.id)
        }

        getUserId()

    }, [])

    useEffect(() => {
        async function getSubProducts() {
            const sp = await getSubscribedProducts(userid)
            setSubproducts(sp)
        }

        getSubProducts()

    }, [userid])

    useEffect(() => {
        async function getProducts() {
            const sp = await getProductsUsingArray(subproducts)
            setFinalProducts(sp)
        }

        getProducts()

    }, [subproducts])

    const handlePortal = async(id:any) =>{
        const url = await getCheckoutUrl('a', 'b', 'c', id);  
        window.location.href = url 
    }

    // console.log(userid, subproducts, finalProducts)

    return (
        <>
            <div className='flex gap-4 w-[100%]'>
                {finalProducts.length == 0 ? <Loader />
                    // <div className='text-center '>
                    //     <Image className='m-auto' src={'/empty-box.svg'} width={400} height={300} objectFit='cover' alt='nothing' />
                    //     <button className='px-4 py-2 bg-black text-white rounded-md'>Explore Products</button>
                    // </div>
                    : <>
                        {finalProducts?.map((item: any, key: number) => {
                            return <div key={key} className='flex flex-col gap-4 items-center justify-center w-[200px] h-[150px] border-2 rounded-md'>
                                <div>{item.name}</div>
                                <button onClick={() => handlePortal(item.id)} className='px-4 py-2 bg-black text-white rounded-md'>Manage</button>
                            </div>
                        })}
                    </>

                }
            </div>
        </>
    )
}

export default page