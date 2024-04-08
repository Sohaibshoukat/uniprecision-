import React, { useContext, useState } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';

const PasswordUpdate = () => {
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const updatePassword = async () => {
        const userId = localStorage.getItem('userid');
        if(Password==ConfirmPassword){
            showAlert('Both Password should be same','success')
        }

        try {
            const response = await fetch(`https://backend.uniprecision.com.my/guest/update-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: Password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('Password updated successfully', 'success');
                setPassword('');
                setConfirmPassword('')
            } else {
                showAlert(data.error, 'danger');
            }

        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <div className='px-5 md:px-10 m-auto'>
            <div className=''>
                <h2 className='font-Para text-2xl font-bold mb-2'>Password Setting</h2>

                <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
                    <div className="flex flex-col gap-[20px] lg:flex-row">
                        <div className="flex flex-col basis-[50%] gap-2">
                            <label htmlFor="" className='text-gray-500 text-lg font-normal'>Password *</label>
                            <input
                                type="password"
                                placeholder='*****'
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                        </div>
                        <div className="flex flex-col basis-[50%] gap-2">
                            <label htmlFor="" className='text-gray-500 text-lg font-normal'>Confirm Password *</label>
                            <input
                                type="password"
                                placeholder='*****'
                                value={ConfirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                        </div>
                    </div>

                    <button
                        className='w-full bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                        onClick={() => {
                            updatePassword()
                        }}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PasswordUpdate