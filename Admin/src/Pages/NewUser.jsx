import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

const NewUser = ({ toggleMenu, handleLogout, OpenModel, setOpenModel }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const UserData = [
        {
            Name: "Inzamam",
            Type: "Doctor",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Radiologist",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Doctor",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Radiologist",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Doctor",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Radiologist",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Doctor",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        },
        {
            Name: "Inzamam",
            Type: "Radiologist",
            Status: "Not Approved",
            Email: "Inzamam@gmail.coms",
            Location: "892 New York CIty, US",
        }
    ]

    // Filter the UserData based on search query
    const filteredData = UserData.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Total.includes(searchQuery)
    );
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
                <h2 className='text-lg md:text-xl font-normal'>Reuested Users</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Users</h2>

                    <div className='flex flex-row justify-between'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'
                        />
                    </div>

                    <div className='overflow-x-scroll'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item.Name}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Location}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Status}</td>
                                        <td>
                                            <button
                                                className='w-fit px-4 self-center bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-1  rounded-lg ease-in-out duration-300 hover:text-darkblue text-lg font-medium'
                                            >Approve</button>
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

export default NewUser