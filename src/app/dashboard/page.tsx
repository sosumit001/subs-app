import { Plus } from "lucide-react"
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <>
      <div className="h-screen">
        
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

        <div className="flex gap-4 justify-between">
          <div className="overflow-y-scroll h-[100px] w-[50%]">
            Users
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>
          </div>
          <div className="overflow-y-scroll h-[100px] w-[50%] ">
            Products
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>
            <div>product</div>

          </div>

        </div>
      </div>


    </>
  )
}

export default DashboardPage