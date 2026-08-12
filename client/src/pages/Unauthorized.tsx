import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
   <section className='flex w-full h-[100vh] items-center justify-center bg-gray-100'>
    <div className="flex flex-col gap-3 items-center">
      <h2 className='text-2xl font-semibold'>Sorry, you do not have authorization to view this page.</h2>
      <Link to='/' className='bg-gray-800 hover:bg-gray-700 text-white py-3 px-5 mt-5 rounded-sm'>Back to Home Page</Link>
    </div>
   </section>
  )
}

export default Unauthorized
