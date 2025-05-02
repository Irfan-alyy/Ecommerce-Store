import React from 'react'
import Sidebar from '../../components/Dashboard/Sidebar';
import Right from '../../components/Dashboard/Right/Right';
import MainDash from '../../components/Dashboard/Center/MainDash'
import '../../styles/Dashboard/Dashboard.css'



const Main = () => {
  return (
    <div className='flex justify-center items-center h-[120vh] w-[100%]  '
    style={{
backgroundColor :'rgba(128, 0, 128, 0.945)'

    }}

    > 
    <>
      <div className="AppGlass pb-20  ">

<div><Sidebar className='ml-0  bg-black '/></div>
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
