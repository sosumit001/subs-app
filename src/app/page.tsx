import { checkAuth } from "./lib/checkAuth"
import Navbar from "./components/Navbar"


export default async function Home() {
  await checkAuth()

  return (
    <div className='w-full'>
      <Navbar />
    </div>
  )
}
