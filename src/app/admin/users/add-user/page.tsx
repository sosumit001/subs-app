'use client'

import { useState, useEffect, useRef } from 'react'
// import { sub_plans } from './prices'
// import { addProduct } from '@/app/actions/addProduct/addProduct'
import { getProducts } from '@/app/actions/getProduct/getProduct'

// import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'


interface Form {
    email: string,
    password: string,
    categories: Category[]
}

interface Category {
    productId: string,
    categoryType: string
}

const error = ['minimum length of 8 characters', 'one uppercase letter', 'one special character', 'atleast one number', 'atleast one lowercase letter']

function Page() {
    // const router = useRouter()
    const [toggle, setToggle] = useState<boolean>(false)
    const [loader, setLoader] = useState<string>('Add Product')
    const [products, setProducts] = useState<any>([])
    // const [categoryType, setCategoryType] = useState<string>('options')
    // const checkboxesRef = useRef<(HTMLInputElement[] | null)>([]);

    const [form, setForm] = useState<Form>({
        email: '',
        password: '',
        categories: []
    })

    useEffect(() => {
        const getProductItems = async () => {
            const res = await getProducts()
            console.log(res)
            setProducts(res)
        }
        getProductItems()

    }, [])

    console.log(form)
    return (
        <div className="max-w-5xl m-auto p-4 h-full">
            <div className='text-center font-bold'>Add User</div>
            <form className='w-[50%] m-auto border-2 p-8 rounded-md flex flex-col justify-center items-center gap-4' >
                <div className='flex flex-col w-[80%] '>
                    <label htmlFor='email'>Name: </label>
                    <input type='email' onChange={(e) => setForm({ ...form, email: e.target.value })} className='border-2 rounded-md p-2 ' id='email' name="email" placeholder='name' required />
                </div>

                <div className='flex flex-col w-[80%]'>
                    <label className=''>Password: </label>

                    <input onChange={(e) => setForm({ ...form, password: e.target.value })} className='border-2 rounded-md p-2 ' placeholder='password' type='password' required />

                </div>

                <div className='text-center'>
                    {error.map((item, key) => <div key={key} className='text-center text-red-600 mr-2 text-sm'>
                        {item}</div>)}
                </div>

                <div className='w-[100%]'>
                    <hr />
                </div>


                <div className='semi-bold'>
                    Assign Category to the user
                </div>
                {products?.map((item: any, index: number) =>
                    <div key={index}>
                        {item.name} :
                        <select className='border-2 p-2 ml-2 rounded-md' onChange={(e) => {
                            setForm((form) => ({ ...form, categories: [...form.categories, { productId: item.id, categoryType: e.target.value }] }))
                        }}>
                            <option value=''> </option>
                            {item?.categories?.map((a: any, b: number) =>
                                <option key={b} value={a.name}>{a.name}</option>)}
                        </select>

                    </div>
                )}

                {/* <div className='flex flex-col'>
                        <label htmlFor="category">Category</label>
                        <select onChange={(e) => { setCategoryType(e.target.value); setAddCategoryItems({ ...addCategoryItems, name: e.target.value }) }} className='border-2 rounded-md p-2 max-w-[200px]' >
                            <option value=""></option>
                            {categories.map((item, key) => <option key={key} className='border-2 bg-slate-100' value={item}>{item}</option>)}
                        </select>
                    </div> */}


                <button type='button' className=' w-[80%] bg-black text-white px-4 py-2 border-2 rounded flex justify-center items-center'
                    onClick={() => {
                        if (form?.categories?.length > 0) {
                            setToggle(true);
                        }
                        else alert('fill the required fields');

                    }
                    }>Done {toggle && <Check size={15} />}</button>

                {toggle && <button className='px-4 py-2 bg-black text-white rounded'>{loader}</button>}

            </form>
        </div >
    )
}

export default Page;