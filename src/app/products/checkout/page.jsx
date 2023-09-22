'use client'

import { useGlobalContext } from '@/app/Context/store';

function page(props) {
  const {toPass} = useGlobalContext()
  console.log(toPass)
    // console.log(data)
  return (
    <div className="border-2 rounded-md p-8 shadow-md w-[500px] h-[400px] absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] flex flex-col gap-4">

      <div>{toPass?.name}</div>
      <hr />
      <div className="flex justify-between"><span>Subscription</span><span className="p-2 bg-black text-white rounded-md">billed monthly</span></div>

      <div className="flex justify-between"> <span>duration</span ><span className="p-2 bg-black text-white rounded-md">{toPass?.duration}</span></div>
      <div>
        <span >Licence</span>
        <select className="border-2 rounded-md p-2 ml-2" name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <hr />

      <div className="flex justify-between">
        <span>subtotal</span>
      </div>

      <button className="p-2 w-[100%] bg-black text-white rounded-md" >Checkout</button>

    </div>
  )
}

export default page