import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'

const NewReport = ({ handleLogout, toggleMenu }) => {
    const [imageSrc, setImageSrc] = useState('');
    const [fileName, setFileName] = useState('');

    const readURL = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImageSrc(e.target.result);
                setFileName(input.files[0].name);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    const [Price, setPrice] = useState(0)

    const removeUpload = () => {
        setImageSrc('');
        setFileName('');
    };


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
                    {Price > 0 && <h3 className='font-Para float-right text-2xl font-bold'>Price: <span className='font-light'>{Price}$</span> </h3>}

                    {/* Patient Records */}
                    <div className='grid md:grid-cols-2 gap-6 mt-10 grid-cols-1'>
                        <h2 className='text-xl font-medium  font-Para'>Patient Data</h2>
                        <div></div>
                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Study info - Reason for study / Clinical Info</label>
                            <input name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                        </div>
                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Date Of Birth</label>
                            <input name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                        </div>
                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Gender</label>
                            <select name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg '>
                                <option selected>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Fe-male</option>
                            </select>
                        </div>
                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Age</label>
                            <input type='number' name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                        </div>
                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>NRIC/Passport No</label>
                            <input type='text' name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                        </div>
                    </div>

                    {/* Request Data */}
                    <div className='grid md:grid-cols-2 gap-8 mt-10 grid-cols-1'>

                        <h2 className='text-xl font-medium  font-Para'>Report Request</h2>
                        <div></div>

                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Request Type *</label>
                            <select value={Price} onChange={(e) => { setPrice(e.target.value) }} name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg '>
                                <option value="">Please Select from the List below</option>
                                {Service.map((item, index) => (
                                    <option value={item.price} key={index}>{item.service}</option>
                                ))}
                            </select>
                        </div>

                        {/* <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Request date and time *</label>
                            <select name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg '>
                                <option selected>Please Select from the List below</option>
                                <option value="Chest X-Ray – 1 view">Chest X-Ray – 1 view</option>
                                <option value="XR - Multiple views of 1 region">XR - Multiple views of 1 region,</option>
                                <option value="CT – 1 Region">CT – 1  Region</option>
                            </select>
                        </div> */}

                        <div className='w-[100%] flex flex-col'>
                            <label htmlFor="" className='font-Para text-base'>Previous History (If any)</label>
                            <input name="" id="" className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            <p className='text-red-600 text-base'>Please provide the company study indication and other relevant patient history which are essential for radiologist diagnosis</p>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className='mt-5'>
                        <p className='text-base text-gray-500 my-2'>
                            Upload Stidy image File (file type DICOM or DICOM files in ZIP, RAR)
                            <span className='text-red-600 font-bold'>Please upload DICOM (.dem) files only.</span>
                        </p>
                        <label htmlFor='file-upload' className='cursor-pointer'>
                            <div className='bg-slate-700 text-white w-[100%] py-2 px-4 rounded-md transition-all duration-300 hover:bg-black'>
                                Add Image
                            </div>
                            <input
                                id='file-upload'
                                type='file'
                                className='hidden'
                                onChange={(e) => readURL(e.target)}
                                accept='image/*'
                            />
                        </label>
                        <p className='text-red-600 text-base font-bold'>Examination / Study Image file is mandatory for the reading specialist to report</p>
                        <p className='text-base text-gray-500 my-2'>
                            To upload more then file, create a single ZIP or RAR file containing all the DICOM image files you want to uploas
                        </p>
                        <p className='text-base text-gray-500 my-2'>
                            To upload the content of your examination CD/DVD, select all the CD/DVD content and create a ZIP or RAR file Upload the ZIP / RAR
                        </p>
                        <div className={`image-upload-wrap mt-4 ${imageSrc ? 'hidden' : 'block'}`}>
                            <div className='drag-text'>
                                <h3 className='text-base font-Para font-normal'>Drag and drop a file or select add Image</h3>
                            </div>
                        </div>

                        <div className={`file-upload-content ${imageSrc ? 'block' : 'hidden'}`}>
                            <img className='file-upload-image max-h-200 max-w-200 mx-auto p-4' src={imageSrc} alt='your image' />
                            <div className='image-title-wrap'>
                                <button
                                    type='button'
                                    onClick={removeUpload}
                                    className='remove-image bg-lightblue text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-red-600'
                                >
                                    Remove <span className='image-title'>Uploaded Image</span>
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 my-2'>
                            <input type="checkbox" />
                            I hereby confirm the above service request (agreeing to this constitue a purchae order)
                        </div>
                    </div>

                    {/* Button Submit */}
                    <div className='flex flex-col justify-end w-[100%] '>
                        <button className='bg-slate-700 border-2 border-slate-700 hover:bg-transparent hover:text-slate-700 text-white ease-in-out duration-300 w-fit py-2 px-4 text-lg font-Para font-medium mt-6 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewReport;
