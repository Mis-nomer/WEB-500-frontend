const TopSection = () => (
  <>
    <div className='bg-[url("https://astronomy.com/-/media/Images/Magazine%20Articles/2022/01/Barnardsgalaxy.jpg?mw=600")] pt-5 pb-8 text-center text-white'>
      <img
        src='https://d33wubrfki0l68.cloudfront.net/56b13b3bf4c6a968ed185545896004efbe836a25/c7537/assets/rob@120w.c8436c81.webp'
        alt=''
        className='object-cover w-[64x] h-[64px] rounded-full inline'
      />
      <p className='px-2 font-semibold font-sans'>Username</p>
      <a className='transition-all px-2 opacity-70 text-xs hover:opacity-100 cursor-pointer font-sans flex items-center justify-center gap-1'>
        <i className='fa-solid fa-caret-down'></i>
        <span>Settings</span>
      </a>
    </div>
    <div>
      <div className='p-3 pb-5 [&>span]:bg-[#ffc857] [&>hr]:hover:opacity-0 [&>span]:hover:bg-transparent hover:translate-x-2 hover:scale-110 hover:shadow-xl hover:-skew-y-3 hover:bg-[#177e89] hover:text-white hover:cursor-pointer transition-all ease-in'>
        <i className='fa-regular fa-user pointer-events-none'></i>
        <span className='px-2 pointer-events-none font-semibold transition-all duration-75'>User Analytics</span>
        <hr className='border-black block -mt-2.5' />
      </div>
      <div className='p-3 pb-5 [&>span]:bg-[#ffc857] [&>hr]:hover:opacity-0 [&>span]:hover:bg-transparent hover:translate-x-2 hover:scale-110 hover:shadow-xl hover:-skew-y-3 hover:bg-[#177e89] hover:text-white hover:cursor-pointer transition-all ease-in'>
        <i className='fa-regular fa-calendar pointer-events-none'></i>
        <span className='px-2 pointer-events-none font-semibold transition-all'>Habit Analytics</span>
        <hr className='border-black block -mt-2.5' />
      </div>
    </div>
  </>
)
//bg-[#084c61] bg-[#ffc857] bg-[#177e89]
export default () => {
  return (
    <div id='sidebar' className='z-50 col-span-1 bg-[#ffc857] text-black min-h-screen font-sans'>
      <TopSection />
    </div>
  )
}
