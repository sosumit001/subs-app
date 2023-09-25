import Image from 'next/image'
import Link from 'next/link'
import { checkSubscription } from '../lib/subscription'
import prisma from '../lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'



async function page() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })

    const Customer = await prisma.userSubscription.findFirst({
        where: {
            userId: user?.id 
        }
    })

    const data =  await stripe.prices.retrieve(
         Customer?.stripePriceId as string
      )

      console.log(data, 'data')


    const isSubscription = await checkSubscription()
    return (
        <>
            {!isSubscription ? <div className=''>
                <Image className='m-auto' src="/empty-box.svg" width={500} height={500} objectFit='cover' alt="empty" />
                <div className='text-center'><Link href='/products' className='border-2 bg-black text-white px-4 py-2 rounded-md'>Explore Products</Link></div>
            </div> :
                <div>




                </div>


            }


        </>
    )
}

export default page