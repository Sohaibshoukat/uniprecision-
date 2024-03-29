import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'

const AllPaidReports = ({ handleLogout, toggleMenu }) => {
    const [SearchKey, setSearchKey] = useState(null)
    const [Dataset, setDataset] = useState([])

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const getorder = async () => {
        fetch(`http://localhost:3000/doctor/getAllReports/${localStorage.getItem('doctorId')}`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.orders) {
                    setDataset(data.orders);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    useEffect(() => {
        getorder()
    }, []);


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
                <h2 className='text-lg md:text-xl font-normal'>All Paid Reports</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Service Request</h2>
                    <div className="flex flex-col gap-4 my-6">
                        <h2 className='font-Lora italic font-normal text-lg'> Instructions:</h2>
                        <ol className='flex flex-col gap-2 ml-2'>
                            <li className='text-base font-normal font-Lora '>1. Click <b>'Create New Request'</b> button below to create new  request</li>
                            <li className='text-base font-normal font-Lora '>2. Alternatively, click <b>'New Request'</b>  On the left menu to create new request.</li>
                            <li className='text-base font-normal font-Lora '>3. Click on the Uploaded file link to downlaod a copy of the file you have uploaded</li>
                            <li className='text-base font-normal font-Lora '>4. Scroll to the right, click on the Report link to download the report in PDF format. Report link only available after payment has been made</li>
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
                        <table className=' w-[100%] styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Report ID</th>
                                    <th>Type</th>
                                    <th>Genrated Date</th>
                                    <th>Patient name</th>
                                    <th>Study date</th>
                                    <th>Status</th>
                                    <th>Download Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Dataset && Dataset.length > 0 && Dataset.map((item, index) => (
                                    <tr
                                        className='font-Para'
                                        key={index}
                                    >
                                        <td>{item.report_id}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.date_generated}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.Examination_Date}</td>
                                        <td>
                                            <h2 className={`
                                                    ${item.report_status == 'Pending' ? 'bg-red-500' : item.report_status == 'Assigned' ? 'bg-blue-500' : 'bg-green-600'}
                                                    py-2 px-4 rounded-lg text-white w-fit
                                                `}
                                            >
                                                {item.report_status}
                                            </h2>
                                        </td>
                                        <td>{
                                            item.report_status ==
                                                'Complete' ?
                                                <Link to={'/docDashboard/ReportDetail'} state={{id:item.report_id}}>
                                                    <div
                                                        className='py-2 px-4 rounded-lg text-white w-fit bg-slate-500'
                                                    >
                                                        Check Report
                                                    </div>
                                                </Link> :
                                                'Wait For Completion'}
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

export default AllPaidReports