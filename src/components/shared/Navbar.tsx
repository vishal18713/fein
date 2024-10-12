import Link from 'next/link'
import React from 'react'
import ConnectWalletButton from '@/components/cta/ConnectWalletBtn'
import { MdDiamond } from "react-icons/md";
import Input from './Input';
import GoToPortfolio from '../cta/GoToPortfolio'

// type Props = {}

const Navbar = () => {
  return (
    <div className='w-full h-20 border-b-[0.5px] flex items-center justify-between px-16'>
      <div className='flex'>
        <Link href='/'>
          <MdDiamond className='w-8 h-auto cursor-pointer' />
        </Link>
      </div>
      <div className=''> <Input /> </div>
      <div className=''>
        <ConnectWalletButton />
      </div>
      <div className='flex items-center gap-6'>
        <GoToPortfolio /> 
      </div>
    </div>
  )
}

export default Navbar