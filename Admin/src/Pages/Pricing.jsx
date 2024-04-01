import React, { useContext, useEffect, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import AlertContext from '../Context/Alert/AlertContext';

const Pricing = ({ 
        toggleMenu, 
        handleLogout, 
        OpenModel, 
        setOpenModel,
        setprice, 
        setcategory_name, 
        settype, 
        seteditid,
        fetchPrice,
        categories
}) => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;



    useEffect(() => {
        fetchPrice()
    }, []);

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
                                onClick={() => { 
                                    setOpenModel(true)
                                    settype('Add')
                                 }}
                            >
                                Add New Service
                            </button>
                        </div>
                        <table className='styled-table w-[100%] bg-slate-300 py-4 px-8 rounded-xl'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Unit</th>
                                    <th>New Input</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories?.length > 0 && categories?.map((item, index) => (
                                    <tr
                                        className='font-Para text-lg cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item.category_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.unit}</td>
                                        <button
                                            className='w-fit px-4 my-2 bg-green-400 text-white border-2 border-green-400 hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                                            onClick={() => { 
                                                setOpenModel(true) 
                                                setcategory_name(item.category_name)
                                                setprice(item.price)
                                                seteditid(item.category_id)
                                                settype('Edit')
                                            }}
                                        >
                                           Edit
                                        </button>
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