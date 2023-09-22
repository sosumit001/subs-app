'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
// import {sub_plans} from '../../products/add-product/prices'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getProducts } from "../actions/getProduct/getProduct"



const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
const time = ['1month', '3month', 'semi-annual', 'yearly']
const ProductsName = ['Honey Bee', 'Money Lover', 'Milfy Milk']
function page() {
  const [selectedProduct, setSelectedProduct] = useState<any>({})
  const [category, setCategory] = useState<string>('options')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts();
        setProducts(res)
        console.log('Fetched products:', res);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);
  
  return (
    <div className="max-w-5xl m-auto p-4">

      <div className='flex gap-2'>

        <div className='w-[70%] p-4 border-2 rounded-md ' >

          <div className='flex justify-between'>
            <span className='font-bold'>{selectedProduct?.name}</span>

            <div><span className='text-sm mr-2'>select category:</span>
              <select onChange={(e) => setCategory(e.target.value)} className='border-2 rounded-md p-2 max-w-[100px]' >
                <option value=""></option>
                {categories.map((item, key) => <option key={key} className='border-2 bg-slate-100' value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className='flex justify-end font-semibold py-8'>
            billed-monthly
          </div>

          <div className="overflow-hidden rounded-md bg-zinc-100">
            <div className='flex gap-8 items-center h-[70vh] w-[100%] overflow-x-scroll p-4'>
            {selectedProduct?.name && selectedProduct?.categories?.map((item: any, key : number)=> <Card key={key} time={time[key]} price={item} />)}
            </div>
        </div>

        </div>

        <div className='w-[30%] p-4 border-2 rounded-md '>
          <div className='my-4 text-center font-semibold '>Products</div>
          <ul className='list-none flex flex-col gap-4 justify-center items-center'>
            {products?.map((item, key) =>
              <li onClick={() => setProducts(item)} key={key} className='border-b-2 py-2'>{item.name}</li>
            )}

          </ul>
        </div>
      </div>

    </div>
  )
}

export default page