import React, { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertContext from '../../Context/Alert/AlertContext';
import CryptoJS from 'crypto-js';
import STAMP from "../../assets/stamp.png"
import { convertDateFormat } from '../DateFunction';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Pagination from '@mui/material/Pagination';

const AllReports = ({ handleLogout, toggleMenu }) => {
    const [SearchKey, setSearchKey] = useState(null);
    const [Dataset, setDataset] = useState([]);
    const [Datasetfilter, setDatasetfilter] = useState([]);
    const [SelectedItem, setSelectedItem] = useState([]);
    const [SelectedPrice, setSelectedPrice] = useState(0);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Model, setModel] = useState(false)
    const [Model2, setModel2] = useState(false)

    const [TotalPages, setTotalPages] = useState(0)
    const [TotalOrder, setTotalOrder] = useState(0)
    const [page, setPage] = useState(1);
    const ordersPerPage = 20;

    const handleChange = (event, value) => {
        setPage(value);
      };


    const [DateGenrated, setDateGenrated] = useState(convertDateFormat(new Date))
    const [OrderId, setOrderId] = useState('')
    const [RequestType, setRequestType] = useState('')
    const [TransactionRef, setTransactionRef] = useState('')
    const [amunt, setamunt] = useState('')

    const [loading, setLoading] = useState(false)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const statusId = queryParams.get('status_id');
        const orderId = queryParams.get('order_id');
        const msg = queryParams.get('msg');
        const transactionId = queryParams.get('transaction_id');
        const hash = queryParams.get('hash');

        if (statusId && orderId && msg && transactionId && hash) {
            const secretKey = '41367-365';
            const hashedString = CryptoJS.HmacSHA256(secretKey + statusId + orderId + transactionId + msg, secretKey).toString(CryptoJS.enc.Hex);

            setOrderId(orderId)
            setRequestType(localStorage.getItem('Request'))
            setTransactionRef(transactionId)
            setamunt(localStorage.getItem('amount'))
            setModel2(true)
            if (hash === hashedString) {
                if (statusId === '1') {
                    let orderIdArray = orderId.split('_');

                    showAlert('Payment was successful with message: ' + msg, 'success');
                    orderIdArray.forEach(item => {
                        fetch(`https://backend.uniprecision.com.my/doctor/payorder/${item}`, {
                            method: 'PUT',
                        })
                            .then(response => {
                                if (!response.ok) {
                                    showAlert(`Error paying for order ${item}`, 'danger');
                                }
                                return response.json();
                            })
                            .then(data => {
                                getorder()
                            })
                            .catch(error => {
                                showAlert(`Error paying for order ${item}`, 'danger');
                            });
                    })

                    const dategen = new Date().toISOString()
                    const dategenrate = convertDateFormat(dategen)


                    fetch(`https://backend.uniprecision.com.my/doctor/addtransaction/${localStorage.getItem('doctorId')}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            txnref: transactionId,
                            amount: localStorage.getItem('amount'),
                            orderid: orderId,
                            requesttype: localStorage.getItem('Request'),
                            date: dategenrate
                        }),
                    }).then(response => {
                        if (!response.ok) {
                            showAlert(`Error Genrating Transaction Recipt`, 'danger');
                        }
                        return response.json();
                    }).then(data => {
                        getorder()
                    }).catch(error => {
                        showAlert(`Error Genrating Transaction Recipt`, 'danger');
                    });


                } else {
                    showAlert('Payment failed with message: ' + msg, 'danger');
                }
            } else {
                showAlert('Hashed value is not correct', 'danger');
            }

        }
    }, []);

    // const getorder = async () => {
    //     fetch(`https://backend.uniprecision.com.my/doctor/getAllOrders/${localStorage.getItem('doctorId')}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 showAlert('Network response was not ok', 'danger');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data.orders) {
    //                 setDataset(data.orders); 
    //                 setTotalPages(Math.ceil(data.orders?.length/20));
    //                 setTotalOrder(data.orders?.length)
    //                 setCurrentPage(1);
    //                 setDatasetfilter(data.orders)
    //             }
    //         })
    //         .catch(error => {
    //             showAlert('Error fetching categories', 'danger');
    //         });
    // };

    const getorder = async () => {
        // Calculate starting and ending index for pagination
        const startIndex = (page - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;

        fetch(`https://backend.uniprecision.com.my/doctor/getAllOrders/${localStorage.getItem('doctorId')}`)
            .then(response => response.json())
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
    };

    useEffect(() => {
        getorder();
    }, [page]);

    const handleCheckboxChange = (event, item, price) => {
        if (event.target.checked) {
            setSelectedItem(prevSelected => [...prevSelected, item]);
            setSelectedPrice(SelectedPrice + price);
        } else {
            setSelectedItem(prevSelected => prevSelected.filter(selectedItem => selectedItem !== item));
            setSelectedPrice(SelectedPrice - price);
        }
    };

    const getuser = async () => {
        fetch(`https://backend.uniprecision.com.my/guest/getUser/${localStorage.getItem('userid')}`)
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.user) {
                    const user = data?.user;
                    setName(user.name);
                    setMobileNumber(user?.mobile_number);
                    setEmail(user?.email);
                }
            })
            .catch(error => {
                showAlert('Error fetching your Data', 'danger');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('doctorId');
                localStorage.removeItem('userid');
                localStorage.removeItem('RadioId');
                navigate('/login');
            });
    };

    useEffect(() => {
        getuser();
    }, []);

    const HandlePyaOut = async () => {
        let OrderId = '';
        await SelectedItem.map((item) => {
            OrderId += `${item}_`;
        });

        OrderId = OrderId.slice(0, -1);

        let OrderType = ''
        await Dataset && Dataset.length > 0 && Dataset.map((item, index) => {
            SelectedItem.map((item2) => {
                if (item2 == item.order_id) {
                    OrderType += ` ${item.category_name}`
                }
            })
        })



        const detail = `Ordering for ID: ${OrderId}`;
        const secretKey = '41367-365';
        const amount = SelectedPrice;
        const str = `${secretKey}${detail}${amount}${OrderId}`;
        localStorage.setItem('Request', OrderType)
        localStorage.setItem('amount', amount);

        const hash = CryptoJS.HmacSHA256(str, secretKey).toString(CryptoJS.enc.Hex);

        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'https://app.senangpay.my/payment/578171160985718');

        const fields = [
            { name: 'detail', value: detail },
            { name: 'amount', value: amount },
            { name: 'order_id', value: OrderId },
            { name: 'hash', value: hash },
            { name: 'name', value: name },
            { name: 'email', value: email },
            { name: 'phone', value: mobileNumber }
        ];


        await fields.forEach(field => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', field.name);
            input.setAttribute('value', field.value);
            form.appendChild(input);
        });

        await document.body.appendChild(form);
        form.submit();
    };
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
            doc.save(`UNIPRECISION-${TransactionRef}.pdf`);
        });
    };

    useEffect(() => {
        if (SearchKey !== null) {
            const filteredData = Dataset.filter(item => {
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
            const startIndex = (page - 1) * ordersPerPage;
            const endIndex = startIndex + ordersPerPage;
            console.log(startIndex)
            console.log(endIndex)
            setDatasetfilter(Dataset.slice(startIndex, endIndex));
        }
    }, [SearchKey]);

    return (
        <>
            {Model &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex items-center'>
                    <div className='absolute z-30 bg-black/50 w-[100%] h-[100%]' onClick={() => { setModel(false) }}>

                    </div>
                    <div className='w-fit h-fit bg-white relative z-50 flex flex-col gap-4 rounded-xl lg:w-[70%] py-8 px-8 ml-2 md:ml-8'>
                        <h2 className='text-black font-Para text-2xl'>Check Out Page</h2>
                        <div className='overflow-x-scroll'>
                            <table className=' w-[100%] styled-table'>
                                <thead className='font-Para'>
                                    <tr>
                                        <th>Select to Pay</th>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Patient name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Dataset && Dataset.length > 0 && Dataset.map((item, index) => (
                                        <>{
                                            SelectedItem.map((item2) => (
                                                <>
                                                    {item2 == item.order_id && <tr
                                                        className='font-Para cursor-pointer'
                                                        key={index}
                                                    >
                                                        <td
                                                            className='text-center w-20'
                                                        >
                                                            {item.status === 'UnPaid' && (
                                                                <input
                                                                    type='checkbox'
                                                                    checked={SelectedItem.includes(item.order_id)}
                                                                    onChange={(e) => handleCheckboxChange(e, item.order_id, item.price)}
                                                                />
                                                            )}
                                                        </td>
                                                        <td>{item.order_id}</td>
                                                        <td>{item.category_name}</td>
                                                        <td>{convertDateFormat(item.date_generated)}</td>
                                                        <td>{item.patient_name}</td>
                                                        <td>{item.price}</td>
                                                    </tr>}
                                                </>
                                            ))
                                        }
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col md:flex-row justify-end gap-4 items-center mx-4">
                            <h2 className='text-2xl font-bold font-Para '>Total :</h2>
                            <h4 className='text-xl font-Para font-medium'> MYR {SelectedPrice}</h4>
                        </div>
                        <button
                            className='w-fit self-center bg-darkblue text-center text-white border-2 border-darkblue hover:bg-transparent px-6  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                            onClick={HandlePyaOut}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            }

            {Model2 &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex items-center'>
                    <div className='absolute z-30 bg-black/50 w-[100%] h-[100%]' onClick={() => { setModel2(false) }}>
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
                                        <h2>PAID BY</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{name}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>DATE</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{DateGenrated}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>ORDER ID</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{OrderId}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>REQUEST TYPE</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{RequestType}</p>
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
                                    <p className='text-xl'>{TransactionRef}</p>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <div className='text-xl font-bold flex justify-between basis-[40%]'>
                                        <h2>Total Paid</h2>
                                        <span>:</span>
                                    </div>
                                    <p className='text-xl'>{amunt}</p>
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
                <h2 className='text-lg md:text-xl font-normal'>All Reports</h2>
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
                                {Datasetfilter && Datasetfilter?.length > 0 && Datasetfilter?.map((item, index) => (
                                    <tr
                                        className='font-Para cursor-pointer'
                                        key={index}
                                    >
                                        <td
                                            className='text-center w-20'
                                        >
                                            {item.status === 'UnPaid' && (
                                                <input
                                                    type='checkbox'
                                                    checked={SelectedItem.includes(item.order_id)}
                                                    onChange={(e) => handleCheckboxChange(e, item.order_id, item.price)}
                                                />
                                            )}
                                        </td>
                                        <td>{item.order_id}</td>
                                        <td>{item.category_name}</td>
                                        <td>
                                            <h2 className={`
                                                    ${item.status == 'UnPaid' ? 'bg-red-500' : 'bg-green-600'}
                                                    py-2 px-4 rounded-lg text-white
                                                `}
                                            >
                                                {item.status}
                                            </h2>
                                        </td>
                                        <td>{convertDateFormat(item.date_generated)}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{convertDateFormat(item.Examination_Date)}</td>
                                        <td
                                            className='text-blue-600 underline cursor-pointer'>
                                            <a href={`https://backend.uniprecision.com.my/${item.file_path}`} download={item.report_id}>{item.file_path}</a>
                                        </td>
                                        <td>{item.price}</td>
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
                        onClick={() => { setModel(true) }}
                    >
                        Check Out
                    </button>

                </div>
            </div>
        </>
    );
}

export default AllReports;

