import React from 'react'
import Sidebar from './../Dashboard/Sidebar';
import Right from './../Dashboard/Right/Right';
import MainDash from './Center/MainDash';




const Main = () => {
  return (
    <div className='flex justify-center items-center h-[120vh] w-[100%]  '
    style={{
backgroundColor :'rgba(128, 0, 128, 0.945)'

    }}
    
    > 
    <>
      <div className="AppGlass pb-20  ">

<div><Sidebar className='ml-0 '/></div>
<div><MainDash/></div>
<div><Right/></div>


      </div>
      
  {/* <div className='h-[600px] w-[100%]  bg-red-900 '>

  </div> */}
  
    </>
    </div>
  )
}

export default Main
