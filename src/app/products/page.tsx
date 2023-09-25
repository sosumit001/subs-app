'use client'

// import {sub_plans} from '../../products/add-product/prices'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { Loader } from 'lucide-react'
import { getProducts } from '../actions/getProduct/getProduct'
import { getUser} from '../actions/UserActions/OperationsOnUser'



// const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
// const time = ['1month', '3month', 'semi-annual', 'yearly']
// const ProductsName = ['Honey Bee', 'Money Lover', 'Milfy Milk']

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
    const [user, setUser] = useState<any>({})

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

        async function fetchUser() {
            try {
                const res = await getUser();
                setUser(res)
                console.log('Fetched users:', res);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        
        fetchUser()
        fetchProducts();
    }, []);

    console.log(category, products)

    return (
        <div className="max-w-5xl m-auto p-4">

            <div >
                {/* <div className='p-4 border-2 rounded-md bg-gray-950 text-white'>

                    <div className='my-4 text-center font-semibold '>Products</div>
                    <ul className='list-none flex gap-4 justify-center items-center'>
                        
                        {products?.length ?
                            products?.map((item, key) =>
                                <li onClick={() => setSelectedProduct(item)} key={key} className={`cursor-pointer border-b-2 py-2`}>{item.name}</li>
                            ) :
                            <><Loader className='text-center' size={20} /></>
                        }

                    </ul>
                </div> */}


                <div className='p-4 border-2 rounded-md' >

                    <div className=" rounded-md">

                     
                    </div>

                </div>

            </div>

        </div>
    )
}

export default page