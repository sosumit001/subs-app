'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/app/actions/getProduct/getProduct'
import { addUser } from '@/app/actions/UserActions/OperationsOnUser'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'


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

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


function Page() {
    const router = useRouter()

    const [loader, setLoader] = useState<boolean>(false)
    const [products, setProducts] = useState<any>([])

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

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (emailRegex.test(form.email) && passwordRegex.test(form.password) && form.categories?.length) {
            try {
                setLoader(true)
                const user = await addUser(form)
                console.log(user, "log")
                setLoader(false)

            }
            catch (err) {
                console.log(err)
                setLoader(false)
                alert("Something went wrong. Try again!")
            }
        }

        else {
            alert('please fill the required fields properly')
        }
    }

    console.log(form)
    return (
        <div className="max-w-5xl m-auto p-4 h-full">
            <div className='text-center font-bold'>Edit User</div>
            <form className='w-[50%] m-auto border-2 p-8 rounded-md flex flex-col justify-center items-center gap-4' >
                <div className='flex flex-col w-[80%] '>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' onChange={(e) => setForm({ ...form, email: e.target.value })} className='border-2 rounded-md p-2 ' id='email' name="email" placeholder='email' required />
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



                <button onClick={(e) => handleSubmit(e)} className='flex items-center px-4 py-2 bg-black text-white rounded'>Add User {loader && <Loader size={15} color='white' />}</button>

            </form>
        </div >
    )
}

export default Page;