import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import prisma from "@/app/lib/prisma"
import { stripe } from "@/app/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });

    }

    const productId = session.metadata.productId;
    const stripePriceId = subscription.items.data[0].price.id
  

    //if the user already has a subscription for this product
    // const existingSubscription = await prisma.userSubscription.findFirst({
    //   where: {
    //     userId: session.metadata.userId,
    //     stripePriceId: stripePriceId,
        
    //   },
    // })
  
    // if (existingSubscription) {
    //   return new NextResponse("User already has a subscription for this product", { status: 400 });
    // }


    // let cancelSchedules = await stripe.subscriptionSchedules.create({
    //   from_subscription: session.subscription as string,
    // })

    // const phases = cancelSchedules.phases.map(phase =>({
    //   start_date: phase.start_date,
    //   end_date: phase.end_date,
    //   items: phase.items
    // }))

    // cancelSchedules = await stripe.subscriptionSchedules.update(
    //   cancelSchedules.id,
    //   {
    //     end_behavior: 'cancel',
    //     phases:[
    //       ...phases,
    //       {
    //         items:[
    //           {
    //             price: subscription.items.data[0].price.id,
    //             quantity: 1
    //           }
    //         ],
    //         iterations: 3,
    //       }
    //     ]


    //   })

    await prisma.userSubscription.create({
      data: {

        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await prisma.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
};