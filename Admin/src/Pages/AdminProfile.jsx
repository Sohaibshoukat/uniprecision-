import React, { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useContext } from 'react';
import AlertContext from '../Context/Alert/AlertContext';

const AdminProfile = ({ toggleMenu, handleLogout }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleChangePassword = async () => {
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        // Prepare request body
        const requestBody = {
            newPassword: newPassword,
            token: localStorage.getItem('token')
        };
        try {
            const response = await fetch('https://backend.uniprecision.com.my/admin/ChangePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            const data = await response.json();
            if (data.success) {
                setNewPassword('')
                setConfirmPassword('')
                showAlert('Password changed successfully', 'success');
            } else {
                showAlert(data.error, 'danger');
            }
        } catch (error) {
            showAlert(error.error, 'danger');

        }
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
            <h2 className='text-lg md:text-xl font-normal'>Admin Profile</h2>
            <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
        </div>
        <div className='h-[100%] max-h-[100vh] py-10 px-5 md:px-10 m-auto overflow-y-scroll'>
            <div className=''>
                <h2 className='font-Para text-2xl font-bold mb-4'>Profile Setting</h2>
                <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
                    <div className="flex  flex-col gap-[20px] lg:flex-row">
                        <div className="flex flex-col basis-[50%] gap-2">
                            <label htmlFor="" className='text-gray-500 text-lg font-normal'>New Password *</label>
                            <input
                                type="password"
                                placeholder='Your New Password'
                                value={newPassword}
                                className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                onChange={(e) => { setNewPassword(e.target.value) }} />
                        </div>
                        <div className="flex flex-col basis-[50%] gap-2">
                            <label htmlFor="" className='text-gray-500 text-lg font-normal'>Confirm Password *</label>
                            <input
                                type="password"
                                placeholder='Confirm Entered Password'
                                value={confirmPassword}
                                className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </div>
                    </div>
                    <button className='w-fit px-6 self-center bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium' onClick={handleChangePassword}>Update Password</button>
                </div>
            </div>
        </div>
    </>
);
};

export default AdminProfile;
