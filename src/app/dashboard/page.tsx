import Image from 'next/image'
import Link from 'next/link'
import { checkSubscription } from '../lib/subscription'
import { checkAuth } from '../lib/checkAuth'
// import prisma from '../lib/prisma'
// import { authOptions } from '../api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
// import Stripe from 'stripe'
// import { stripe } from '../lib/stripe'
import { getProducts } from '../actions/getProduct/getProduct'



async function page() {
    await checkAuth();
    // const session = await getServerSession(authOptions)

    // if (!session?.user?.email) {
    //     return false;
    // }

    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: session?.user?.email
    //     }
    // })


    // const Customer = await prisma.userSubscription.findFirst({
    //     where: {
    //         userId: user?.id 
    //     }
    // })

    const products = await getProducts()
    // const data =  await stripe.prices.retrieve(
    //      Customer?.stripePriceId as string
    //   )

    //   console.log(data, 'data')

    const isSubscribed = await checkSubscription()

    return (
        <>
            <div>
                {isSubscribed ?
                    <div className='flex gap-5'>
                        {products?.map((item: any, key: number) => {
                            return <div key={key} className=' p-8 flex flex-col gap-4 items-center justify-center rounded-md w-[300px] h-[100px] border-2'>
                                <span>{item.name}</span>
                                <button className='px-4 py-2 rounded-md bg-black text-white'>{!isSubscribed ? 'Subscribe' : 'Manange Subscription'}</button>
                            </div>
                        })}
                    </div>

                    : <>
                    
                        <Image className='m-auto' src="/empty-box.svg" width={500} height={500} objectFit='cover' alt="empty" />
                        <div className='text-center'><Link href='/products' className='border-2 bg-black text-white px-4 py-2 rounded-md'>Explore Products</Link></div>
                        

                    </>}
            </div>
        </>
    )
}

export default page