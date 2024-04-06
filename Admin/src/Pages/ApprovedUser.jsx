import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect } from 'react'
import { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext'

const ApprovedUser = ({ toggleMenu, handleLogout, OpenModel, setOpenModel }) => {
    // const [searchQuery, setSearchQuery] = useState('');


    const [Users, setUsers] = useState([])

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [userrole, setuserrole] = useState('Doctor')


    const getuser = async () => {
        if (userrole == 'Doctor') {
            fetch(`http://localhost:3000/admin/getAllApprovedDoctors`) // Assuming this is the correct endpoint
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        showAlert('Network response was not ok', 'danger');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.approvedDoctors) {
                        setUsers(data.approvedDoctors);
                    }
                })
                .catch(error => {
                    console.log(error)
                    showAlert('Error fetching categories', 'danger');
                });
        } else if (userrole == 'Radiologist') {
            fetch(`http://localhost:3000/admin/getAllApprovedRadiologist`) // Assuming this is the correct endpoint
                .then(response => {
                    if (!response.ok) {
                        showAlert('Network response was not ok', 'danger');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.approvedRadio) {
                        setUsers(data.approvedRadio);
                    }
                })
                .catch(error => {
                    showAlert('Error fetching categories', 'danger');
                });
        }
    }

    useEffect(() => {
        getuser()
    }, [userrole])


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
                <h2 className='text-lg md:text-xl font-normal'>Approved Users</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
            h-[100%] max-h-[100vh] py-10 px-5 
            md:px-10 m-auto overflow-y-scroll
        '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Approved Users</h2>

                    <div className='flex flex-row justify-between'>
                        <select name="" id="" value={userrole} onChange={(e)=>{setuserrole(e.target.value)}} className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'>
                            <option value="Doctor">Doctor</option>
                            <option value="Radiologist">Radiologist</option>
                        </select>
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

export default ApprovedUser