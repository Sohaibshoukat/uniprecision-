import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'


const UserAccount = ({handleLogout,toggleMenu}) => {


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
        <h2 className='text-lg md:text-xl font-normal'>Account Setting</h2>
        <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
      </div>
      <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
        <div className=''>
          <h2 className='font-Para text-2xl font-bold mb-2'>Welcome to your Radiologist Area</h2>
          <p className='text-gray-500 text-xl font-medium'>Please Check your profile information is Updated</p>

          <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
            <div className="flex flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Name *</label>
                <input type="text" placeholder='Your Name' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Mobile Number *</label>
                <input type="text" placeholder='+00000000000' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Email *</label>
              <input type="text" placeholder='abc@gmail.com' className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 1 *</label>
              <input type="text" placeholder='ABC clinic' className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 2</label>
              <input type="text" placeholder='Gound flour Sublot 23' className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 3</label>
              <input type="text" placeholder='UNISQUARE COMMERCIAL CENTER' className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Postcode *</label>
                <input type="text" placeholder='Your Name' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>City *</label>
                <input type="text" placeholder='+00000000000' className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>State *</label>
                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md '>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Sarawak">Sarawak</option>
                </select>
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Country *</label>
                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                  <option value="Sarawak">UK</option>
                  <option value="Sarawak">US</option>
                  <option value="Sarawak">CANADA</option>
                </select>
              </div>
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>User type *</label>
                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                  <option value="Sarawak">Organization</option>
                  <option value="Sarawak">Personal</option>
                  <option value="Sarawak">Office</option>
                </select>
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Status *</label>
                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                  <option value="Sarawak">Active</option>
                  <option value="Sarawak">Blocked</option>
                </select>
              </div>
            </div>
            <button className='w-full bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Submit</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserAccount