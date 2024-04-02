import React, { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertContext from '../../Context/Alert/AlertContext';
import CryptoJS from 'crypto-js';

const AllReports = ({ handleLogout, toggleMenu }) => {
    const [SearchKey, setSearchKey] = useState(null);
    const [Dataset, setDataset] = useState([]);
    const [SelectedItem, setSelectedItem] = useState([]);
    const [SelectedPrice, setSelectedPrice] = useState(0);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');

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
            const secretKey = '41367-365'; // Your secret key
            const hashedString = CryptoJS.HmacSHA256(secretKey + statusId + orderId + transactionId + msg, secretKey).toString(CryptoJS.enc.Hex);
            
            if (hash === hashedString) {
                if (statusId === '1') {
                    showAlert('Payment was successful with message: ' + msg, 'success');
                    SelectedItem.forEach(item => {
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
                } else {
                    showAlert('Payment failed with message: ' + msg, 'danger');
                }
            } else {
                showAlert('Hashed value is not correct', 'danger');
            }
        }
    }, [location.search, showAlert]);

    const getorder = async () => {
        fetch(`https://backend.uniprecision.com.my/doctor/getAllOrders/${localStorage.getItem('doctorId')}`)
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
    };

    useEffect(() => {
        getorder();
    }, []);

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
    
        const detail = `Ordering for ID: ${OrderId}`;
        const secretKey = '41367-365';
        const amount = SelectedPrice;
        const str = `${secretKey}${detail}${amount}${OrderId}`;
    
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
                        <h2 className='font-Lora italic font-normal text-lg'> Instructions:</h2>
                        <ol className='flex flex-col gap-2 ml-2'>
                            <li className='text-base font-normal font-Lora '>1. Alternatively, click <b>'New Request'</b>  On the left menu to create new request.</li>
                            <li className='text-base font-normal font-Lora '>2. Click on the Uploaded file link to downlaod a copy of the file you have uploaded</li>
                            <li className='text-base font-normal font-Lora '>3. Scroll to the right, click on the Report link to download the report in PDF format. Report link only available after payment has been made</li>
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
                                        <td>{item.date_generated}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.Examination_Date}</td>
                                        <td
                                            className='text-blue-600 underline cursor-pointer'>
                                            <a href={item.file_url} download={item.report_id} target='_blank'>{item.file_path}</a>
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
                        onClick={HandlePyaOut}
                    >
                        Pay now
                    </button>

                </div>
            </div>
        </>
    );
}

export default AllReports;

