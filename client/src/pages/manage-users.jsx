import React, { useEffect } from 'react'
import UsersTable from './_components/users-table'
import { useUsers } from '../contexts/usersContext';

const ManageUsers = () => {
  const { deleteUser, fetchUsers, users , loading} = useUsers();
  useEffect(()=>{
      fetchUsers()
    }, [])

    if(loading) {
      return (
        <div className='w-full min-h-screen flex items-center justify-center'>
          <div className="loader"></div>
        </div>
      )
    }
  return (
    <div className='w-full min-h-screen flex justify-center'>
      <UsersTable users={users} deleteUser={deleteUser}/>
    </div>
  )
}

export default ManageUsers