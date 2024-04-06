import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AlertContext from '../Context/Alert/AlertContext'
import { convertDateFormat } from '../Component/DateFunction'

const Earning = ({ toggleMenu, handleLogout }) => {
    const [Data, setData] = useState([])
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    useEffect(() => {
        fetch(`https://backend.uniprecision.com.my/admin/allTransactions`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.transactions) {
                    setData(data.transactions);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
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
                <h2 className='text-lg md:text-xl font-normal'>All Earning</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Earning</h2>

<div className='overflow-x-scroll'>
                    <table className='styled-table w-[100%]'>
                        <thead className='font-Para'>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Doctor</th>
                                <th>Amount</th>
                                <th>Senang Pay Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data &&Data?.length>0 && Data?.map((item, index) => (
                                <tr
                                    className='font-Para cursor-pointer'
                                    key={index}
                                >
                                    <td>{item.transaction_id}</td>
                                    <td>{item.name}</td>
                                    <td>RM {item.amount}</td>
                                    <td>{item.transaction_ref}</td>
                                    <td>{convertDateFormat(item.date_generated)}</td>
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

export default Earning
