import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from "next/server";

import prisma from "@/app/lib/prisma";
import { stripe } from "@/app/lib/stripe";
import { absoluteUrl } from "@/app/lib/utils";

const settingsUrl = absoluteUrl("/dashboard");

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // const user = session?.user || 'undefined'

    
    const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string
        }
      })

  const userId = user?.id

    // if (!session?.user?.email) {
    //   return false;
    // }
  
    // const { userId } = auth();
    // const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

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
              name: "Companion Pro",
              description: "Create Custom AI Companions"
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};