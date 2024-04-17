import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'
import { convertDateFormat } from '../DateFunction'
import Pagination from '@mui/material/Pagination';

const AllPaidReports = ({ handleLogout, toggleMenu }) => {
    const [SearchKey, setSearchKey] = useState(null)
    const [Dataset, setDataset] = useState([])
    const [Datasetfilter, setDatasetfilter] = useState([]);

    const [TotalPages, setTotalPages] = useState(0)
    const [TotalOrder, setTotalOrder] = useState(0)
    const [page, setPage] = useState(1);
    const ordersPerPage = 20;
    
    const handleChange = (event, value) => {
        setPage(value);
      };

    useEffect(() => {
        if (SearchKey !== null) {
            const filteredData = Dataset.filter(item => {
                {console.log(item)}
                return (
                    item?.patient_name?.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    item?.category_name && item.category_name.toLowerCase().includes(SearchKey?.toLowerCase())
                    // item.Status.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    // item.Date.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    // item.StudyDate.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    // item.UploadedFile.toLowerCase().includes(SearchKey.toLowerCase()) ||
                    // item.Price.toString().toLowerCase().includes(SearchKey.toLowerCase())
                );
            });
            setDatasetfilter(filteredData);
        } else {
            setDatasetfilter(Dataset);
        }
    }, [SearchKey]);


    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const getorder = async () => {
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;

        fetch(`https://backend.uniprecision.com.my/doctor/getAllReports/${localStorage.getItem('doctorId')}`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.orders) {
                    setDataset(data.orders);
                    setTotalOrder(data.orders.length);
                    setTotalPages(Math.ceil(data.orders.length / ordersPerPage));

                    // Slice the orders array based on pagination
                    setDatasetfilter(data.orders.slice(startIndex, endIndex));
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    useEffect(() => {
        getorder()
    }, [page]);


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
                        <h2 className='font-Para font-normal text-lg'> Instructions:</h2>
                        <ol className='flex flex-col gap-2 ml-2'>
                        <li className='text-base font-normal font-Para '>1. Click <b>'New Request'</b>  On the left menu to create new request.</li>
                            <li className='text-base font-normal font-Para '>2. Click on the Uploaded file link to downlaod a copy of the file you have uploaded</li>
                            <li className='text-base font-normal font-Para '>3. Scroll to the right, click on the Report link to download the report in PDF format. Report is available after payment has been made.</li>
                        </ol>
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={SearchKey}
                            onChange={(e) => { setSearchKey(e.target.value) }}
                            className='py-2 px-4 border-2 border-gray-500 placeholder:text-gray-500 text-black rounded-lg font-Para'
                        />
                        <Pagination count={TotalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
                    </div>


                    <div className='overflow-x-scroll'>
                        <table className=' w-[100%] styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Type</th>
                                    <th>Genrated Date</th>
                                    <th>Patient name</th>
                                    <th>Study date</th>
                                    <th>Status</th>
                                    <th>Download Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Datasetfilter && Datasetfilter?.length > 0 && Datasetfilter?.map((item, index) => (
                                    <tr
                                        className='font-Para'
                                        key={index}
                                    >
                                        <td>{item.order_id}</td>
                                        <td>{item.category_name}</td>
                                        <td>{convertDateFormat(item.date_generated)}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{convertDateFormat(item.Examination_Date)}</td>
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