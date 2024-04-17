import React, { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import AlertContext from '../Context/Alert/AlertContext';
import Pagination from '@mui/material/Pagination';

const Users = ({ toggleMenu, handleLogout }) => {
    // const [searchQuery, setSearchQuery] = useState('');

    const [Users, setUsers] = useState([])

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [TotalPages, setTotalPages] = useState(0)
    const [TotalOrder, setTotalOrder] = useState(0)
    const [page, setPage] = useState(1);
    const ordersPerPage = 20;

    const handleChange = (event, value) => {
        setPage(value);
    };


    const getuser = async () => {
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;

        fetch(`https://backend.uniprecision.com.my/admin/getAllUsers`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.users) {
                    setTotalOrder(data.users.length);
                    setTotalPages(Math.ceil(data.users.length / ordersPerPage));
                    // setData(data.pending_reports);
                    setUsers(data.users.slice(startIndex, endIndex));
                    // setUsers(data.users);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    useEffect(() => {
        getuser()
    }, [page])
    

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
                    h-[100%] max-h-[85vh] pt-10 pb-20 xl:py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Users</h2>
                    <div className="my-4">
                        <Pagination count={TotalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
                    </div>
                    <div className='overflow-x-scroll w-[100%]'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th>Type</th>
                                    <th>Contact Number</th>
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
