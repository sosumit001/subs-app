'use server'

import prisma from '@/app/lib/prisma';

export async function getUsers() {
  const products = await prisma.user.findMany();

  return products;
}
