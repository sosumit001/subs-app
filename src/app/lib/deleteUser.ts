import prisma from "./prisma";

export async function deleteUser(userId : string) {

	const user = await prisma.user.delete({
		where: {
			id : userId
		}
	})

	return user

}