import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../pages/_components/sidebar'
import { StatsProvider } from '../../contexts/statsContext'
import { UsersProvider } from '../../contexts/usersContext'
const DashboardLayout = () => {
   const [open, setOpen] = useState(true);
  return (
    <StatsProvider>
      <UsersProvider>
    <div className='flex min-h-screen  w-full'>
      <div className=''>
        <Sidebar open={open} setOpen={setOpen}/>
      </div>
      <div className={`flex-1 p-4 bg-gray-100 transition-all duration-300 ${open ? 'lg:ml-64 ml-20 ' : 'ml-20'}`}>
        <Outlet/>
      </div>
    </div>  
      </UsersProvider>
    </StatsProvider>
  )
}

export default DashboardLayout