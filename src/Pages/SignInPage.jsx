import React from 'react'
import { SignIn } from "@clerk/clerk-react";
import bannerImage from '../assets/banner.png'

function SignInPage() {
  return (
    <div>
      <img src={bannerImage} width={900} height={1000} className="object-contain h-full w-full" alt="Banner" />
       <div className='absolute top-20 right-10'><SignIn/></div>
      
    </div>
  )
}

export default SignInPage
