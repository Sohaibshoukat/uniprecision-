import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import AlertContext from '../../Context/Alert/AlertContext'
import { convertDateFormat } from '../DateFunction'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import STAMP from "../../assets/stamp.png"


const Transaction = ({ handleLogout, toggleMenu }) => {
    const [Data, setData] = useState([])
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const [Select, setSelect] = useState(null)
    const [Model, setModel] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetch(`http://localhost:3000/doctor/doctorTransactions/${localStorage.getItem('doctorId')}}`) // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.transactions) {
                    setData(data.transactions);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }, []);

    const downloadPDF = () => {
        const capture = document.querySelector('#pdf-content');
        setLoading(true);
        html2canvas(capture, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const width = 210; // A4 width in mm
            const height = (canvas.height * width) / canvas.width;
            doc.addImage(imgData, 'PNG', 0, 0, width, height);
            setLoading(false);
            doc.save(`UNIPRECISION-${Select.transaction_ref}.pdf`);
        });
    };

    return (
        <>

            {Model &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex items-center'>
                    <div className='absolute z-30 bg-black/50 w-[100%] h-[100%]' onClick={() => { setModel(false) }}>
                    </div>
                    <div className='w-fit bg-white relative h-[80vh] z-50 flex flex-col gap-4 rounded-xl lg:w-[70%] py-8 px-8 ml-2 md:ml-8 overflow-y-scroll' >
                        <div id='pdf-content'>
                            <div className="flex flex-row justify-start gap-2 py-6">
                                <div className="basis-[30%] flex justify-center h-auto">
                                    <img src={'../Logo.png'} alt="" className='w-fit h-[150px]' />
                                </div>
                                <div className="basis-[60%]">
                                    <div className='w-[100%] flex flex-col gap-1 text-left rounded-tl-3xl rounded-bl-3xl text-black font-Para text-base font-light'>
                                        <h1 className='text-xl font-bold'>UNIPRECISION TELERAD SDN. BHD. (1549296)-V</h1>
                                        <p>Unisquare Commercial Centre, Sublot 23,</p>
                                        <p>Kuching-Samarahan Expressway, 94300 kota Samarahan, Sarawak</p>
                                        <p>admin@uniprecision.com.my</p>
                                    </div>
                                    <div className='text-left py-2'>
                                        <h2 className='text-darkblue font-Para text-base font-bold text-left'>www.uniprecision.com.my</h2>
                                        <h3 className='text-black font-Para text-base font-bold text-left'>PRIVATE & CONFIDENTIAL</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 font-Para w-[60%] m-auto'>
                                <h2 className='text-4xl font-bold'>Receipt</h2>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>TO</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>Senang Pay</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>DATE</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{convertDateFormat(Select.date_generated)}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>ORDER ID</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{Select.orderid}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>REQUEST TYPE</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{Select.requesttype}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between mt-10'>
                                        <h2 className='italic'>Payment made via Senangpay. </h2>
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>Payment reference</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{Select.transaction_ref}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>Total Paid</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{Select.amount}</p>
                                </div>
                                <p className='mt-10 font-Para font-light text-lg'>A copy of the receipt from Senangpay is sent to your email. </p>
                                <div className="flex justify-between mb-8">
                                    <div className="flex flex-col justify-between">
                                        <p className='mt-10 font-Para font-light text-lg'>Thank you for choosing our service.</p>
                                        <p className='mt-10 font-Para font-light text-sm'>This is a computer-generated document. No signature is required.</p>
                                    </div>
                                    <img src={STAMP} alt="" className='w-[150px] h-[150px]' />
                                </div>
                            </div>
                        </div>
                        <button
                            className='w-fit self-center bg-darkblue text-center text-white border-2 border-darkblue hover:bg-transparent px-6  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                            onClick={downloadPDF}
                            disabled={loading}
                        >
                            {loading ? 'Is Downloading..' : 'Download'}
                        </button>
                    </div>
                </div>
            }
            <div className='flex flex-row items-center justify-between gap-0 md:gap-20 h-auto shadow-xl py-4 bg-white px-4 md:px-10 '>
                <button
                    type="button"
                    className={`nline-flex p-2 text-2xl md:text-3xl lg:hidden rounded-md bg-transparent hover:bg-gray-100 focus:outline-none`}
                    onClick={toggleMenu}
                >
                    <GiHamburgerMenu />
                </button>
                <h2 className='text-lg md:text-xl font-normal'>All Transaction</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <div className=''>
                    <h2 className='font-Para text-3xl font-bold mb-4'>All Transaction History</h2>
                    <div className='overflow-x-scroll w-[100%]'>
                        <table className='styled-table w-[100%]'>
                            <thead className='font-Lora'>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Transaction Ref</th>
                                    <th>Amount</th>
                                    <th>Transaction Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Data.map((item, index) => (
                                    <tr className='font-Para'>
                                        <td>{item.transaction_id}</td>
                                        <td>{item.transaction_ref}</td>
                                        <td>{item.amount}</td>
                                        <td>{convertDateFormat(item.date_generated)}</td>
                                        <td
                                            className={`
                                         bg-slate-700 border-2 border-slate-700 text-lg text-white 
                                         font-Para py-2 px-4 rounded-lg hover:bg-transparent my-5 float-right
                                         hover:text-slate-700 ease-in-out duration-300`}
                                            onClick={() => { setModel(true); setSelect(item) }}
                                        >Receipt </td>
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

export default Transaction