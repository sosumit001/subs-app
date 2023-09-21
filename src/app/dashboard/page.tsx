'use client'

import { Plus, Trash2 } from "lucide-react"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { getProducts } from "../actions/getProduct/getProduct"

const DashboardPage =  () => {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts();
        setProducts(res)
        console.log('Fetched products:', products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

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

        <div className="flex gap-4 justify-between border-2 my-4">
          <div className="overflow-y-scroll h-[500px] w-[50%] p-4">
            Users
           
            <div className="p-4 border-2 shadow-md rounded-md">user1</div>


          </div>
          <div className="overflow-y-scroll h-[500px] w-[50%] p-4 ">
            Products
            {products?.map((item, key)=>{
              return <div key={key} className="flex mb-2 justify-between p-4 border-2 shadow-md rounded-md"><Link href={'/products'}>{item.name}</Link> <Trash2 className="cursor-pointer" color='grey' size={20} /> </div>
               
            })}
          </div>

        </div>
      </div>


    </>
  )
}

export default DashboardPage