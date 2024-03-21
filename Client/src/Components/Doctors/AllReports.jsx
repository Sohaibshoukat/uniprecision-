import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const AllReports = ({ handleLogout, toggleMenu }) => {
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

    const [SearchKey, setSearchKey] = useState(null)
    const [Dataset, setDataset] = useState([])

    const [SelectedItem, setSelectedItem] = useState([])

    useEffect(() => {
        setDataset(Data)
    }, [])

    useEffect(() => {
        if (SearchKey !== null) {
            const filteredData = Data.filter(item => {
                // Customize the conditions based on your search requirements
                return (
                    item.ID.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.Type.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.Status.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.Date.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.Patient.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.StudyDate.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.UploadedFile.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item.Price.toString().toLowerCase().includes(SearchKey.toLowerCase())
                );
            });
            setDataset(filteredData);
        } else {
            setDataset(Data);
        }
    }, [SearchKey]);


    const handleCheckboxChange = (event, item) => {
        if (event.target.checked) {
            // Add the item to the SelectedItems array
            setSelectedItem(prevSelected => [...prevSelected, item]);
        } else {
            // Remove the item from the SelectedItems array
            setSelectedItem(prevSelected =>
                prevSelected.filter(selectedItem => selectedItem !== item)
            );
        }
    };

    const navigate = useNavigate()

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
                <h2 className='text-lg md:text-xl font-normal'>All Reports</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Service Request</h2>
                    <div className="flex flex-col gap-4 my-6">
                        <h2 className='font-Lora italic font-normal text-lg'>Instruction for user:</h2>
                        <ol className='flex flex-col gap-2 ml-2'>
                            <li className='text-base font-normal font-Lora '>1. Click <b>'Create new Service Request'</b> button below to create new service request</li>
                            <li className='text-base font-normal font-Lora '>2. Alternatively, click <b>NEW REQUEST</b> link at top right of page to create new service request</li>
                            <li className='text-base font-normal font-Lora '>3. Click 'Show All' button to reveal the uploaded file and Report columns</li>
                            <p className='text-base font-normal font-Lora '>Click on the <i>Uploaded file</i> link to downlaod a copy of the file you have uploaded</p>
                            <p className='text-base font-normal font-Lora '>Scroll to the right, click on the Report link to downlaod the radiology report in PDF format. <i>Report link</i> only available after payment has been made</p>
                        </ol>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={SearchKey}
                            onChange={(e) => { setSearchKey(e.target.value) }}
                            className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'
                        />
                    </div>


                    <div className='overflow-x-scroll'>
                        <table className='styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Select to Pay</th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Patient name</th>
                                    <th>Study date</th>
                                    <th>Uploaded file</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Dataset && Dataset.length > 0 && Dataset.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        onClick={() => {
                                            navigate('/docDashboard/ReportDetail', { item: item });
                                        }}
                                        key={index}
                                    >
                                        <td
                                            className='text-center w-20'
                                        >
                                            {item.Status === 'Created' && (
                                                <input
                                                    type='checkbox'
                                                    checked={SelectedItem.includes(item)}
                                                    onChange={(e) => handleCheckboxChange(e, item)}
                                                />
                                            )}
                                        </td>
                                        <td>{item.ID}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Status}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.Patient}</td>
                                        <td>{item.StudyDate}</td>
                                        <td
                                            className='text-blue-600 underline cursor-pointer'>
                                            <a download={item.UploadedFile}>{item.UploadedFile}</a>
                                        </td>
                                        <td>{item.Price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className={`
                        bg-slate-700 border-2 border-slate-700 text-lg text-white 
                        font-Para py-2 px-4 rounded-lg hover:bg-transparent my-5 float-right
                        hover:text-slate-700 ease-in-out duration-300 ${SelectedItem.length == 0 ? 'opacity-20' : 'opacity-100'}`}
                        disabled={SelectedItem.length == 0}
                    >
                        Pay now
                    </button>

                </div>
            </div>
        </>
    )
}

export default AllReports