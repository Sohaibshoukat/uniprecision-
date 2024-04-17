import React, { useContext, useEffect, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import AlertContext from '../Context/Alert/AlertContext'
import { convertDateFormat } from '../Component/DateFunction'
import Pagination from '@mui/material/Pagination';

const AssignRequest = ({ toggleMenu, handleLogout }) => {

    const [Data, setData] = useState([])
    const [Radiologist, setRadiologist] = useState([])
    const [radiologistIds, setRadiologistIds] = useState([]) // Array to hold radiologist IDs for each row
    const [reportIds, setReportIds] = useState([]) // Array to hold report IDs for each row

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const [TotalPages, setTotalPages] = useState(0)
    const [TotalOrder, setTotalOrder] = useState(0)
    const [page, setPage] = useState(1);
    const ordersPerPage = 20;

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getorder();
        getallRadio();
    }, [page]);

    const getallRadio = async () => {
        fetch(`https://backend.uniprecision.com.my/admin/getAllRadiologists`)
            .then(response => response.json())
            .then(data => {
                if (data.radiologists) {
                    setRadiologist(data.radiologists);
                }
            })
            .catch(error => showAlert('Error fetching radiologists', 'danger'));
    }

    const getorder = async () => {
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        fetch(`https://backend.uniprecision.com.my/admin/getPendingReports`)
            .then(response => response.json())
            .then(data => {
                if (data.pending_reports) {
                    setTotalOrder(data.pending_reports.length);
                    setTotalPages(Math.ceil(data.pending_reports.length / ordersPerPage));
                    // setData(data.pending_reports);
                    setData(data.pending_reports.slice(startIndex, endIndex));
                }
            })
            .catch(error => showAlert('Error fetching pending reports', 'danger'));
    }

    const assignReport = async (index, reportid) => {
        const radiologistId = radiologistIds[index];
        const reportId = reportid;
        if (!radiologistId) {
            showAlert('Select Radiologist', 'danger');
            return;
        }

        const requestData = {
            radiologist_id: radiologistId,
            report_id: reportId
        };

        fetch('https://backend.uniprecision.com.my/admin/assignReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                getorder();
                showAlert('Report Assigned Successfully', 'success');
            })
            .catch(error => {
                showAlert('Error assigning report', 'danger');
            });
    };

    const handleAssign = (index, reportid) => {
        assignReport(index, reportid);
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
                <h2 className='text-lg md:text-xl font-normal'>Assign Request</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='h-[100%] max-h-[85vh] py-10 px-5 md:px-10 m-auto overflow-y-scroll'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>Assign Requests to Radiologists</h2>
                    <div className="my-4">
                        <Pagination count={TotalPages} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
                    </div>
                    <div className='overflow-x-scroll'>
                        <table className='w-[100%] styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Examination Date</th>
                                    <th>Price</th>
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
                                        <td>{item.report_id}</td>
                                        <td>{item.category_name}</td>
                                        <td>{convertDateFormat(item.Examination_Date)}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <select
                                                name=""
                                                id=""
                                                className="text-base w-full px-2 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                                value={radiologistIds[index] || ''}
                                                onChange={(e) => {
                                                    const newRadiologistIds = [...radiologistIds];
                                                    newRadiologistIds[index] = e.target.value;
                                                    setRadiologistIds(newRadiologistIds);
                                                }}
                                            >
                                                <option value=''>Select Radiologist</option>
                                                {Radiologist && Radiologist.map((item2, index2) => (
                                                    <option value={item2.radiologist_id} key={index2}>{item2.radiologist_name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className='border-slate-700 border-2 bg-transparent hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-4 m-1 rounded-lg ease-in-out duration-300'
                                                onClick={() => { handleAssign(index, item.report_id) }}
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

export default AssignRequest;
