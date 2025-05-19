import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

const Panel = () => {
  return (
    <div className=''>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Panel;
