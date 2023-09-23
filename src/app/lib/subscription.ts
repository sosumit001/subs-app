import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma'

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
 const session = await getServerSession(authOptions);
 

  if (!session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email:session?.user?.email 
    }
  })
  const subscription = await prisma.userSubscription.findFirst({
    where: {

        userId :user?.id
    }
  })

  if (!subscription) {
    return false;
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};