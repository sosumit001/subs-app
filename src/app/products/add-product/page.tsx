'use client'
import { useState, useEffect, useRef } from 'react'
import { sub_plans } from './prices'


const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
const time = ['1month', '3month', 'semi-annual', 'yearly']

function Page() {
    const [toggle, setToggle] = useState<boolean>(false)
    const [categoryType, setCategoryType] = useState<string>('options')
    const checkboxesRef = useRef([]);
    const [form, setForm] = useState<any>({
        name: '',
        description: '',
        licensePrice: null,
        categories: [],
        mlSemiAnnual: null,
        mlYearly: null,
        referral: null
    })
    const [addCategory, setAddCategory] = useState<any>([])
    const [addCategoryItems, setAddCategoryItems] = useState<any>(
        {
            name: '',
            oneMonthPrice: null,
            threeMonthPrice: null,
            sixMonthPrice: null,
            OneYearPrice: null
        }
    )
    console.log(form)
    useEffect(() => {
        // Reset addCategoryItems when categoryType changes
        checkboxesRef.current.forEach(checkbox => {
            checkbox.checked = false;
        });
    }, [categoryType]);

    const handleCheckboxChange = (key: any, checked: any) => {
        const price = sub_plans[categoryType][key];

        setAddCategoryItems((prevItems) => {
            const updatedPrices = { ...prevItems };

            if (checked) {
                switch (time[key]) {
                    case '1month':
                        updatedPrices.oneMonthPrice = price;
                        break;
                    case '3month':
                        updatedPrices.threeMonthPrice = price;
                        break;
                    case 'semi-annual':
                        updatedPrices.sixMonthPrice = price;
                        break;
                    case 'yearly':
                        updatedPrices.OneYearPrice = price;
                        break;
                    default:
                        break;
                }
            } else {
                switch (time[key]) {
                    case '1month':
                        updatedPrices.oneMonthPrice = null;
                        break;
                    case '3month':
                        updatedPrices.threeMonthPrice = null;
                        break;
                    case 'semi-annual':
                        updatedPrices.sixMonthPrice = null;
                        break;
                    case 'yearly':
                        updatedPrices.OneYearPrice = null;
                        break;
                    default:
                        break;
                }
            }

            return updatedPrices;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setForm({ ...form, categories: addCategory })

        if (form.name && form.licensePrice && form.mlYearly) {
            // Add logic to submit form data (e.g., send a request to your backend)
            console.log('Form submitted:', form);
        } else {
            alert('Please fill out the required fields.');
        }


        // try{
        //        const res = await fetch('/api/createProduct', {method: 'POST'})
        // }
    }

    const handleAddCategory = () => {
        setAddCategory(prevCategory => [...prevCategory, { ...addCategoryItems }])
    }

    return (
        <div className="max-w-5xl m-auto p-4 h-full">
            <form className='w-[60%] m-auto border-2 p-8 rounded-md flex flex-col gap-4' >
                <div className='flex flex-col'>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={(e) => setForm({ ...form, name: e.target.value })} className='border-2 rounded-md p-2 max-w-[200px]' id='name' type="text" name="" placeholder='name' required />
                </div>
                <div className='flex flex-col'>
                    <label id='description'>Description: </label>
                    <textarea onChange={(e) => setForm({ ...form, description: e.target.value })} className='border-2 rounded-md p-2 max-w-[80%]' typeof='text' id='description' />
                </div>
                <div className='flex flex-col'>
                    <label className=''>license Price: </label>
                    <div>
                        <input onChange={(e) => setForm({ ...form, licensePrice: e.target.value })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' max={10} min={1} required />$
                    </div>
                </div>
                <hr />
                <div className='flex flex-col'>
                    <label htmlFor="category">Category</label>
                    <select onChange={(e) => { setToggle(true); setCategoryType(e.target.value); setAddCategoryItems({ ...addCategoryItems, name: e.target.value }) }} className='border-2 rounded-md p-2 max-w-[200px]' >
                        <option value=""></option>
                        {categories.map((item, key) => <option key={key} className='border-2 bg-slate-100' value={item}>{item}</option>)}
                    </select>
                </div>

                <div>
                    {sub_plans[categoryType]?.map((item, key) => (
                        <div className='flex' key={key}>
                            <label className='mr-2' htmlFor={time[key]}>{time[key]}: ${item} </label>
                            <input ref={el => checkboxesRef.current[key] = el} className='border-2  ' type="checkbox" key={`${time[key]}-${categoryType}`} id={time[key]} onChange={(e) => handleCheckboxChange(key, e.target.checked)} />
                        </div>
                    ))}

                    <button
                        type='button'
                        onClick={handleAddCategory}
                        className='px-4 py-2 my-4 border-2 rounded-md bg-orange-600 text-white'>
                        Add Category
                    </button>

                    <div>
                        {addCategory?.length > 0 && <div className='border-2 p-2'>
                            {addCategory?.map((item, key) => {
                                return <span className='bg-black text-white p-2 mr-2 rounded-md' key={key}>{item.name}</span>
                            })}

                        </div>}
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <label className=''>ML-Semi Annual: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, mlSemiAnnual: e.target.value })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' max={10} min={1} required />$
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className=''>ML Yearly: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, mlYearly: e.target.value })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className=''>Referral: </label>
                        <div>
                            <input onChange={(e) => setForm({ ...form, referral: e.target.value })} className='border-2 mr-2 rounded-md p-2 max-w-[100px]' type='number' required />$
                        </div>
                    </div>

                </div>

                <button onClick={(e) => handleSubmit(e)}>Add Product</button>
            </form>
        </div>
    )
}

export default Page;
