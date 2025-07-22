import React, { useEffect } from 'react'
import { useItems } from '../contexts/ItemsContext'
import LatestItemsTable from './_components/latest-item-table'

const ManageItems = () => {
      const {loading,getMyItems, getLatestItems, latestItems } = useItems()
    useEffect(()=>{
        getMyItems()
        getLatestItems()
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
      <LatestItemsTable latestItems={latestItems}  />
    </div>
  )
}

export default ManageItems