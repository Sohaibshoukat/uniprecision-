import React, { useContext, useEffect, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import AlertContext from '../Context/Alert/AlertContext';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { MdOutlineAssignmentLate } from 'react-icons/md'
import { GrTransaction } from "react-icons/gr";
import { IoMdPricetags } from 'react-icons/io'
import { ResponsiveBar } from '@nivo/bar'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ toggleMenu, handleLogout }) => {
    const [UserData, setUserData] = useState(null);
    const [Transaction, setTransaction] = useState([])
    const [transactiondata, settransactiondata] = useState(null)
    const [Reports, setReports] = useState(null)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate =useNavigate()

    const User = () => {
        fetch(`https://backend.uniprecision.com.my/admin/getuseranalysis`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setUserData(data);
                    console.log(data)
                }
            })
            .catch(error => showAlert('Error fetching radiologists', 'danger'));
    }

    const Transation = () => {
        fetch(`https://backend.uniprecision.com.my/admin/gettransactionrecord`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setTransaction(data.transactionAnalysis);
                    console.log(data)
                }
            })
            .catch(error => showAlert('Error fetching radiologists', 'danger'));
    }

    const TransactionReport = () => {
        fetch(`https://backend.uniprecision.com.my/admin/gettransactionanalysis`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    settransactiondata(data);
                    console.log(data)
                }
            })
            .catch(error => showAlert('Error fetching radiologists', 'danger'));
    }

    const ReportsData = () => {
        fetch(`https://backend.uniprecision.com.my/admin/getunassignedreport`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setReports(data);
                    console.log(data)
                }
            })
            .catch(error => showAlert('Error fetching radiologists', 'danger'));
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('adminID') && sessionStorage.getItem('role')=='Admin') {
            navigate('/admin-dashboard')
        } else {
            navigate('/login')
        }

    }, [])

    useEffect(() => {
        User()
        Transation()
        TransactionReport()
        ReportsData()
    }, [])


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
                <h2 className='text-lg md:text-xl font-normal'>Admin Dashboard</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <div className=''>
                    <div className="flex flex-col gap-8 h-[100%]">
                        <div className="flex flex-col gap-2">
                            <h2 className='font-Para font-bold text-xl'>Hi! Admin</h2>
                            <p className='font-Para text-base font-light text-gray-500'>5 March, 2024</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            <div className="bg-[#FFE2E5] rounded-2xl py-6 pl-6 pr-2 flex flex-col gap-5">
                                <div className='p-3 bg-[#FA5A7D] rounded-full w-fit flex justify-center items-center'>
                                    <FaUserPlus className='text-white text-2xl' />

                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-Para text-2xl font-bold'>{UserData?.totalappdoctors + UserData?.totalappradio}</h2>
                                    <p className='text-lg font-Para text-gray-500'>Approved Users</p>
                                </div>
                            </div>
                            <div className="bg-[#FFF4DE] rounded-2xl py-6 pl-6 pr-2 flex flex-col gap-5">
                                <div className='p-3 bg-[#FF947A] rounded-full w-fit flex justify-center items-center'>
                                    <FaUserMinus className='text-white text-2xl' />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-Para text-2xl font-bold'>{UserData?.totalunappdoc + UserData?.totalunappradio}</h2>
                                    <p className='text-lg font-Para text-gray-500'>Un-Approved Users</p>
                                </div>
                            </div>
                            <div className="bg-slate-200 rounded-2xl py-6 pl-6 pr-2 flex flex-col gap-5">
                                <div className='p-3 bg-gray-500 rounded-full w-fit flex justify-center items-center'>
                                    <MdOutlineAssignmentLate className='text-white text-2xl' />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-Para text-2xl font-bold'>{Reports?.UnAssignedReport}</h2>
                                    <p className='text-lg font-Para text-gray-500'>Un-Assigned Reports</p>
                                </div>
                            </div>
                            <div className="bg-[#DCFCE7] rounded-2xl py-6 pl-6 pr-2 flex flex-col gap-5">
                                <div className='p-3 bg-[#3CD856] rounded-full w-fit flex justify-center items-center'>
                                    <GrTransaction className='text-white text-2xl' />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-Para text-2xl font-bold'>{transactiondata?.totaltransaction}</h2>
                                    <p className='text-lg font-Para text-gray-500'>Number of Transactions</p>
                                </div>
                            </div>
                            <div className="bg-[#F3E8FF] rounded-2xl py-6 pl-6 pr-2 flex flex-col gap-5">
                                <div className='p-3 bg-[#BF83FF] rounded-full w-fit flex justify-center items-center'>
                                    <IoMdPricetags className='text-white text-2xl' />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-Para text-2xl font-bold'>{transactiondata?.totalEarning}</h2>
                                    <p className='text-lg font-Para text-gray-500'>Transactions Amount</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-boxshade py-6 px-6">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className='font-Para font-bold text-2xl'>Transaction Records</h2>
                            </div>
                            <div className='w-[100%] h-[300px]'>
                                <ResponsiveBar
                                    data={Transaction}
                                    keys={[
                                        'Transactions',
                                        'Amount'
                                    ]}
                                    indexBy="month"
                                    margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                                    padding={0.3}
                                    groupMode="grouped"
                                    valueScale={{ type: 'linear' }}
                                    indexScale={{ type: 'band', round: true }}
                                    borderRadius={4}
                                    colors={{ scheme: 'accent' }}
                                    defs={[
                                        {
                                            id: 'dots',
                                            type: 'patternDots',
                                            background: 'inherit',
                                            color: '#000000',
                                            size: 6,
                                            padding: 1,
                                            stagger: true
                                        },
                                        {
                                            id: 'lines',
                                            type: 'patternLines',
                                            background: 'inherit',
                                            color: '#000000',
                                            rotation: -45,
                                            lineWidth: 8,
                                            spacing: 10
                                        }
                                    ]}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                1.6
                                            ]
                                        ]
                                    }}
                                    axisTop={null}
                                    axisRight={null}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard