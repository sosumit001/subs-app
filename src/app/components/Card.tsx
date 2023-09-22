import Link from 'next/link'


const Card = ({price, time}:{price:number, time: string}) => {
    return <div className="flex-shrink-0 flex-col h-[70%] w-[300px] shadow-md rounded-lg border-2 hover:scale-105 transition-[.3]">
        <div className="p-4 bg-black text-white text-center rounded-t-md">{time}</div>
        <div className="flex flex-col text-sm p-8 justify-center items-center bg-white">
            <span className="p-1 font-bold text-lg">${price}</span>
            {/* <span className="p-1 text-xs">always free for 10 users</span> */}
            {/* <span className="p-1 font-semibold ">monthly subscription only</span> */}
        </div>
        <div className="p-4 text-center bg-white">
            <button className="px-4 py-2 border-2 rounded-lg transition-all hover:bg-black hover:text-white"><Link href={'/products/checkout'}>Get it now</Link></button>
        </div>
    </div>;
}


export default Card;