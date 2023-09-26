'use server'

import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function getProducts() {
  const products = await prisma.products.findMany({
    include: {
      categories:true
    }
  });

  return products;
}


export async function getProductUsingId(productId:any) {
  const products = await prisma.products.findUnique({
      where:{
        id: productId
      }
  });

  return products;
}

export async function getProductCategoriesForUser() {
  // Assuming you have the user's email available in `session`
  const session = await getServerSession(authOptions);
  
  // Find the user along with their categories
  const user = await prisma.user.findUnique({
    include: {
      categories: {
        select: {
          categoryType: true,
        },
      },
    },
    where: {
      email: session?.user?.email as string,
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get an array of category types from the user's categories
  const userCategoryTypes = user.categories.map(category => category.categoryType);

  // Find product categories that are also present in user's categories
  const productCategories = await prisma.productCategory.findMany({
    where: {
      name: {
        in: userCategoryTypes,
      },
    },
  });

  return productCategories;
}