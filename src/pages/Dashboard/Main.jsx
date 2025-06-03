import React, { useState } from 'react';
import Cards from '../../components/Dashboard/First/Cards';
import Tabels from '../../components/Dashboard/First/Tabels';
import Charts from '../../components/Dashboard/First/charts';




const Home = () => {
  return (
    <div className='h-auto w-[100%] mb-20 border-b-2 pb-4 flex flex-col justify-start items-center  bg-gray-200 overflow-x-hidden px-[5%]   '   >
  

<div className=' h-auto w-full  mt-40 '> 
<h1 className='text-3xl text-gray-600  font-semibold  mb-10 ml-4  ' >Dashboard</h1>
<Cards/>
</div>

<div className='w-[100%] h-auto flex justify-center text-center  gap-4 flex-col  mt-2   sm:flex-col lg:flex-row  md:mt-0     ' >
<Tabels/>
<Charts/>

</div>


    </div>
  );
};

export default Home;
