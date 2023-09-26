'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { stripe } from "@/app/lib/stripe"
import { absoluteUrl } from "@/app/lib/utils"
import { getServerSession } from 'next-auth/next'
import { NextResponse } from "next/server";
// import { useGlobalContext } from "@/app/Context/store";

const settingsUrl = absoluteUrl("/dashboard");

async function getCheckoutUrl(toPass: any,num:number, mode:string) {
  // const { toPass } = useGlobalContext()

  const session = await getServerSession(authOptions);
  // const user = session?.user || 'undefined'


  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  })

  const userId = user?.id

  console.log('userId', userId)

  // if (!session?.user?.email) {
  //   return false;
  // }

  // const { userId } = auth();
  // const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      stripePriceId:""
    }
  })

  console.log('userSubs', userSubscription)

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: 'http://localhost:3000/dashboard'
       
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  }

  if(mode == "subscription") {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode:"subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: toPass.name,
              description: " - " + toPass.description 
            },
            unit_amount: toPass.durationPrice*100,
            recurring: {
              interval: "month",
              interval_count:toPass.duration
            },
          
          },
          
          quantity: num,
        },
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: 'license',
              description: " - " + toPass.description 
            },
            unit_amount: toPass.licensePrice*100,
          },
          
          quantity: num,
        },
        
      
      ],
      
    
      metadata: {
        userId,
      },
    })
  
    return stripeSession.url;
  } else {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode:"payment",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: toPass.name,
              description: " - " + toPass.description 
            },
            unit_amount: toPass.durationPrice*100,
          
          },
          
          quantity: num,
        },
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: 'license',
              description: " - " + toPass.description 
            },
            unit_amount: toPass.licensePrice*100,
          },
          
          quantity: num,
        },
        
      
      ],
       
      
    metadata: {
    productId:toPass.productId,
    },
   
    })
  
 return stripeSession.url;

  }

  


  //   } catch (error) {
  //     console.log("[STRIPE]", error);
  //     return new Error('error')
  //   }
  // const successUrl = absoluteUrl("/success"); // Set your success URL
  // const cancelUrl = absoluteUrl("/cancel");   // Set your cancel 
  // const authSession = await getServerSession(authOptions)

  // const user = await prisma.user.findUnique({
  //     where:{
  //         email: authSession?.user?.email as string
  //     }
  // })



  // const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ['card'],

  //     line_items: [{

  //             price_data: {

  //               currency: "USD",
  //               product_data: {
  //                 name: "Companion Pro",
  //                 description: "Create Custom AI Companions"

  //               },
  //               unit_amount: 99,
  //               recurring: {
  //                 interval: "month",
  //                 interval_count: 1

  //               },


  //             },


  //             quantity: 1,

  //     },{

  //         price_data: {
  //           currency: "USD",
  //           product_data: {
  //             name: "license",
  //             description: "License Selected for "

  //           },
  //           unit_amount: 130,

  //         },

  //         quantity: 1,

  // }],
  //     metadata: {
  //         user.id

  //     },

  //     mode: 'subscription',
  //     success_url: absoluteUrl('/dashboard'),
  //     cancel_url: absoluteUrl('/dashboard'),
  //     shipping_address_collection : undefined
  // });



  // Return the URL of the session
}
export default getCheckoutUrl