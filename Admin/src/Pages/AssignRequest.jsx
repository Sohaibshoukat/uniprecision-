import React, { useContext, useEffect, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import AlertContext from '../Context/Alert/AlertContext'

const AssignRequest = ({ toggleMenu, handleLogout }) => {

    const [Data, setData] = useState([])
    const [Radiologist, setRadiologist] = useState()
    const [radiologistid, setradiologistid] = useState(null)
    const [report_id, setreport_id] = useState(null)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const getallRadio = async () => {
        fetch(`https://backend.uniprecision.com.my/admin/getAllRadiologists`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.radiologists) {
                    setRadiologist(data.radiologists);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }

    const getorder = async () => {
        fetch(`https://backend.uniprecision.com.my/admin/getPendingReports`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.pending_reports) {
                    setData(data.pending_reports);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }
    

    useEffect(() => {
        getorder()
        getallRadio()
    }, []);

    const assignReport = async () => {
        if (!radiologistid || !report_id) {
            console.log(radiologistid)
            showAlert('Select Radiologist','danger')
            return;
        }

        const requestData = {
            radiologist_id: radiologistid,
            report_id: report_id
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
        .then(data => {
            getorder()
            showAlert('report Assigned Success','success')
        })
        .catch(error => {
            showAlert('Error assigning report', 'danger');
        });
    };

    const handleAssign = (reportId) => {
        setreport_id(reportId);
        assignReport();
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
            <div className='h-[100%] max-h-[100vh] py-10 px-5 md:px-10 m-auto overflow-y-scroll'>
                <div className=''>
                    <h2 className='font-Para text-2xl font-bold mb-4'>Assign Reqsuest to Radiologist</h2>
                    <div className='overflow-x-scroll'>
                        <table className='w-[100%] styled-table'>
                            <thead className='font-Para'>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Submitted Date</th>
                                    <th>Price</th>
                                    <th>Radiologist</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Data && Data?.length > 0 && Data?.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td>{item.report_id}</td>
                                        <td>{item.date_generated}</td>
                                        <td>{item.date_generated}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <select 
                                                name="" 
                                                id="" 
                                                className="text-base w-full px-2 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                                value={radiologistid}
                                                onChange={(e)=>{setradiologistid(e.target.value)}}
                                            >
                                                <option value=''>Select Radiologist</option>
                                                {Radiologist?.map((item2,index2)=>(
                                                    <option value={item2.radiologist_id} key={index2}>{item2.radiologist_name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className='border-slate-700 border-2 bg-transparent hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-4 m-1 rounded-lg ease-in-out duration-300'
                                                onClick={()=>{handleAssign(item.report_id)}}
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