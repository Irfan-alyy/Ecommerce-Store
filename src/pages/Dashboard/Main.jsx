import React from 'react'
import Sidebar from '../../components/Dashboard/Sidebar';
import Right from '../../components/Dashboard/Right/Right';
import MainDash from '../../components/Dashboard/Center/MainDash'
import '../../styles/Dashboard/Dashboard.css'



const Main = () => {
  return (
    <div className='flex justify-center items-center h-[140vh] w-[100%] overflow-scroll  '
    style={{
backgroundColor :' rgba(58, 140, 194, 0.747)'

    }}

    > 
    <>
      <div className="AppGlass pb-20  ">

<div><Sidebar className='ml-0  '/></div>
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
