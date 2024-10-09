import Link from 'next/link'
import React from 'react'
import ConnectWalletButton from '@/components/cta/ConnectWalletBtn'
import GoToPortfolio from '../cta/GoToPortfolio'

// type Props = {}

const Navbar = () => {
  return (
    <div className='w-full h-20 border-b-[0.5px] flex items-center justify-between px-16'>
        <div className='flex'>
            <Link href='/'>logo</Link>
          </div>
        <div className='flex'>input</div>
        <div className=''>
            <ConnectWalletButton />
        </div>
        <div className='flex items-center gap-6'>
          {/* <GoToPortfolio />  */}
          <div className='w-12 h-12 rounded-full bg-red-50'></div>
        </div>
    </div>
  )
}

export default Navbar