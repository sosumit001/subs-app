'use server'

import prisma from '@/app/lib/prisma';

export async function getProducts() {
  const products = await prisma.products.findMany();

  return products;
}
