'use client'

// import {sub_plans} from '../../products/add-product/prices'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getProducts } from "../actions/getProduct/getProduct"
import { Loader } from 'lucide-react'



const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
const time = ['1month', '3month', 'semi-annual', 'yearly']
const ProductsName = ['Honey Bee', 'Money Lover', 'Milfy Milk']

function PassSelectedItem(value: string | any) {
    switch (value) {
        case 'oneMonthPrice':
            return '1 month'
        case 'threeMonthPrice':
            return '3 month'
        case 'sixMonthPrice':
            return '6 month'
        case 'OneYearPrice':
            return '1 year'
    }
}
function page() {
    const [selectedProduct, setSelectedProduct] = useState<any>({})
    const [category, setCategory] = useState<string>('options')
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await getProducts();
                setProducts(res)
                setSelectedProduct(res[0])
                setCategory(res[0]?.categories[0]?.name)
                console.log('Fetched products:', res);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    console.log(category, products)

    return (
        <div className="max-w-5xl m-auto p-4">

            <div className=' '>

                
            <div className=' p-4 border-2 rounded-md bg-gray-950 text-white '>
                    <div className='my-4 text-center font-semibold '>Products</div>
                    <ul className='list-none flex gap-4 justify-center items-center'>
                        {/* adjust time with only what is given and not based on key index */}
                        {products?.length ?
                            products?.map((item, key) =>
                                <li onClick={() => setSelectedProduct(item)} key={key} className='cursor-pointer border-b-2 py-2'>{item.name}</li>
                            ) :
                            <><Loader className='text-center' size={20} /></>
                        }

                    </ul>
                </div>


                <div className='p-4 border-2 rounded-md' >

                    <div className='flex justify-between '>
                        <span className='font-bold'>{selectedProduct?.name}</span>

                        <div><span className='text-sm mr-2'>select category:</span>
                            <select onChange={(e) => setCategory(e.target.value)} className=' border-2 rounded-md p-2 max-w-[100px]' >
                                <option value=""></option>
                                {selectedProduct?.name && selectedProduct?.categories?.map((item: any, i: number) => Object.entries(item).map(([k, v]: [k: string, v: any]) => {
                                    if (k == 'name') return <option key={v} className='border-2 bg-slate-100' value={v}>{v}</option>
                                }))}
                            </select>
                        </div>
                    </div>

                    <div className='flex justify-end font-semibold py-8'>
                        billed-monthly
                    </div>

                    <div className=" rounded-md">

                        {selectedProduct?.name ? <div className='flex flex-wrap ] items-center justify-between w-[100%]  p-4'>
                            {selectedProduct?.name && selectedProduct?.categories?.map((item: any, i: number) => {
                                if (item.name == category)
                                    return Object.entries(item).map(([k, v]: [k: string, v: any]) => {
                                        if (k !== 'id' && k !== 'productID' && k !== 'name') {
                                            return <Card licensePrice={selectedProduct.licensePrice} name={selectedProduct.name} key={v} time={PassSelectedItem(k)} price={v} />
                                        }

                                    })
                            }
                            )}
                        </div> :
                            <>
                                <Loader size={20} />
                            </>}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default page