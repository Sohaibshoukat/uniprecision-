import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'
import { convertDateFormat } from '../DateFunction'
import Pagination from '@mui/material/Pagination';

const AllPreviousReport = ({ handleLogout, toggleMenu }) => {
    const [Dataset, setDataset] = useState([])

    const [TotalPages, setTotalPages] = useState(0)
    const [TotalOrder, setTotalOrder] = useState(0)
    const [page, setPage] = useState(1);
    const ordersPerPage = 2;
    
    const handleChange = (event, value) => {
        setPage(value);
      };

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const getorder = async () => {
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        fetch(`https://backend.uniprecision.com.my/radiologist/getCompletedReports/${localStorage.getItem('RadioId')}`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.orders) {

                    setTotalOrder(data.orders.length);
                    setTotalPages(Math.ceil(data.orders.length / ordersPerPage));
                    setDataset(data.orders.slice(startIndex, endIndex));
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    useEffect(() => {
        getorder()
    }, [page]);

    // const [SearchKey, setSearchKey] = useState(null)

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
                    <div className="my-4">
                    <Pagination count={TotalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
                    </div>
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
                                        <td>{convertDateFormat(item.date_generated)}</td>
                                        <td className='text-blue-600 underline cursor-pointer'>
                                            <a href={`https://backend.uniprecision.com.my/${item.file_path}`} download={item.patient_name} target='_blank'>{item.file_path}</a>
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