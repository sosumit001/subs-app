'use client'

import { useGlobalContext } from '@/app/Context/store';
import { useState } from 'react';
import getCheckout from '@/app/actions/getCheckoutUrl/getCheckout';

function page() {
  const [loading, setLoading] = useState(false)
  const [license, setlicense] = useState('')
  const { toPass, setToPass } = useGlobalContext()
  console.log(toPass)

  const onSubscribe = async () => {


   if(toPass?.subtotal == 0 || Number.isNaN(toPass?.subtotal)) return alert("please select license or go back and choose again")

    const res = await getCheckout(toPass,parseInt(license))
    console.log(res)
    window.location.href = res;
  }

  console.log(license)
  return (
    <div className="border-2 rounded-md p-8 shadow-md w-[500px] h-[400px] absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] flex flex-col gap-4">

      <div>{toPass?.name}</div>
      <hr />
      <div className="flex justify-between"><span>Subscription</span><span className="p-2 bg-black text-white rounded-md">billed monthly</span></div>

      <div className="flex justify-between"> <span>duration</span ><span className="p-2 bg-black text-white rounded-md">{toPass?.duration}</span></div>
      <div>
        <span  >Licence</span>
        <select onChange={(e) => {
          setToPass((toPass) => ({ ...toPass, subtotal: ( parseInt(e.target.value) * toPass.licensePrice) }));
          return setlicense(e.target.value);
        }} className="border-2 rounded-md p-2 ml-2" name="license" id="license">
          <option value={''}></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <hr />

      <div className="flex justify-between">
        <span>subtotal</span>
        <span>{parseInt(license)?(toPass.licensePrice * parseInt(license) + "$ license + " +toPass.durationPrice* parseInt(license) + "$ " + "/mon"): "../"}  </span>
      </div>

      <button className="p-2 w-[100%] bg-black text-white rounded-md" disabled={loading} onClick={onSubscribe}>Checkout</button>

    </div>
  )
}

export default page