'use server'

import prisma from '@/app/lib/prisma';

export async function getProducts() {
  const products = await prisma.products.findMany({
    include: {
      categories: true, // Include associated categories in the result
    },
  });

  return products;
}
