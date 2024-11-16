import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row items-center justify-between mt-1'>
        <div className='flex flex-row items-center'>
            <img src="./header_logo.png" alt="Logo" className='h-16 lg:h-20' />
            <p className='text-2xl lg:text-3xl font-sans font-semibold pb-4 bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text'>Admin Portal</p>
        </div>
        <img className="h-8 lg:h-12" src="./header_name.png" alt="Name" />
    </div>
  )
}

export default Header