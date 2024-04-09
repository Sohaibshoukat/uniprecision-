import React, { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import AlertContext from '../../Context/Alert/AlertContext';
import { convertDateFormat } from '../DateFunction';
import { useNavigate } from 'react-router-dom';

const NewReport = ({ handleLogout, toggleMenu }) => {
    const [Price, setPrice] = useState(0)
    const [Service, setService] = useState([])

    useEffect(() => {
        fetch('https://backend.uniprecision.com.my/doctor/getAllCategories') // Assuming this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    showAlert('Network response was not ok', 'danger');
                }
                return response.json();
            })
            .then(data => {
                if (data.users) {
                    setService(data.users);
                }
            })
            .catch(error => {
                showAlert('Error fetching categories', 'danger');
            });
    }, []);

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const navigate = useNavigate();

    const [Organization, setOrganization] = useState('')

    const [formData, setFormData] = useState({
        doctor_id: localStorage.getItem('doctorId'),
        category_id: '',
        date_generated: new Date().toISOString(),
        Examination_Date: '',
        patient_name: '',
        dob: '',
        nric_passport_no: '',
        clinical_summary_title: Organization,
        age: '',
        gender: '',
        previous_study: '',
        file: null
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData2 = new FormData();
        console.log(formData.Examination_Date)
        formData2.append('doctor_id', formData.doctor_id);
        formData2.append('category_id', formData.category_id);
        const dategenrate = await convertDateFormat(formData.date_generated)
        formData2.append('date_generated', dategenrate);
        const examinationData = await convertDateFormat(formData.Examination_Date)
        formData2.append('Examination_Date', examinationData);
        formData2.append('patient_name', formData.patient_name);
        formData2.append('dob', formData.dob);
        formData2.append('price', Price);
        formData2.append('nric_passport_no', formData.nric_passport_no);
        formData2.append('clinical_summary_title', Organization);
        formData2.append('age', formData.age);
        formData2.append('gender', formData.gender);
        formData2.append('previous_study', formData.previous_study);
        formData2.append('file', formData.file);

        try {
            const response = await fetch('https://backend.uniprecision.com.my/doctor/order', {
                method: 'POST',
                body: formData2,
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('New Request Created', 'success');
                setFormData(
                    {
                        ...formData,
                        category_id: '',
                        Examination_Date: '',
                        patient_name: '',
                        dob: '',
                        nric_passport_no: '',
                        clinical_summary_title: '',
                        age: '',
                        gender: '',
                        previous_study: '',
                        file: null
                    });
                    navigate('/docDashboard/')
            } else {
                showAlert(data.error, 'danger')
            }
        } catch (error) {
            showAlert('Error: ' + error, 'danger');
        }
    };


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFormData({ ...formData, file: e.target.files[0] });
    };


    const fetchDoctorOrganization = async () => {
        try {
            const userId = localStorage.getItem('userid'); // Assuming you have stored userId in localStorage
            const response = await fetch(`https://backend.uniprecision.com.my/doctor/getorganization/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.organization.organization)
                setOrganization(data.organization.organization)
            } else {
                showAlert('Failed to fetch doctorId', 'danger');
            }
        } catch (error) {
            showAlert('Error fetching doctor', 'danger');
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchDoctorOrganization();
    }, []);

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
                <h2 className='text-lg md:text-xl font-normal'>Request New Reports</h2>
                <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
            </div>
            <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
                <h1 className='text-2xl font-Para font-semibold'>New Service Request form</h1>
                <p className='text-sm font-Para'>Complete the following and submit</p>
                <div className='bg-white shadow-2xl w-full my-10 py-2 rounded-lg px-8'>
                    {/* Your form content */}
                    {Price > 0 &&
                        <h2 className='font-Para text-2xl mt-2 float-left'>
                            <span className='font-bold'>Price</span> RM{Price}.00
                        </h2>}
                    <form onSubmit={handleFormSubmit}>
                        <div className='grid md:grid-cols-2 gap-6 mt-10 grid-cols-1'>
                            <h2 className='text-xl font-medium  font-Para'>Patient Data</h2>
                            <div></div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="patient_name" className='font-Para text-base'>Patient Name</label>
                                <input type="text" name="patient_name" value={formData.patient_name} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="dob" className='font-Para text-base'>Date Of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="gender" className='font-Para text-base'>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg '>
                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="age" className='font-Para text-base'>Age</label>
                                <input type='number' name="age" value={formData.age} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="nric_passport_no" className='font-Para text-base'>NRIC/Passport No</label>
                                <input type='text' name="nric_passport_no" value={formData.nric_passport_no} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                            </div>
                        </div>

                        {/* Request Data */}
                        <div className='grid md:grid-cols-2 gap-8 mt-10 grid-cols-1'>
                            <h2 className='text-xl font-medium  font-Para'>Report Request</h2>
                            <div></div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="Examination_Date" className='font-Para text-base'>Examination Date *</label>
                                <input
                                    type='date'
                                    name="Examination_Date"
                                    id="Examination_Date"
                                    onChange={handleInputChange}
                                    value={formData.Examination_Date}
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                />
                            </div>

                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="clinical_summary_title" className='font-Para text-base'>Organization</label>
                                <input
                                    type='text'
                                    name="clinical_summary_title"
                                    id="clinical_summary_title"
                                    value={Organization}
                                    disabled
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="category_id" className='font-Para text-base'>Request Type *</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    required
                                    onChange={(e) => {
                                        Service.map((item2, index2) => {
                                            if (item2.category_id == e.target.value) {
                                                console.log(item2)
                                                setPrice(item2.price)
                                            } else if (e.target.value == '') {
                                                setPrice(0)
                                            }
                                        })
                                        setFormData({
                                            ...formData,
                                            'category_id': e.target.value
                                        });
                                    }}
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                >
                                    <option value="">Please Select from the List below</option>
                                    {Service.map((item, index) => (
                                        <option
                                            value={item.category_id}
                                            key={index}
                                        >
                                            {item.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="previous_study" className='font-Para text-base'>Previous History (If any)</label>
                                <input type='text' name="previous_study" value={formData.previous_study} onChange={handleInputChange} className='border-gray-400 border-2 py-2 px-4 rounded-lg ' />
                                <p className='text-red-600 text-base'>Please provide the company study indication and other relevant patient history which are essential for radiologist diagnosis</p>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className='mt-5'>
                            <p className='text-base text-gray-500 my-2'>
                                Upload Study Image File (file type DICOM or DICOM files in ZIP, RAR)
                                <span className='text-red-600 font-bold'>Please upload DICOM (.dcom) files only.</span>
                            </p>
                            <div className='w-[100%] flex flex-col'>
                                <label htmlFor="file" className='font-Para text-base'>Add Image</label>
                                <input
                                    id="file"
                                    name='file'
                                    className='border-gray-400 border-2 py-2 px-4 rounded-lg '
                                    type='file'
                                    onChange={handleFileChange}
                                    accept='.dcm, .zip'
                                />
                            </div>
                            <p className='text-red-600 text-base font-bold'>Examination / Study Image file is mandatory for the reading specialist to report</p>
                            <p className='text-base text-gray-500 my-2'>
                                To upload more than one file, create a single ZIP or RAR file containing all the DICOM image files you want to upload.
                            </p>

                            <div className='flex flex-row gap-2 my-2'>
                                <input type="checkbox" />
                                <span>I hereby confirm the above service request (agreeing to this constitutes a purchase order)</span>
                            </div>
                        </div>

                        {/* Button Submit */}
                        <div className='flex flex-col justify-end w-[100%] '>
                            <button type="submit" className='bg-slate-700 border-2 border-slate-700 hover:bg-transparent hover:text-slate-700 text-white ease-in-out duration-300 w-fit py-2 px-4 text-lg font-Para font-medium mt-6 rounded-lg'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewReport;