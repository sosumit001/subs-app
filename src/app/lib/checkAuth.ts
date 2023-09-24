import {redirect} from 'next/navigation'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function checkAuth(){
    const session = await getServerSession(authOptions)
    console.log(session)
    if(!session) {
        redirect('/api/auth/signin')
    }
    else {redirect('/dashboard')
}
    // const user = prisma.user.findFirst({
    //     where: 
    // })

}

// export checkAuth;