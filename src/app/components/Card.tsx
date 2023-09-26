'use Client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
import { useGlobalContext } from '../Context/store';

const Card = (props:any) => {
    console.log(props)

    const {toPass, setToPass} = useGlobalContext()
    const router = useRouter()

    const handleSend=()=>{
        // setToPass((toPass:any)=> ({...toPass, duration: time , licensePrice: licensePrice, name: name, durationPrice: price }))
        console.log("toPass", toPass)

        router.push('/products/checkout')
    }
    console.log(toPass)

    return <div className="flex-shrink-0 flex-col h-[150px] w-[300px] shadow-md rounded-lg border-2 hover:scale-105 transition-[.3]">
        <div className="p-4 bg-black text-white text-center rounded-t-md"> </div>
        <div className="flex flex-col text-sm p-8 justify-center items-center bg-white">
            <span className="p-1 font-bold text-lg">$</span>
        </div>
        <div className="p-4 text-center bg-white">
            <button className="px-4 py-2 border-2 rounded-lg transition-all hover:bg-black hover:text-white"><button type='button' onClick={handleSend}>Subscribe</button></button>
        </div>
    </div>;
}


export default Card;