import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

const AssignRequest = ({ toggleMenu, handleLogout }) => {
    const Data = [
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Paid",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Paid",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Sohaib",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        }
    ]

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
                <h2 className='text-lg md:text-xl font-normal'>Assign Request</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='h-[100%] max-h-[100vh] py-10 px-5 md:px-10 m-auto overflow-y-scroll'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>Assign Reqsuest to Radiologist</h2>
                    {/* <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
                        <div className="flex  flex-col gap-8">
                            <div className="flex flex-col md:w-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Radiologist *</label>
                                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                                    <option value="">Select From below drop down</option>
                                    <option value="">Inzama</option>
                                    <option value="">Inzama</option>
                                    <option value="">Inzama</option>
                                    <option value="">Inzama</option>
                                </select>
                            </div>
                            <div className="flex flex-col md:w-[50%] gap-2">
                                <label htmlFor="" className='text-gray-500 text-lg font-normal'>New Request *</label>
                                <select name="" id="" className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                                    <option value="">Select From below drop down</option>
                                    <option value="">Request 1</option>
                                    <option value="">Request 2</option>
                                    <option value="">Request 3</option>
                                    <option value="">Request 4</option>
                                </select>
                            </div>
                        </div>
                        <button className='w-fit px-6  bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'>Assign Request</button>
                    </div> */}

                    <div className='overflow-x-scroll'>
                        <table className='styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Submitted Date</th>
                                    <th>Price</th>
                                    <th>Download File</th>
                                    <th>Radiologist</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Data && Data.length > 0 && Data.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item.ID}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Status}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.Price}</td>
                                        <td className='text-blue-600 underline cursor-pointer'>
                                            <a download={item.UploadedFile}>{item.UploadedFile}</a>
                                        </td>
                                        <td>
                                            <select name="" id="" className="text-base w-full px-2 py-2 text-black border border-solid border-gray-500 rounded-lg">
                                                <option value="">Select Radiologist</option>
                                                <option value="">Inzamam</option>
                                                <option value="">Inzamam</option>
                                                <option value="">Inzamam</option>
                                                <option value="">Inzamam</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className='border-slate-700 border-2 bg-transparent hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-4 m-1 rounded-lg ease-in-out duration-300'

                                            >
                                                Assign
                                            </button>
                                        </td>
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

export default AssignRequest