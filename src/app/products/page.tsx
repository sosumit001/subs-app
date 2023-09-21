import { Plus } from 'lucide-react'
import Link from 'next/link'

function page() {
  return (
    <div className="max-w-5xl m-auto p-4">

      <div className='flex gap-8'>
        <div className='flex gap-4'>
          <span>Add Product </span>
          <Link className='cursor-pointer w-[30px] h-[30px] rounded-full bg-zinc-900 grid place-content-center shadow-lg' href={'/products/add-product'}><Plus color='white' size={20} /></Link>
        </div>
        <div className='flex gap-4'>
          <span>Add User</span>
          <Link className='cursor-pointer w-[30px] h-[30px] rounded-full bg-zinc-900 grid place-content-center shadow-lg' href={'/products/add-user'}><Plus color='white' size={20} /></Link>
        </div>
      </div>


         <div>
          
         </div>

    </div>
  )
}

export default page