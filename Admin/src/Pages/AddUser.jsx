import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useContext } from 'react';
import AlertContext from '../Context/Alert/AlertContext';
import { StateData } from '../Constant/StateData';

const AddUser = ({ toggleMenu, handleLogout }) => {
    const [userType, setUserType] = useState('');
    const [userorg, setuserorg] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        mobile_number: '',
        email: '',
        password: '',
        address_line_1: '',
        address_line_2: '',
        postcode: '',
        city: '',
        state: '',
        country: ''
    });

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set role based on userType
        formData.role = userType;

        try {
            const apiUrl = userType === 'Doctor' ? '/adddoctor' : '/addradiologist';
            const response = await fetch(`https://backend.uniprecision.com.my/admin/${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('User Created Successfully', 'success')
                setFormData({
                    ...formData, 
                    name: '',
                    organization: '',
                    mobile_number: '',
                    email: '',
                    password: '',
                    address_line_1: '',
                    address_line_2: '',
                    postcode: '',
                    city: '',
                    state: '',
                    country: ''
                });
            } else {
                showAlert(data.error, 'danger')
            }
        } catch (error) {
            showAlert(error.message, 'danger')
        }
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <h2 className='text-lg md:text-xl font-normal'>New User</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div
                className='
                    h-[100%] max-h-[100vh] py-10 px-5 
                    md:px-10 m-auto overflow-y-scroll
                '
            >
                <h2 className='font-Para text-2xl font-bold mb-2'>Add New Doctor/Radiologist</h2>
                <p className='text-gray-500 text-xl font-medium'>Please fill below form to add new user</p>

                <form onSubmit={handleSubmit}>
                    <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>

                        <div className='flex flex-col gap-4'>
                            <label htmlFor="" className='text-gray-500 text-xl font-normal'>User Type</label>
                            <div className='flex flex-row gap-4'>
                                <div className="flex flex-row gap-2">
                                    <input type="radio" required name="userType" id='Doctor' value="Doctor" onChange={handleUserTypeChange} />
                                    <label htmlFor="Doctor" className='text-gray-500 text-lg font-normal'>Doctor</label>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <input type="radio" required name="userType" id='Radiologist' value="Radiologist" onChange={handleUserTypeChange} />
                                    <label htmlFor="Radiologist" className='text-gray-500 text-lg font-normal'>Radiologist</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[20px] lg:flex-row">
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Name *</label>
                                <input
                                    type="text"
                                    placeholder='Your Name'
                                    name='name'
                                    id='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                />
                            </div>
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Mobile Number *</label>
                                <input
                                    type="text"
                                    name='mobile_number'
                                    id='mobile_number'
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    placeholder='+00000000000'
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
                            <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Email *</label>
                            <input
                                type="email"
                                placeholder='abc@gmail.com'
                                name='email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                            />
                        </div>
                        <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
                            <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Password *</label>
                            <input
                                type="password"
                                placeholder='****'
                                name='password'
                                id='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                            />
                        </div>
                        <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
                            <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 1 *</label>
                            <input
                                type="text"
                                placeholder='ABC clinic'
                                name='address_line_1'
                                id='address_line_1'
                                value={formData.address_line_1}
                                onChange={handleChange}
                                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                            />
                        </div>
                        <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
                            <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 2</label>
                            <input
                                type="text"
                                placeholder='Gound flour Sublot 23'
                                name='address_line_2'
                                id='address_line_2'
                                value={formData.address_line_2}
                                onChange={handleChange}
                                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                            />
                        </div>
                        <div className="flex  flex-col gap-[20px] lg:flex-row">
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Postcode *</label>
                                <input
                                    type="text"
                                    placeholder='Your PostCode'
                                    name='postcode'
                                    id='postcode'
                                    value={formData.postcode}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                />
                            </div>
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>City *</label>
                                <input
                                    type="text"
                                    placeholder='City'
                                    name='city'
                                    id='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                />
                            </div>
                        </div>
                        <div className="flex  flex-col gap-[20px] lg:flex-row">
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>State *</label>
                                <select
                                    name='state'
                                    id='state'
                                    value={formData.state}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md '
                                >
                                    <option value="">Select from below</option>
                                    {StateData.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Country *</label>
                                <select
                                    name='country'
                                    id='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                >
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="UK">UK</option>
                                    <option value="US">US</option>
                                    <option value="Canada">CANADA</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex  flex-col gap-[20px] lg:flex-row">
                            <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>User type *</label>
                                <select
                                    name=""
                                    id=""
                                    onChange={(e) => { setuserorg(e.target.value) }}
                                    value={userorg}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                >
                                    <option value="">Select Option</option>
                                    <option value="Organization">Organization</option>
                                    <option value="Personal">Personal</option>
                                </select>
                            </div>
                            {userorg == 'Organization' && <div className="flex flex-col basis-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Organization *</label>
                                <input
                                    type="text"
                                    placeholder='Your Orgainization'
                                    name='organization'
                                    id='organization'
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'
                                />
                            </div>}
                        </div>
                        <button className='w-full bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddUser