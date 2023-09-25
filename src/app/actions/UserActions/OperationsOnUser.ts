
'use server'
import bcrypt from 'bcryptjs'
import prisma from "../../lib/prisma"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function addUser( form : any) {

	const passwordHash = bcrypt.hashSync(form.password, 10);

	const user = await prisma.user.create({
		data: {
			email: form.email,
			passwordHash,
		
			categories:  {
				create: form.categories.map(category => ({
					productId : category.productId,
					categoryType: category.categoryType
				}))
			}
		}
	})

	return user
}


export async function deleteUser(userId : string) {

	const user = await prisma.user.delete({
		where: {
			id : userId
		}
	})

	return user

}

export async function getUsers() {
	const users = await prisma.user.findMany();
  
	return users;
  }
  
export async function getUser() {
    const session = await getServerSession(authOptions)

	if(!session){return null}

	// const {user} = session;
 
	const user = await prisma.user.findUnique({
		where:{
			email: session?.user?.email as string
		}
	})

	return user

  }

