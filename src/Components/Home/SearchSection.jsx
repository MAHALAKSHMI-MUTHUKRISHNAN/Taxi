"use client"

import React, { useEffect } from 'react'
import InputItem from './InputItem'
import { useContext } from 'react'
import { DestinationContext } from '../../context/DestinationContext'
import { PickupContext } from '../../context/PickupContext'

function SearchSection() {
  const {pickup, setPickup} = useContext(PickupContext);
  const {destination, setDestination} = useContext(DestinationContext);

  useEffect(() => {
    if(pickup){
      console.log(pickup)
    }
    if(destination){
      console.log(destination)
    }
  }, [pickup,destination])
  
  return (
    <div className='p-1 md:pd-5
    border-[2px] border-gray-200 rounded-md'>
      <p className='text-[20px] font-bold'>Search for a ride</p>
        <div className='p-5 space-y-4 '>
            <InputItem type="pickup"/>
            <InputItem type="destination"/>

            <button className='bg-black text-yellow-500 p-2 rounded-md w-full'>Search</button>
        </div>
    </div>
  )
}

export default SearchSection
