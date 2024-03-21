import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

const Pricing = ({ toggleMenu, handleLogout, OpenModel, setOpenModel }) => {

    const Service = [
        {
            "service": "XR (1 view) reported by subspecialist",
            "price": 200
        },
        {
            "service": "Relevant XR (1 view) reported by subspecialist",
            "price": 200
        },
        {
            "service": "XR (multiple views of 1 region) reported by subspecialist",
            "price": 200
        },
        {
            "service": "CT (1 region) reported by Subspecialist",
            "price": 200
        },
        {
            "service": "Mammogram reported by subspecialist",
            "price": 200
        },
        {
            "service": "MRI (1 Region) Reported by Subspecialist",
            "price": 200
        },
        {
            "service": "CT Coronary Angiogram reported by Subspecialist",
            "price": 200
        },
        {
            "service": "Film Audit / Image Quality Assessment (MOH requirements for QAP)",
            "price": 200
        }
    ];


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
                <h2 className='text-lg md:text-xl font-normal'>Pricings</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>Service Pricing</h2>

                    <div className='overflow-x-scroll'>
                        <div className='flex flex-row gap-4 justify-end'>
                            <button
                                className='w-fit px-4 bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                                onClick={() => { setOpenModel(true) }}
                            >
                                Add New Service
                            </button>
                            <button className='w-fit px-4 bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Update Price</button>
                        </div>
                        <table className='styled-table w-[100%] bg-slate-300 py-4 px-8 rounded-xl'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Select to change</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>New Input</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Service && Service.length > 0 && Service.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td
                                            className='text-center'
                                        >
                                            <input
                                                type='checkbox'
                                                className='bg-slate-200'
                                            // checked={SelectedItem.includes(item)}
                                            // onChange={(e) => handleCheckboxChange(e, item)}
                                            />
                                        </td>
                                        <td>{item.service}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <input type="number" name="" id="" className='bg-slate-200 rounded-lg text-black py-2 px-4' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Pricing