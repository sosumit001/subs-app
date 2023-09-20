import {Plus} from 'lucide-react'
import Link from 'next/link'

function page() {
  return (
    <div className="max-w-5xl m-auto p-4">
      Add new Product 
      <div className='cursor-pointer w-[30px] h-[30px] rounded-full bg-zinc-900 grid place-content-center shadow-lg'><Link href={'/products/add-products'}><Plus color='white' size={20} /></Link>
      </div>
    </div>
  )
}

export default page