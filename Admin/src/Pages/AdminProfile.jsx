import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

const AdminProfile = ({ toggleMenu, handleLogout }) => {
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
                <h2 className='text-lg md:text-xl font-normal'>Admin Profile</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='h-[100%] max-h-[100vh] py-10 px-5 md:px-10 m-auto overflow-y-scroll'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>Profile Setting</h2>
                    <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-gray-500 text-lg font-normal'>To chnage the Password Request OTP will send to your registerd Email</h3>
                            <button className='w-fit px-6 bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Request OTP</button>
                        </div>
                        <div className="flex flex-col basis-[50%] gap-2 ">
                            <label htmlFor="" className='basis-[20%] text-gray-500 text-lg font-normal'>OTP *</label>
                            <input type="text" placeholder='Enter your recived OTP' className='w-fit text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                        </div>
                        <div className="flex  flex-col gap-[20px] lg:flex-row">
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>New Password *</label>
                                <input type="password" placeholder='Your New Password' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                            </div>
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Confirm Password *</label>
                                <input type="password" placeholder='Confirm Enterd Password' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                            </div>
                        </div>
                        <button className='w-fit px-6 self-center bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Update Passowrd</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile