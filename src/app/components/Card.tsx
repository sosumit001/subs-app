'use Client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
import { useGlobalContext } from '../Context/store';

const Card = ({price, time, licensePrice, name}:{price:any, time: any, licensePrice: number, name: string}) => {

    const {toPass, setToPass} = useGlobalContext()
    const router = useRouter()

    const handleSend=()=>{
        setToPass((toPass:any)=> ({...toPass, duration: time , licensePrice: licensePrice, name: name, durationPrice: price }))
        console.log("toPass", toPass)

        router.push('/products/checkout')
    }
    console.log(toPass)

    return <div className="flex-shrink-0 flex-col h-[70%] w-[300px] shadow-md rounded-lg hover:scale-105 transition-[.3]">
        <div className="p-4 bg-black text-center rounded-t-md">{time}</div>
        <div className="flex flex-col text-sm p-8 justify-center text-black items-center bg-white">
            <span className="p-1 font-bold text-lg">${price}</span>
        </div>
        <div className="p-4 text-center text-black bg-white">
            <button className="px-4 py-2 border-2 rounded-lg transition-all hover:bg-black hover:text-white"><button type='button' onClick={handleSend}>Subscribe</button></button>
        </div>
    </div>;
}


export default Card;