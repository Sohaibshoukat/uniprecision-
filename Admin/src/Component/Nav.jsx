import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing useLocation
import { GrClose } from 'react-icons/gr';
import { IoIosLogOut, IoMdPricetags } from 'react-icons/io';
import { BsCalendar4Event } from 'react-icons/bs';
import { RiProfileLine } from "react-icons/ri"
import {FaMoneyBillAlt, FaUserFriends, FaUserPlus, FaUserTimes} from 'react-icons/fa'
import {FaUserCheck} from 'react-icons/fa6'
import {MdAssignmentAdd} from 'react-icons/md'

const Nav = ({ isMenuOpen, setIsMenuOpen, toggleMenu }) => {
    const location = useLocation();
    const navigate= useNavigate(); // Using useLocation hook to get the current location

    const tabs = [
        {
            name: 'Dashboard',
            Icon: BsCalendar4Event,
            link: '/admin-dashboard', 
        },
        {
            name: 'Assign Request',
            Icon: MdAssignmentAdd,
            link: '/admin-dashboard/assign-request', 
        },
        {
            name: 'Add New User',
            Icon: FaUserPlus,
            link: '/admin-dashboard/new-user', 
        },
        {
            name: 'All User',
            Icon: FaUserFriends,
            link: '/admin-dashboard/all-user', 
        },
        {
            name: 'Approved User',
            Icon: FaUserCheck,
            link: '/admin-dashboard/approved-user', 
        },
        {
            name: 'User Request',
            Icon: FaUserTimes,
            link: '/admin-dashboard/user-request', 
        },
        {
            name: 'Earning',
            Icon: FaMoneyBillAlt,
            link: '/admin-dashboard/earning', 
        },
        {
            name: 'Pricings',
            Icon: IoMdPricetags,
            link: '/admin-dashboard/pricings', 
        },
        {
            name: 'Admin Profile',
            Icon: RiProfileLine,
            link: '/admin-dashboard/admin-profile', 
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("adminID")
        navigate('/login');
    };

    return (
        <div className={`md:flex flex-col relative top-0 left-0 min-h-[100vh]`} style={{overflow:"unset"}}>
            <div className="flex-col absolute z-50 top-[3%] right-[-20%] md:mt-0 lg:hidden">
                <button
                    type="button"
                    className="p-2 text-black text-4xl md:text-5xl focus:outline-none lg:hidden "
                    onClick={()=>{setIsMenuOpen(!isMenuOpen);}}
                >
                    <GrClose />
                </button>
            </div>
            <div className="flex basis-[5%] py-2 h-[10%] items-center justify-center pr-2  bg-slate-700 border-slate-700">
                <img
                    src='../assets/Logo.png'
                    alt="User avatar"
                    className="w-[130px] h-[100%]"
                />
            </div>
            <ul className="pb-4">
                {tabs.map((tab, index) => (
                    <Link key={index} to={tab.link}> {/* Using Link component */}
                        <li
                            className={`
                px-4 md:px-6 py-4 cursor-pointer font-medium text-white text-base 
                ${location.pathname === tab.link && 'bg-black text-white'} 
                ${location.pathname === tab.link ? 'hover:text-white hover:bg-black' : 'hover:text-white'}
                ease-in-out duration-300`
                            }
                        >
                            <div className="flex flex-row gap-4 items-center">
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
    )
}

export default Nav