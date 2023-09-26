'use client'

// import {sub_plans} from '../../products/add-product/prices'
import { useState, useEffect, use } from 'react'
import Card from '../components/Card'
import { Loader } from 'lucide-react'
import { getProducts } from '../actions/getProduct/getProduct'
import { getUser } from '../actions/UserActions/OperationsOnUser'
// import {getProductCategoriesForUser} from '@/app/actions/getProduct/getProduct'


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
    // const [selectedProduct, setSelectedProduct] = useState<any>({})
    // const [category, setCategory] = useState<string>('options')
    // const [products, setProducts] = useState<any[]>([])
    // const [user, setUser] = useState<any>({})

    useEffect(() => {
        async function getCategories() {
            const products = await getProducts();
            const user = await getUser();
        
            const userCategories:any = user?.categories;
        
            const selectedCategories = userCategories.map(userCategory => {
                const { productId, categoryType } = userCategory;
                const product = products.find(product => product.id === productId);
        
                if (product) {
                    const category = product.categories.find(category => category.name === categoryType);
                    return {
                        matchedCategory:category,
                        productName:product.name
                    };
                }
        
                return null;
            });
        
            console.log('Selected Categories : ', selectedCategories);
        }
        
        getCategories();
  
    }, []);


    return (
        <div className="max-w-5xl m-auto p-4">

            <div >
                <div>
                    
                    {/* {products?.map((item: any, key: number) => {
                        return <div key={key} onClick={() => setSelectedProduct(item)}>
                            {item.name}
                        </div>
                    })} */}

                </div>



                <div className='p-4 border-2 rounded-md' >

                    <div className=" flex gap-4 flex-wrap rounded-md">
                        {/* {selectedProduct?.categories?.map((item: any, key: number) => {
                             if(item.name == 'A / A-ML')
                            return Object.entries(item).map(([k, v]) => {
                                console.log(k)
                                if (k === 'oneMonthPrice' || k === 'threeMonthPrice' || k === 'sixMonthPrice' || k === 'oneYearPrice') {
                                    return (
                                        <div key={key} className='w-[250px] h-[150px] border-2 rounded-md flex flex-col justify-around p-4 items-center gap-4'>
                                            <div>{PassSelectedItem(k)}</div>
                                            <div>{v.toString()}</div>
                                            <button onClick={} className='bg-black rounded-md px-4 py-2 text-white'>Subscribe</button>
                                        </div>
                                    );
                                }
                                return null;
                            });
                        })} */}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default page