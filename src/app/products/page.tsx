'use client'

// import {sub_plans} from '../../products/add-product/prices'
import { useState, useEffect, use } from 'react'
import Card from '../components/Card'
import { Loader } from 'lucide-react'
import { getProducts } from '../actions/getProduct/getProduct'
import { getUser } from '../actions/UserActions/OperationsOnUser'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../Context/store'
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
    const { toPass, setToPass } = useGlobalContext()
    // const [selectedProduct, setSelectedProduct] = useState<any>({})
    // const [category, setCategory] = useState<string>('options')
    const [products, setProducts] = useState<any[]>([])
    // const [user, setUser] = useState<any>({})
    const router = useRouter()

    const handleSend = ({description, name, productId, duration, durationPrice, licensePrice }: {
       description:string, name: string, productId: string, duration: number, durationPrice: number, licensePrice: number
    }) => {
        setToPass((toPass: any) => ({ ...toPass,description:description, duration: duration, licensePrice: licensePrice, name: name, durationPrice: durationPrice, productId:productId }))
        console.log("toPass", toPass)

        router.push('/products/checkout')
    }
    useEffect(() => {
        async function getCategories() {
            const products = await getProducts();
            const user = await getUser();

            const userCategories: any = user?.categories;

            const selectedCategories = userCategories.map((userCategory: any) => {
                const { productId, categoryType } = userCategory;
                const product = products.find(product => product.id === productId);

                if (product) {
                    const category = product.categories.find(category => category.name === categoryType);

                    return {
                        matchedCategory: category,
                        productName: product.name,
                        licensePrice: product.licensePrice,
                        description: product.description
                    };


                }

                return null;
            });

            setProducts(selectedCategories)
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
                        {products?.length ==0?
                           <Loader size={15} />
                           : products?.map((item, key) => {
                                return <div key={key}>
                                    <div>{item?.productName}</div>
                                    <div className='flex flex-wrap gap-4'>

                                        <div className="flex flex-col gap-4"> 1 month:
                                            <div> {item.matchedCategory['oneMonthPrice']}
                                            </div>
                                            <button className='bg-black text-white rounded-md px-4 py-2' onClick={() => handleSend({description:item.description, productId: item.matchedCategory['productId'], durationPrice: item.matchedCategory['oneMonthPrice'], duration: 1, licensePrice: item.licensePrice, name: item.productName})}>Subscribe</button>
                                        </div>
                                        <div className="flex flex-col gap-4"> 3 month:
                                            <div> {item.matchedCategory['threeMonthPrice']}
                                            </div>
                                            <button className='bg-black text-white rounded-md px-4 py-2' onClick={() => handleSend({description:item.description, productId: item.matchedCategory['productId'], durationPrice: item.matchedCategory['threeMonthPrice'], duration: 3, licensePrice: item.licensePrice, name: item.productName })}>Subscribe</button>
                                        </div>

                                        <div className="flex flex-col gap-4"> 6 month:
                                            <div> {item.matchedCategory['sixMonthPrice']}
                                            </div>
                                            <button className='bg-black text-white rounded-md px-4 py-2' onClick={() => handleSend({description:item.description, productId: item.matchedCategory['productId'], durationPrice: item.matchedCategory['sixMonthPrice'], duration: 6, licensePrice: item.licensePrice, name: item.productName })}>Subscribe</button>
                                        </div>

                                        <div className="flex flex-col gap-4"> 1 year:
                                            <div> {item.matchedCategory['OneYearPrice']}
                                            </div>
                                            <button className='bg-black text-white rounded-md px-4 py-2' onClick={() => handleSend({description:item.description, productId: item.matchedCategory['productId'], durationPrice: item.matchedCategory['OneYearPrice'], duration: 12, licensePrice: item.licensePrice, name: item.productName })}>Subscribe</button>
                                        </div>

                                        {/* <div>3 month:  {item.matchedCategory['threeMonthPrice']}
                                        </div> 
                                        <div>6 month:  {item.matchedCategory['sixMonthPrice']}
                                        </div> 
                                        <div>1 year:  {item.matchedCategory['oneYearPrice']}
                                        </div>  */}

                                        {/* {Object.entries(item?.matchedCategory).map(([k,v])=>{
                                    if()
                                    return <Card k={k} v={v}/>
                                })} */}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default page