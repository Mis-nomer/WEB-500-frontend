export const SpinningBox = ({ callback }: any) => {
  return (
    <div onClick={() => callback && callback()} className='box hover:cursor-pointer flex justify-center items-center z-50'>
      <div className='left face'></div>
      <div className='right face'></div>
      <div className='front face'></div>
      <div className='back face'></div>
      <div className='top face'>
        <span className='vertical-center'></span>
      </div>
      <div className='bottom face'></div>
    </div>
  )
}
