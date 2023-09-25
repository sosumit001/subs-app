'use server'
import bcrypt from 'bcryptjs'
import prisma from "./prisma"
async function addUser( email: string, password: string, categories: any ) {

	const passwordHash = bcrypt.hashSync(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			passwordHash,
			categories: {
				create: categories.map(category => ({
					productId : category.productId,
					categoryType: category.categoryType
				}))
			}
		}
	})

	return user
}
