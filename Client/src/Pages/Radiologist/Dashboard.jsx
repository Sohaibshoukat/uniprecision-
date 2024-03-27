import React, { useContext, useEffect, useState } from 'react';

import { GrClose } from "react-icons/gr"
import { LuLayoutTemplate } from "react-icons/lu"
import { BsCalendar4Event } from "react-icons/bs"
import { IoIosLogOut } from "react-icons/io"
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineDocumentReport } from "react-icons/hi"

import UserAccount from '../../Components/Radiologist/UserAccount';
import AllNewFiles from '../../Components/Radiologist/AllNewFiles';
import AllPreviousReport from '../../Components/Radiologist/AllReports';
import FillReport from '../../Components/Radiologist/FillReport';
import AlertContext from '../../Context/Alert/AlertContext';
import ReportDetails from '../../Components/Radiologist/ReportDetails';


function RadioDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const location = useLocation();

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchRadioId = async () => {
        try {
            const userId = localStorage.getItem('userid'); // Assuming you have stored userId in localStorage
            const response = await fetch(`http://localhost:3000/radiologist/getRadioId/${userId}`);
            if (response.ok) {
                const data = await response.json();
                const { radioId } = data;
                localStorage.setItem('RadioId', radioId); 
            } else {
                showAlert('Failed to fetch Radio Id','danger');
            }
        } catch (error) {
            showAlert('Error fetching Radilogist', 'danger');
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchRadioId();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('doctorId')
        localStorage.removeItem('userid')
        localStorage.removeItem('RadioId')
        navigate('/');
    };

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('role') == 'Radiologist') {
            return
        } else {
            navigate("/login")
        }
    }, [])


    const tabs = [
        {
            name: 'New Request',
            Icon: BsCalendar4Event,
            Link: '/radioDashboard/',
        },
        {
            name: 'Reports Archive',
            Icon: LuLayoutTemplate,
            Link: '/radioDashboard/previous-reports',
        },
        {
            name: 'User Account',
            Icon: HiOutlineDocumentReport,
            Link: '/radioDashboard/account-setting'
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
                        <div className="flex basis-[10%] py-2 h-[20%] items-center justify-center pr-2 bg-slate-700 border-slate-700">
                            <img
                                src='../Logo.png'
                                alt="User avatar"
                                className="w-auto h-[100%]"
                            />
                        </div>
                        <ul className='pb-4'>
                            {tabs.map((tab, index) => (
                                <Link to={tab.Link} key={index}>
                                    <li
                                        key={tab.name}
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
                            element={<AllNewFiles toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/previous-reports"
                            element={<AllPreviousReport toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/account-setting"
                            element={<UserAccount toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/fill-report"
                            element={<FillReport toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
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

export default RadioDashboard;
