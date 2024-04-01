import React, { useContext, useState } from 'react'
import Nav from '../Component/Nav'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminDashboard from './adminDashboard';
import AddUser from './AddUser';
import Users from './Users';
import Earning from './Earning';
import Pricing from './Pricing';
import AdminProfile from './AdminProfile';
import ApprovedUser from './ApprovedUser';
import NewUser from './NewUser';
import AssignRequest from './AssignRequest';
import AlertContext from '../Context/Alert/AlertContext';

const Dashbaord = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [OpenModel, setOpenModel] = useState(false)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate = useNavigate()

    const [price, setprice] = useState('')
    const [type, settype] = useState(null)
    const [editid, seteditid] = useState(null)
    const [category_name, setcategory_name] = useState('')
    const [categories, setCategories] = useState([]);


    const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("adminID")
            navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchPrice=()=>{
        fetch('https://backend.uniprecision.com.my/admin/getAllCategories') // Assuming this is the correct endpoint
        .then(response => {
            if (!response.ok) {
                showAlert('Network response was not ok', 'danger');
            }
            return response.json();
        })
        .then(data => {
            if (data.users) {
                setCategories(data.users);
            }
        })
        .catch(error => {
            showAlert('Error fetching categories', 'danger');
        });
    }

    const AddService = async () => {
        if(type=='Add'){
            try {
                if(price==''||category_name==''){
                    showAlert('Fill All fields','danger');
                    return;
                }
                const response = await fetch('https://backend.uniprecision.com.my/admin/addCateogry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ price, unit:"RM", category_name })
                });
                
                if (!response.ok) {
                    showAlert('Network response was not ok','danger');
                }
        
                const data = await response.json();
                showAlert('Category Added Success','success')
                setOpenModel(false);
                fetchPrice()
            } catch (error) {
                console.error('Error adding category:', error);
                throw error;
            }
        }else if(type=='Edit'){
            try {
                if(price==''||category_name==''){
                    showAlert('Fill All fields','danger');
                    return;
                }
                const response = await fetch(`https://backend.uniprecision.com.my/admin/editCategory/${editid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ price, unit:"RM", category_name })
                });
                
                if (!response.ok) {
                    showAlert('Network response was not ok','danger');
                }
        
                const data = await response.json();
                showAlert('Category Edit Success','success')
                setOpenModel(false);
                fetchPrice()
            } catch (error) {
                console.error('Error Editing category:', error);
                throw error;
            }
        }
    };
    

    return (
        <>
            {OpenModel &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex justify-center items-center'>
                    <div className='absolute z-30 bg-black/50 w-[100%] h-[100%]' onClick={()=>{setOpenModel(false)}}>

                    </div>
                    <div className='w-fit h-fit bg-white relative z-50 flex flex-col gap-4 rounded-xl lg:w-[40%] py-8 px-8'>
                        <h2 className='text-black font-Para text-2xl'>Add New Service</h2>
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className='text-gray-500 text-xl font-normal'>New Service *</label>
                                <input 
                                    type="text" 
                                    value={category_name}
                                    onChange={(e)=>{setcategory_name(e.target.value)}}
                                    placeholder='Enter servie Name' 
                                    className='w-full text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md border-[1px] border-gray-500' 
                                />
                            </div>
                            <div className="flex flex-col gap-4 ">
                                <label htmlFor="" className=' text-gray-500 text-xl font-normal'>Price *</label>
                                <input 
                                    type="number" 
                                    value={price}
                                    onChange={(e)=>{setprice(e.target.value)}}
                                    placeholder='Enter Service Pricing OTP' 
                                    className='w-full text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md border-[1px] border-gray-500' 
                                />
                            </div>
                        </div>
                            <button 
                                className='w-fit self-center bg-darkblue text-center text-white border-2 border-darkblue hover:bg-transparent px-6  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
                                onClick={AddService}
                            >
                                {type=='Add'? "Add":"Edit"} Servie
                            </button>
                    </div>
                </div>
            }
            <div className='flex flex-row min-h-[100vh]'>
                <div className={`lg:basis-[30%] xl:basis-[15%] z-50 absolute lg:relative w-[80%] md:w-[55%]  h-[100%] ${isMenuOpen && 'hidden'}  lg:block lg:w-auto bg-slate-700`}
                    style={{ overflow: "unset" }}
                >
                    <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu} />
                </div>
                <div className="basis-[100%] lg:basis-[68%] xl:basis-[85%] w-[100%] relative">
                    <Routes>
                        <Route
                            path="/"
                            element={<AdminDashboard toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/new-user"
                            element={<AddUser toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/all-user"
                            element={<Users toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/earning"
                            element={<Earning toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/pricings"
                            element={<Pricing OpenModel={OpenModel} setOpenModel={setOpenModel} toggleMenu={toggleMenu} handleLogout={handleLogout} setprice={setprice} setcategory_name={setcategory_name} settype={settype} seteditid={seteditid} fetchPrice={fetchPrice} categories={categories} />}>
                        </Route>
                        <Route
                            path="/admin-profile"
                            element={<AdminProfile toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/approved-user"
                            element={<ApprovedUser toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/user-request"
                            element={<NewUser toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>
                        <Route
                            path="/assign-request"
                            element={<AssignRequest toggleMenu={toggleMenu} handleLogout={handleLogout} />}>
                        </Route>

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashbaord