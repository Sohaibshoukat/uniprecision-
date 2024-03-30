import React, { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import AlertContext from '../Context/Alert/AlertContext';

const Users = ({ toggleMenu, handleLogout }) => {
    // const [searchQuery, setSearchQuery] = useState('');

    const [Users, setUsers] = useState([])

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const getuser = async () => {
        fetch(`https://backend.uniprecision.com.my/admin/getAllUsers`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.users) {
                    setUsers(data.users);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    useEffect(() => {
        getuser()
    }, [])
    

    // Filter the UserData based on search query
    // const filteredData = UserData.filter(item =>
    //     item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.Total.includes(searchQuery)
    // );

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
                <h2 className='text-lg md:text-xl font-normal'>All User</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>


            <div
                className='
                    h-[100%] max-h-[100vh] pt-10 pb-20 xl:py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Users</h2>

                    {/* <div className='flex flex-row justify-between'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'
                        />
                    </div> */}

                    <div className='overflow-x-scroll w-[100%]'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Role</th>
                                    <th>Type</th>
                                    <th>Num</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users.map((item, index) => (
                                    <>
                                        <tr
                                            className={`font-Para cursor-pointer ${item?.role=='Admin' && 'hidden'}`}
                                            key={index}
                                        >
                                            <td>{item?.name}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.address_line_1}, {item?.state}</td>
                                            <td>{item?.role}</td>
                                            <td>{item?.guest_type}</td>
                                            <td>{item?.mobile_number}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;
