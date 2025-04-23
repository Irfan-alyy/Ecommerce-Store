import React from 'react'
import Cards from './Cards'
import Table from '../Table/Table'

const MainDash = () => {
  return (
    <div className='Maindash flex justify-between   flex-col gap-8 ml-2 mt-4'>
<h1 className='text-4xl font-semibold text-white '>DashBoard</h1>
      <Cards/>
      <Table/>
        </div>
  )
}

export default MainDash
