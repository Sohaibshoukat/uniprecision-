import React, { useContext, useEffect, useState } from 'react';
import { GrClose } from "react-icons/gr"
import { LuLayoutTemplate } from "react-icons/lu"
import { BsCalendar4Event } from "react-icons/bs"
import { MdOutlineFeed } from "react-icons/md"
import { IoIosLogOut } from "react-icons/io"
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {HiOutlineDocumentReport} from "react-icons/hi"
import AllReports from '../../Components/Doctors/AllReports';
import NewReport from '../../Components/Doctors/NewReport';
import Transaction from '../../Components/Doctors/transaction';
import UserAccount from '../../Components/Doctors/UserAccount';
import ReportDetails from '../../Components/Doctors/ReportDetails';
import AlertContext from '../../Context/Alert/AlertContext';
import AllPaidReports from '../../Components/Doctors/AllPaidReports';


function Dashboard() {

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const location = useLocation();

    const navigate = useNavigate();

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('doctorId')
        localStorage.removeItem('userid')
        localStorage.removeItem('RadioId')
        navigate('/');
    };

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('role') == 'Doctor') {
            return
        } else {
            navigate("/login")
        }
    }, [])

    const fetchDoctorId = async () => {
        try {
            const userId = localStorage.getItem('userid'); // Assuming you have stored userId in localStorage
            const response = await fetch(`https://backend.uniprecision.com.my/doctor/getDoctorId/${userId}`);
            if (response.ok) {
                const data = await response.json();
                const { doctorId } = data;
                localStorage.setItem('doctorId', doctorId); 
            } else {
                showAlert('Failed to fetch doctorId','danger');
            }
        } catch (error) {
            showAlert('Error fetching doctor', 'danger');
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchDoctorId();
    }, []);

    const tabs = [
        {
            name: 'All Reports',
            Icon: BsCalendar4Event,
            Link:'/docDashboard'
        },
        {
            name: 'All Paid Reports',
            Icon: BsCalendar4Event,
            Link:'/docDashboard/all-paid'
        },
        {
            name: 'New Request',
            Icon: LuLayoutTemplate,
            Link:'/docDashboard/new-request'
        },
        {
            name: 'Transactions Receipts',
            Icon: MdOutlineFeed,
            Link:'/docDashboard/transactions'
        },
        {
            name: 'User Account',
            Icon: HiOutlineDocumentReport,
            Link:'/docDashboard/account-setting'
        }
    ];


    return (
        <>
            <div className="flex h-screen overflow-hidden">

                {/* Left Pane  */}
                <div className={`lg:basis-[30%] xl:basis-[15%] z-50 absolute lg:relative w-[80%] md:w-[55%]  h-[100%] ${isMenuOpen && 'hidden'}  lg:block lg:w-auto bg-slate-700`}>
                    <div className={`md:flex flex-col relative top-0 left-0 h-full `}>
                        <div className="flex-col absolute top-[3%] right-[-20%] md:mt-0 lg:hidden">
                            <button
                                type="button"
                                className="p-2 text-black text-4xl md:text-5xl focus:outline-none lg:hidden "
                                onClick={toggleMenu}
                            >
                                <GrClose />
                            </button>
                        </div>
                        <div className="flex basis-[5%] py-2 h-[20%] items-center justify-center pr-2 bg-slate-700 border-slate-700">
                            <img
                                src='../Logo.png'
                                alt="User avatar"
                                className="w-auto h-[100%]"
                            />
                        </div>
                        <ul className='pb-4'>
                            {tabs.map((tab, index) => (
                                <Link to={tab.Link}>
                                <li
                                    key={index}
                                    className={`
                                        px-4 md:px-6 py-4 cursor-pointer font-medium text-white text-base 
                                        ${location.pathname === tab.Link && 'bg-black text-white'} 
                                        ${location.pathname === tab.Link ? 'hover:text-white  hover:bg-black' : 'hover:text-white'}
                                        ease-in-out duration-300`
                                    }
                                >
                                    <div className='flex flex-row gap-4 items-center'>
                                        <tab.Icon />
                                        {tab.name}
                                    </div>
                                </li>
                                </Link>
                            ))}

                        </ul>
                        <div
                            type="button"
                            className="absolute flex flex-row items-center gap-4 bottom-0 left-0 w-full px-4 py-4 font-semibold  text-base bg-black text-white hover:bg-slate-900 ease-in-out duration-300"
                            onClick={handleLogout}
                        >
                            <IoIosLogOut className='text-2xl' />
                            Logout
                        </div>
                    </div>
                </div>

                {/* Right pane */}
                <div className="basis-[100%] lg:basis-[68%] xl:basis-[85%] w-[100%]  overflow-y-scroll overflow-x-hidden relative">
                <Routes>
                        <Route
                            path="/"
                            element={<AllReports toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/all-paid"
                            element={<AllPaidReports toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/new-request"
                            element={<NewReport toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/account-setting"
                            element={<UserAccount toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/transactions"
                            element={<Transaction toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/ReportDetail"
                            element={<ReportDetails toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                    </Routes>
                </div>
            </div>
        </>

    );
}

export default Dashboard;
