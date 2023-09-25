'use client'

import { Plus, Trash2 } from "lucide-react"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { getProducts } from "../../actions/getProduct/getProduct"
import { getUsers } from "../../actions/getUsers/getUsers"
import { useRouter } from 'next/navigation'
import { Loader } from "lucide-react"

const admin = true
const DashboardPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loader, setLoader] = useState(true)
  const [loader1, setLoader1] = useState(true)
  const [toggle, setToggle] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts();
        setLoader(false)
        setProducts(res)
        console.log('Fetched products:', res);
      } catch (error) {
        setLoader(true)
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getUsers();
        setLoader1(false)
        setUsers(res)
        console.log('Fetched products:', 'users', res);
      } catch (error) {
        setLoader1(true)
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  // function toggleboards(value : string){
  //     if()
  // }

  if (!admin) {
    return <div>404: NOT FOUND</div>
  }

  return (
    <>
      <div className="h-screen">

        <div className="flex gap-2">
          <span onClick={()=>setToggle((toggle=>!toggle))} className="border-2 px-4 py-2 rounded-md">Users / Products</span>
        </div>


     <div className="flex gap-4 justify-between my-4">
         {toggle ? 
        <div className="overflow-y-scroll h-[500px] w-[100%] p-4 border-2">
          <div className='flex gap-4'>Users
            <span>Add User </span>
            <Link className='cursor-pointer w-[30px] h-[30px] rounded-full bg-zinc-900 grid place-content-center shadow-lg' href={'/admin/products'}><Plus color='white' size={20} /></Link>
          </div>
          {users?.length > 0 ? users?.map((item, key) => {
            return <div key={key} className="flex mb-2 mt-4 justify-between p-4 border-2 shadow-md rounded-md"><Link href={'/admin/products'}>{item.email}</Link> <Trash2 className="cursor-pointer" color='grey' size={20} /> </div>
          }) : <>{loader1 && <Loader size={15} />}</>}
        </div>
        :
        <div className="overflow-y-scroll h-[500px] w-[100%] p-4 ">
          <div className='flex gap-4'>Products
            <span>Add Products</span>
            <Link className='cursor-pointer w-[30px] h-[30px] rounded-full bg-zinc-900 grid place-content-center shadow-lg' href={'/admin/products/add-user'}><Plus color='white' size={20} /></Link>
          </div>
          {products?.length > 0 ? products?.map((item, key) => {
            return <div key={key} className="flex mb-2 mt-4 justify-between p-4 border-2 shadow-md rounded-md"><Link href={'/admin/products'}>{item.name}</Link> <Trash2 className="cursor-pointer" color='grey' size={20} /> </div>

          }) : <>{loader && <Loader size={15} />}</>}
        </div>
}
      </div>
      </div>


    </>
  )
}

export default DashboardPage