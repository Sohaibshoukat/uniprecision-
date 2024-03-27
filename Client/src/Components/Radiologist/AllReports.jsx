import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'

const AllPreviousReport = ({ handleLogout, toggleMenu }) => {
    const [Dataset, setDataset] = useState([])

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const getorder = async () => {
        fetch(`http://localhost:3000/radiologist/getCompletedReports/${localStorage.getItem('RadioId')}`) // Assuming this is the correct endpoint
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

    // const [SearchKey, setSearchKey] = useState(null)


    // useEffect(() => {
    //     if (SearchKey !== null) {
    //         const filteredData = Data.filter(item => {
    //             // Customize the conditions based on your search requirements
    //             return (
    //                 item.ID.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.Type.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.Status.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.Date.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.Patient.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.StudyDate.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.UploadedFile.toLowerCase().includes(SearchKey.toLowerCase()) ||
    //                 item.Price.toString().toLowerCase().includes(SearchKey.toLowerCase())
    //             );
    //         });
    //         setDataset(filteredData);
    //     } else {
    //         setDataset(Data);
    //     }
    // }, [SearchKey]);

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
                <h2 className='text-lg md:text-xl font-normal'>All Archived Report</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>All Previous Completed Reports</h2>

                    {/* <div className='flex flex-row justify-between'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={SearchKey}
                            onChange={(e) => { setSearchKey(e.target.value) }}
                            className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'
                        />
                    </div> */}


                    <div className='overflow-x-scroll'>
                        <table className='w-[100%] styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Submitted Date</th>
                                    <th>Download File</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Dataset && Dataset.length > 0 && Dataset.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item.report_id}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.report_status}</td>
                                        <td>{item.date_generated}</td>
                                        <td className='text-blue-600 underline cursor-pointer'>
                                            <a href={item.file_url} download={item.patient_name} target='_blank'>{item.file_path}</a>
                                        </td>
                                        <td>
                                            <Link to={'/radioDashboard/ReportDetail'} state={{ id: item.report_id }}>
                                                <button
                                                    className='border-slate-700 border-2 bg-transparent hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-4 m-1 rounded-lg ease-in-out duration-300'

                                                >
                                                    Check Final Report
                                                </button>
                                            </Link>
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

export default AllPreviousReport