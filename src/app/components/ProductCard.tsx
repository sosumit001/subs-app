import Image from 'next/image'
import Link from 'next/link'


function ProductCard({ }) {
    return (
        
            <div className='flex '>
                <div className='w-[70%] p-4'>

                </div>

                <div className='w-[30%] p-4 '>
                   Products
                  <ul>
                    <li>Honey Bee</li>
                    <li>Money Lover</li>
                    <li>Milfy Milk</li>
                  </ul>
                </div>
            </div>

    )
}

export default ProductCard