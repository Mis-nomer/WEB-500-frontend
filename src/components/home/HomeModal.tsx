export default function ({ modalState }: { modalState: Boolean }) {
  return (
    <div>
      <div
        className={`${
          !modalState && 'hidden'
        } absolute inset-0 bg-black bg-opacity-30 h-full w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}
      >
        <div
          className={`relative w-10/12 md:w-1/2 h-1/2 md:h-3/4 rounded-md shadow-lg bg-[#084c61] transition-opacity duration-300 ${
            modalState ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <form action='' method='post'>
            <div className='p-4 text-sm text-white bg-red-500 font-medium '>
              <label htmlFor='title'>Title</label>
              <input type='text' name='' id='' className='w-full block px-1 py-2 my-1 focus:outline-none text-lg text-[#084c61]' />
            </div>
            <div className='p-4 text-sm text-white bg-red-500 font-medium '>
              <label htmlFor='title'>Title</label>
              <input type='text' name='' id='' className='w-full block px-1 py-2 my-1 focus:outline-none text-lg text-[#084c61]' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
