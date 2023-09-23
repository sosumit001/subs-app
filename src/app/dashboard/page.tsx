import Image from 'next/image'
import Link from 'next/link'


let userExist = true
function page() {
    return (
        <>
            {userExist ? <div className=''>
                <Image className='m-auto' src="/empty-box.svg" width={500} height={500} objectFit='cover' alt="empty" />
                <div className='text-center'><Link href='/products' className='border-2 bg-black text-white px-4 py-2 rounded-md'>Explore Products</Link></div>
            </div> :
                <div >


                </div>


            }


        </>
    )
}

export default page