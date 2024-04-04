import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import AlertContext from '../../Context/Alert/AlertContext'
import { convertDateFormat } from '../DateFunction'

const Transaction = ({ handleLogout, toggleMenu }) => {
    const [Data, setData] = useState([])
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    useEffect(() => {
        fetch(`https://backend.uniprecision.com.my/doctor/doctorTransactions/${localStorage.getItem('doctorId')}}`) // Assuming this is the correct endpoint
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
                <h2 className='text-lg md:text-xl font-normal'>All Transaction</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <div className=''>
                    <h2 className='font-Para text-3xl font-bold mb-4'>All Transaction History</h2>
                    <div className='overflow-x-scroll w-[100%]'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Lora'>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Transaction Ref</th>
                                    <th>Amount</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Data.map((item, index) => (
                                    <tr className='font-Para'>
                                        <td>{item.transaction_id}</td>
                                        <td>{item.transaction_ref}</td>
                                        <td>{item.amount}</td>
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

export default Transaction