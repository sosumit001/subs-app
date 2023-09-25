'use client'
import { useState, useEffect, useRef } from 'react'
import { sub_plans } from './prices'
import { addProduct } from '@/app/actions/addProduct/addProduct'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'


const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
const time = ['1month', '3month', 'semi-annual', 'yearly']
const durationName = ['oneMonthPrice', 'threeMonthPrice', 'sixMonthPrice', 'oneYearPrice']

interface AddCategoryItem {
    name: string;
    oneMonthPrice: number | null;
    threeMonthPrice: number | null;
    sixMonthPrice: number | null;
    OneYearPrice: number | null;
}

interface Form {
    name: string;
    description: string;
    licensePrice: number | null;
    categories: string[]; // Assuming categories are strings
    mlSemiAnnual: number | null;
    mlYearly: number | null;
    referral: number | null;
}

function Page() {
    const router = useRouter()
    const [toggle, setToggle] = useState<boolean>(false)
    const [loader, setLoader] = useState<string>('Add Product')
    const [categoryType, setCategoryType] = useState<string>('options')
    const checkboxesRef = useRef<(HTMLInputElement[] | null)>([]);
    const [form, setForm] = useState<Form>({
        name: '',
        description: '',
        licensePrice: null,
        categories: [],
        mlSemiAnnual: null,
        mlYearly: null,
        referral: null
    })
    const [addCategory, setAddCategory] = useState<any>([])
    const [addCategoryItems, setAddCategoryItems] = useState<AddCategoryItem>(
        {
            name: '',
            oneMonthPrice: null,
            threeMonthPrice: null,
            sixMonthPrice: null,
            OneYearPrice: null
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("addCategory", addCategory, [...addCategory])

        if (form.name && form.licensePrice && form.mlYearly && form?.categories?.length > 0) {
            setLoader("...")
            console.log("form", form)
            // Add logic to submit form data (e.g., send a request to your backend)
            try {
                const product = await addProduct(form)
                console.log('product created in db is : ', product)
                alert('Product added successfully')
                setLoader('Add Product')
                router.push('/admin/dashboard')
            }
            catch (err) {
                setLoader('Add Product')
                alert('something went wrong. Try again')
            }
        } else {
            alert('Please fill out the required fields.');
        }
    }

    const handleRemoveCategory = (index: number) => {
        setAddCategory((prevCategory: any) => prevCategory.filter((_: any, i: number) => i !== index));
    };

    const handleAddCategory = () => {
        if (addCategoryItems.oneMonthPrice && addCategoryItems.OneYearPrice && addCategoryItems.sixMonthPrice && addCategoryItems.threeMonthPrice) {
            setAddCategory((prevCategory: any[]) => [...prevCategory, { ...addCategoryItems }])
        }
        else {
            alert('Please fill out the required fields.')
        }
    }

    console.log(form, 'form')
    return (
        <div className="max-w-5xl m-auto p-4 h-full">
            <div className='text-center font-bold'>Add Product</div>
            <form className='w-[60%] m-auto border-2 p-8 rounded-md flex flex-col gap-4' >
                <div className='flex flex-col '>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={(e) => setForm({ ...form, name: e.target.value })} className='border-2 rounded-md p-2 max-w-[200px]' id='name' type="text" name="" placeholder='name' required />
                </div>
                <div className='flex flex-col'>
                    <label id='description'>Description: </label>
                    <textarea onChange={(e) => setForm({ ...form, description: e.target.value })} className='border-2 rounded-md p-2 max-w-[80%]' placeholder='description' typeof='text' id='description' />
                </div>
                <div className='flex flex-col'>
                    <label className=''>License Price: </label>
                    <div>
                        <input onChange={(e) => setForm({ ...form, licensePrice: parseFloat(e.target.value) })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                    </div>
                </div>
                <hr />
                <div className='flex flex-col'>
                    <label htmlFor="category">Category</label>
                    <select onChange={(e) => { setCategoryType(e.target.value); setAddCategoryItems({ ...addCategoryItems, name: e.target.value }) }} className='border-2 rounded-md p-2 max-w-[200px]' >
                        <option value=""></option>
                        {categories.map((item, key) => <option key={key} className='border-2 bg-slate-100' value={item}>{item}</option>)}
                    </select>
                </div>

                <div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <label className='mr-2' htmlFor='1'>1 month:</label>
                            <input className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' id='1' onChange={(e) => setAddCategoryItems({ ...addCategoryItems, oneMonthPrice: parseFloat(e.target.value) })} />$
                        </div>
                        <div className='flex items-center'>
                            <label className='mr-2' htmlFor='3'>3 months:</label>
                            <input className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' id='3' onChange={(e) => setAddCategoryItems({ ...addCategoryItems, threeMonthPrice: parseFloat(e.target.value) })} />$
                        </div>
                        <div className='flex items-center'>
                            <label className='mr-2' htmlFor='6'>6 months:</label>
                            <input className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' id='6' onChange={(e) => setAddCategoryItems({ ...addCategoryItems, sixMonthPrice: parseFloat(e.target.value) })} />$
                        </div>
                        <div className='flex items-center'>
                            <label className='mr-2' htmlFor='12'>1 year:</label>
                            <input className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' id='12' onChange={(e) => setAddCategoryItems({ ...addCategoryItems, OneYearPrice: parseFloat(e.target.value) })} />$
                        </div>

                    </div>


                    <button
                        type='button'
                        onClick={handleAddCategory}
                        className='px-4 py-2 my-4 border-2 rounded-md bg-orange-600 text-white'>
                        Add Category
                    </button>

                    <div>
                        {addCategory?.length > 0 && <div className='border-2 p-2'>
                            {addCategory?.map((item: AddCategoryItem, key: number) => {
                                return (
                                    <div className="inline-flex items-center bg-black text-white p-2 mr-2 rounded-md" key={key}>
                                        <span>{item.name}</span>
                                        <button
                                            className="ml-2"
                                            onClick={() => handleRemoveCategory(key)}
                                        >
                                            &#10005;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>}
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <label className=''>ML-Semi Annual Discount: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, mlSemiAnnual: parseFloat(e.target.value) })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className=''>ML Yearly Discount: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, mlYearly: parseFloat(e.target.value) })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className=''>Referral: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, referral: parseFloat(e.target.value) })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                        </div>
                    </div>

                </div>

                <button type='button' className='hover:text-white transition-[.3] hover:bg-black px-4 py-2 border-2 rounded flex justify-center items-center'
                    onClick={() => {
                        if (form?.categories?.length > 0) {
                            setToggle(true);
                        }
                        else alert('fill the required fields');

                        return setForm(prevForm => ({
                            ...prevForm,
                            categories: [...addCategory]
                        }))
                    }
                    }>Done {toggle && <Check size={15} />}</button>

                {toggle && <button className='px-4 py-2 bg-black text-white rounded' onClick={(e) => handleSubmit(e)}>{loader}</button>}

            </form>
        </div >
    )
}

export default Page;