import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

const AdminDashboard = ({ toggleMenu, handleLogout }) => {


    return (
        <>
            <div className='flex flex-row items-center justify-between gap-0 md:gap-20 h-auto shadow-xl py-4 bg-white px-4 md:px-10 '>
                <button
                    type="button"
                    className={`nline-flex p-2 text-2xl md:text-3xl lg:hidden rounded-md bg-transparent hover:bg-gray-100 focus:outline-none`}
                    onClick={toggleMenu}
                >
                    <GiHamburgerMenu />
                </button>
                <h2 className='text-lg md:text-xl font-normal'>Admin Dashboard</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Service Request</h2>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard