"use client";

import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react';
import SearchSection from '../Components/Home/SearchSection';
import GoogleMapSection from '../Components/Home/GoogleMapSection';
import { DestinationContext } from '../context/DestinationContext';
import { PickupContext } from '../context/PickupContext';
import { LoadScript } from '@react-google-maps/api';

function Home() {
  const [destination, setDestination] = useState(null);
  const [pickup, setPickup] = useState(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Ensure env variable is loaded properly.

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
      <PickupContext.Provider value={{ pickup, setPickup }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <SearchSection />
            </div>
            <div className='col-span-2'>
              <GoogleMapSection />
            </div>
          </div>
        </DestinationContext.Provider>
      </PickupContext.Provider>
    </LoadScript>
  );
}

export default Home;
