import React, { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import AlertContext from '../../Context/Alert/AlertContext';

const NewReport = ({ handleLogout, toggleMenu }) => {
    const [Price, setPrice] = useState(0)
    const Service = [
        {
            "service": "XR (1 view) reported by subspecialist",
            "price": 200
        },
        {
            "service": "Relevant XR (1 view) reported by subspecialist",
            "price": 200
        },
        {
            "service": "XR (multiple views of 1 region) reported by subspecialist",
            "price": 200
        },
        {
            "service": "CT (1 region) reported by Subspecialist",
            "price": 200
        },
        {
            "service": "Mammogram reported by subspecialist",
            "price": 200
        },
        {
            "service": "MRI (1 Region) Reported by Subspecialist",
            "price": 200
        },
        {
            "service": "CT Coronary Angiogram reported by Subspecialist",
            "price": 200
        },
        {
            "service": "Film Audit / Image Quality Assessment (MOH requirements for QAP)",
            "price": 200
        }
    ];


    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [formData, setFormData] = useState({
        doctor_id: 2,
        category_id: '',
        date_generated: new Date().toISOString(),
        patient_name: '',
        dob: '',
        nric_passport_no: '',
        clinical_summary_title: '',
        age: '',
        gender: '',
        previous_study: '',
        file: null
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/doctor/order', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('New Request Created', 'success');
                setFormData({ ...formData, patient_name: '', dob: '', nric_passport_no: '', clinical_summary_title: '', age: '', gender: '', previous_study: '', file: null });
            } else {
                showAlert(data.error, 'danger')
            }
        } catch (error) {
            showAlert(error.error, 'danger')
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
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
                <h2 className='text-lg md:text-xl font-normal'>Request New Reports</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <h1 className='text-2xl font-Para font-semibold'>New Service Request form</h1>
                <p className='text-sm font-Para'>Complete the following and submit</p>
                <div className='bg-white shadow-2xl w-full my-10 py-2 rounded-lg px-8'>
                    {/* Your form content */}
                    {Price > 0 &&
                        <h2 className='font-Para text-base'>{Price}$</h2>}
                    <form onSubmit={handleFormSubmit}>
                        <div className='grid md:grid-cols-2 gap-6 mt-10 grid-cols-1'>
                            <h2 className='text-xl font-medium  font-Para'>Patient Data</h2>
                            <div></div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Patient Name</label>
                                <input type="text" name="patient_name" value={formData.patient_name} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Date Of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg '>
                                    <option selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Age</label>
                                <input type='number' name="age" value={formData.age} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>NRIC/Passport No</label>
                                <input type='text' name="nric_passport_no" value={formData.nric_passport_no} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                        </div>

                        {/* Request Data */}
                        <div className='grid md:grid-cols-2 gap-8 mt-10 grid-cols-1'>
                            <h2 className='text-xl font-medium  font-Para'>Report Request</h2>
                            <div></div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Examination Date *</label>
                                <input type='date' name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>

                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Uni Clinic *</label>
                                <input type='text' name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Request Type *</label>
                                <select
                                    name="clinical_summary_title"
                                    value={formData.clinical_summary_title}
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            'clinical_summary_title': e.target.value
                                        });
                                    }}
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                >
                                    <option value="">Please Select from the List below</option>
                                    {Service.map((item, index) => (
                                        <option
                                            value={item.service}
                                            onClick={() => (setPrice(item.price))}
                                            key={index}
                                        >
                                            {item.service}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Previous History (If any)</label>
                                <input type='text' name="previous_study" value={formData.previous_study} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                                <p className='text-red-600 text-base'>Please provide the company study indication and other relevant patient history which are essential for radiologist diagnosis</p>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className='mt-5'>
                            <p className='text-base text-gray-500 my-2'>
                                Upload Study Image File (file type DICOM or DICOM files in ZIP, RAR)
                                <span className='text-red-600 font-bold'>Please upload DICOM (.dem) files only.</span>
                            </p>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="" className='font-Para text-base'>Add Image</label>
                                <input
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                    type='file'
                                    onChange={handleFileChange}
                                    accept='image/*'
                                />
                            </div>
                            <p className='text-red-600 text-base font-bold'>Examination / Study Image file is mandatory for the reading specialist to report</p>
                            <p className='text-base text-gray-500 my-2'>
                                To upload more than one file, create a single ZIP or RAR file containing all the DICOM image files you want to upload.
                            </p>
                            <p className='text-base text-gray-500 my-2'>
                                To upload the content of your examination CD/DVD, select all the CD/DVD content and create a ZIP or RAR file. Upload the ZIP / RAR.
                            </p>
                            <div className='flex flex-row gap-2 my-2'>
                                <input type="checkbox" />
                                <span>I hereby confirm the above service request (agreeing to this constitutes a purchase order)</span>
                            </div>
                        </div>

                        {/* Button Submit */}
                        <div className='flex flex-col justify-end w-[100%] '>
                            <button type="submit" className='bg-slate-700 border-2 border-slate-700 hover:bg-transparent hover:text-slate-700 text-white ease-in-out duration-300 w-fit py-2 px-4 text-lg font-Para font-medium mt-6 rounded-lg'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewReport;