import { div } from 'framer-motion/client'
import React from 'react'
import Updates from './Updates'
import CustomerREview from './CustomerREview'

const Right = () => {
  return (
  <div  className='Rightside felx justify-evenly items-center flex-col ml-4'>
    {/*  */}
<div className='mb-2'>
  <h3 className='text-2xl mt-2  font-semibold text-white'>
     Updates
  </h3>
  <Updates/>
</div>
{/*  */}
 
<div className='rebottom' >
<h3 className='text-2xl font-semibold mb-8 text-white ml-2  '>Customer Review</h3>
<CustomerREview/>

</div>


  </div>



  )
}

export default Right
