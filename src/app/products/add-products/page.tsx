'use client'
import { useState } from 'react'
import { sub_plans } from './prices'

const categories = ['A / A-ML', 'B / B-ML', 'C / C-ML', 'D / D-ML', 'E / E-ML', 'F / F-ML']
const time = ['1month', '3month', 'semi-annual', 'yearly']

function Page() {
    const [toggle, setToggle] = useState<boolean>(false)
    const [categoryType, setCategoryType] = useState<string>('options')
    const [form, setForm] = useState<any>({
        name: '',
        description: '',
        licence_limit: null,
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
    
    

    const handleAddCategory = () => {
        setAddCategory(prevCategory => [...prevCategory, { ...addCategoryItems }])
    }

    return (
        <div className="max-w-5xl m-auto p-4 h-full">
            <form className='w-[60%] m-auto' >
                <div className='flex flex-col'>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={(e) => setForm({ ...form, name: e.target.value })} className='border-2' id='name' type="text" name="" placeholder='name' required />
                </div>
                <div className='flex flex-col'>
                    <label id='description'>Description: </label>
                    <textarea onChange={(e) => setForm({ ...form, description: e.target.value })} className='border-2 w-[50%]' typeof='text' id='description' rows={5} />
                </div>
                <div className='flex flex-col'>
                    <label className=''>Licence Limit: </label>
                    <input onChange={(e) => setForm({ ...form, licence_limit: e.target.value })} className='border-2' type='number' max={10} min={1} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="category">Category</label>
                    <select onChange={(e) => { setToggle(true); setCategoryType(e.target.value); setAddCategoryItems({ ...addCategoryItems, name: e.target.value }) }} className='border-2 bg-slate-100 rounded-md'>
                        <option value=""></option>
                        {categories.map((item, key) => <option key={key} className='border-2 bg-slate-100' value={item}>{item}</option>)}
                    </select>
                </div>

                <div>
                    {sub_plans[categoryType]?.map((item, key) => (
                        <div className='flex' key={key}>
                            <label className='mr-2' htmlFor={time[key]}>{time[key]}: ${item} </label>
                            <input className='border-2  ' type="checkbox" id={time[key]} onChange={(e) => handleCheckboxChange(key, e.target.checked)} />
                        </div>
                    ))}
                    <div className='flex justify-center'>
                        <button
                            type='button'
                            onClick={handleAddCategory}
                            className='px-4 py-2 border-2 rounded-md bg-orange-600 text-white'>
                            Add?
                        </button>
                    </div>
                </div>

                <button type='button' onClick={() => setForm({ ...form, categories: addCategory })}>Submit</button>
            </form>
        </div>
    )
}

export default Page;
