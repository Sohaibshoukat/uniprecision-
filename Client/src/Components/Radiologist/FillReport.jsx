import React from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'

const FillReport = ({ handleLogout, toggleMenu }) => {
  return (
    <>
      <div className='flex flex-row items-center justify-between gap-0 md:gap-20 h-auto shadow-xl py-4 bg-white px-4 md:px-10 '>
        <button
          type="button"
          className={`nline-flex p-2 text-xl md:text-3xl lg:hidden rounded-md bg-transparent hover:bg-gray-100 focus:outline-none`}
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </button>
        <h2 className='text-lg md:text-xl font-normal'>Report Submission</h2>
        <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
      </div>
      <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
        <div className=''>
          <h1 className='text-xl font-Para font-semibold'>Fill Your Report</h1>
          <p className='text-sm font-Para'>Fill the following details and submit the report</p>
          <div className='bg-white shadow-2xl w-full my-10 py-10 rounded-lg px-8'>

            {/* Patient Records */}
            <div className='flex flex-col gap-6'>
              <h2 className='text-xl font-medium  font-Para'>Patient Data</h2>
              <div className="grid grid-cols-2 gap-6 px-10">
                <div className="flex flex-row items-center gap-6">
                  <h2 className='text-lg font-normal font-Para'>Name:</h2>
                  <p className='text-base font-light font-Para'>Inzamam Yousaf</p>
                </div>
                <div className="flex flex-row gap-3">
                  <h2 className='text-lg font-normal font-Para'>Date of Birth:</h2>
                  <p className='text-base font-light font-Para'>13/02/2024</p>
                </div>
                <div className="flex flex-row items-center gap-6">
                  <h2 className='text-lg font-normal font-Para'> NRIC/Passport No:</h2>
                  <p className='text-base font-light font-Para'>990101-01-5591</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <h2 className='text-lg font-normal font-Para'>Age:</h2>
                  <p className='text-base font-light font-Para'>23</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <h2 className='text-lg font-normal font-Para'>Gender:</h2>
                  <p className='text-base font-light font-Para'>Male</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <h2 className='text-lg font-normal font-Para'>Examination Date:</h2>
                  <p className='text-base font-light font-Para'>11/Dec/2023</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <h2 className='text-lg font-normal font-Para'>Clinic/Diagnosic Center:</h2>
                  <p className='text-base font-light font-Para'>Inzamam Center</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-6 mt-10">
              <h2 className='text-xl font-normal font-Para'>Referring Doctor:</h2>
              <p className='text-lg font-light font-Para'>Inzamam Yousaf</p>
            </div>

            {/* Request Data */}
            <div className='flex flex-col gap-8 mt-10 grid-cols-1'>

              <h2 className='text-xl font-medium  font-Para'>Fill Form</h2>

              <div className="flex flex-col gap-6">
                <div className='w-[100%] flex flex-col'>
                  <label htmlFor="" className='font-Para text-base'>Findings</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                  />
                </div>

                <div className='w-[100%] flex flex-col'>
                  <label htmlFor="" className='font-Para text-base'>Summary *</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                  />
                </div>

              </div>

            </div>

            {/* Button Submit */}
            <div className='flex flex-col justify-end w-[100%] '>
              <Link to={'/radioDashboard'}>
                <button
                  className='
                bg-slate-700 border-2 border-slate-700 hover:bg-transparent hover:text-slate-700 
                text-white ease-in-out duration-300 w-fit py-2 px-4 text-lg 
                font-Para font-medium mt-6 rounded-lg
              '
                >
                  Submit Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FillReport