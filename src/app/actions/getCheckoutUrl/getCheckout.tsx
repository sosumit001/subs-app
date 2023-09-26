'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { stripe } from "@/app/lib/stripe"
import { absoluteUrl } from "@/app/lib/utils"
import { getServerSession } from 'next-auth/next'
import { NextResponse } from "next/server";
// import { useGlobalContext } from "@/app/Context/store";

const settingsUrl = absoluteUrl("/dashboard");

async function getCheckoutUrl(toPass: any, mode: string, licenseNum:any) {
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



  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      productId: toPass.productId
    }
  })

  console.log('userSubs', userSubscription)

  if (userSubscription && userSubscription.stripeCustomerId) {
    console.log("/??")
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: 'http://localhost:3000/dashboard'

    })

    return stripeSession.url
  }

  // console.log(mode, toPass.)

  console.log("?")
  if (mode == "subscription") {
    console.log('insubs')
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
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
            unit_amount: toPass.durationPrice * 100,
            recurring: {
              interval: "month",
              interval_count: toPass.duration
            },

          },

          quantity: licenseNum,
        },
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: 'license',
              description: " - " + toPass.description
            },
            unit_amount: toPass.licensePrice * 100,
          },

          quantity: licenseNum,
        },


      ],


      metadata: {
        userId,
        productId: toPass.productId,
      },
    })

    return stripeSession.url;
  }
  
  console.log("mode", mode)

  if (mode == "payment") {
    console.log("inpay")
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "payment",
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
            unit_amount: toPass.durationPrice * 100,

          },

          quantity: licenseNum,
        },
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: 'license',
              description: " - " + toPass.description
            },
            unit_amount: toPass.licensePrice * 100,
          },

          quantity: licenseNum,
        },


      ],


      metadata: {
        userId: userId,
        productId: toPass.productId,
      },
    })

    return stripeSession.url;
  }
  
  console.log("outoutout")

}

export default getCheckoutUrl;