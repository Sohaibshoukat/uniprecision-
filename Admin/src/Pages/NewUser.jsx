import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect } from 'react'
import { useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import AlertContext from '../Context/Alert/AlertContext'

const NewUser = ({ toggleMenu, handleLogout, OpenModel, setOpenModel }) => {
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

    const [userrole, setuserrole] = useState('Doctor')


    const getuser = async () => {
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        if (userrole == 'Doctor') {
            fetch(`https://backend.uniprecision.com.my/admin/getNewDoctors`) // Assuming this is the correct endpoint
                .then(response => {
                    if (!response.ok) {
                        showAlert('Network response was not ok', 'danger');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.approvedDoctors) {
                        // setUsers(data.approvedDoctors);
                        setTotalOrder(data.approvedDoctors.length);
                        setTotalPages(Math.ceil(data.approvedDoctors.length / ordersPerPage));
                        // setData(data.pending_reports);
                        setUsers(data.approvedDoctors.slice(startIndex, endIndex));
                    }
                })
                .catch(error => {
                    showAlert('Error fetching categories', 'danger');
                });
        } else if (userrole == 'Radiologist') {
            fetch(`https://backend.uniprecision.com.my/admin/getnewRadiologist`) // Assuming this is the correct endpoint
                .then(response => {
                    if (!response.ok) {
                        showAlert('Network response was not ok', 'danger');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.approvedRadio) {
                        // setUsers(data.approvedRadio);
                        setTotalOrder(data.approvedRadio.length);
                        setTotalPages(Math.ceil(data.approvedRadio.length / ordersPerPage));
                        // setData(data.pending_reports);
                        setUsers(data.approvedRadio.slice(startIndex, endIndex));
                    }
                })
                .catch(error => {
                    showAlert('Error fetching categories', 'danger');
                });
        }
    }

    useEffect(() => {
        getuser()
    }, [userrole, page])

    const ApproveUser = (user_id) => {
        const apiUrl = 'https://backend.uniprecision.com.my/admin/updateUserStatus';
        const bodyData = {
            user_id: user_id
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        };
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                showAlert(`${userrole} Approved`, 'success')
                getuser()
            })
            .catch(error => {
                showAlert(error.message, 'danger'); // Handle errors here
            });
    };




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
                    h-[100%] max-h-[85vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>New User Request</h2>


                    <div className='flex flex-row justify-between items-center'>
                        <select name="" id="" value={userrole} onChange={(e) => { setuserrole(e.target.value) }} className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'>
                            <option value="Doctor">Doctor</option>
                            <option value="Radiologist">Radiologist</option>
                        </select>
                        <Pagination count={TotalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
                    </div>

                    <div className='overflow-x-scroll'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th>Type</th>
                                    <th>Contact Number</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.address_line_1}, {item?.state}</td>
                                        <td>{item?.role}</td>
                                        <td>{item?.guest_type}</td>
                                        <td>{item?.mobile_number}</td>
                                        <td>
                                            <button
                                                className='w-fit px-4 self-center bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-1  rounded-lg ease-in-out duration-300 hover:text-darkblue text-lg font-medium'
                                                onClick={() => { ApproveUser(item?.user_id) }}
                                            >
                                                Approve
                                            </button>
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