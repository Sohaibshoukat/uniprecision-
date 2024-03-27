import React, { useContext, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'
import PasswordUpdate from './PasswordUpdate'

const UserAccount = ({ handleLogout, toggleMenu }) => {

  const StateData = [
    "Sarawak",
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Selangor",
    "Terengganu",
    "Outside Malaysia",
  ]

  const navigate = useNavigate()

  const [User, setUser] = useState(null)

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;


  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [Type, setType] = useState('');


  const getuser = async () => {
    fetch(`http://localhost:3000/guest/getUser/${localStorage.getItem('userid')}`) // Assuming this is the correct endpoint
      .then(response => {
        if (!response.ok) {
          showAlert('Network response was not ok', 'danger');
        }
        return response.json();
      })
      .then(data => {
        if (data.user) {
          setUser(data.user)
          const user = data?.user
          setName(user.name)
          setOrganization(user?.organization);
          setMobileNumber(user?.mobile_number);
          setEmail(user?.email);
          setAddressLine1(user?.address_line_1);
          setAddressLine2(user?.address_line_2);
          setPostcode(user?.postcode);
          setCity(user?.city);
          setState(user?.state);
          setCountry(user?.country);
          setRole(user?.role);
          setType(user?.guest_type);

        }
      })
      .catch(error => {
        showAlert('Error fetching your Data', 'danger');
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('doctorId')
        localStorage.removeItem('userid')
        localStorage.removeItem('RadioId')
        navigate('/login')
      });
  }

  const updateUser = async () => {
    const userId = localStorage.getItem('userid');

    try {
      const response = await fetch(`http://localhost:3000/guest/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          organization,
          guest_type: Type,
          mobile_number: mobileNumber,
          email,
          address_line1:addressLine1,
          address_line2:addressLine2,
          postcode,
          city,
          state,
          country,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showAlert('User updated successfully','success');
        getuser()
      }else{
        showAlert(data.error , 'danger');
      }

    } catch (error) {
      showAlert(error.message , 'danger');
    }
  };



  useEffect(() => {
    getuser()
    console.log(name)
  }, [])

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
        <h2 className='text-lg md:text-xl font-normal'>Account Settings</h2>
        <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
      </div>
      <div className='min-h-[100vh] py-10 px-5 md:px-10 m-auto'>
        <div className=''>
          <h2 className='font-Para text-2xl font-bold mb-2'>Welcome to your User Area</h2>
          <p className='text-gray-500 text-xl font-medium'>Please Check your profile information is Updated</p>

          <div className='my-10 bg-gray-200 rounded-lg py-8 px-5 md:px-10 flex flex-col gap-8'>
            <div className="flex flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Name *</label>
                <input
                  type="text"
                  placeholder='Your Name'
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Mobile Number *</label>
                <input
                  type="text"
                  placeholder='+00000000000'
                  value={mobileNumber}
                  onChange={(e) => { setMobileNumber(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Email *</label>
              <input
                type="text"
                placeholder='abc@gmail.com'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 1 *</label>
              <input
                type="text"
                placeholder='ABC clinic'
                value={addressLine1}
                onChange={(e) => { setAddressLine1(e.target.value) }}
                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex flex-col md:flex-row basis-[50%] gap-2  md:items-center">
              <label htmlFor="" className='basis-[30%] text-gray-500 text-lg font-normal'>Address Line 2</label>
              <input
                type="text"
                placeholder='Gound flour Sublot 23'
                value={addressLine2}
                onChange={(e) => { setAddressLine2(e.target.value) }}
                className='basis[70%] md:w-[70%] text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Postcode *</label>
                <input
                  type="text"
                  placeholder='Your post Code'
                  value={postcode}
                  onChange={(e) => { setPostcode(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>City *</label>
                <input
                  type="text"
                  placeholder='Your City'
                  value={city}
                  onChange={(e) => {setCity(e.target.value)}}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>State *</label>
                <select
                  value={state}
                  onChange={(e) => { setState(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md '>
                  <option value="">Select from list</option>
                  {StateData.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Country *</label>
                <select
                  value={country}
                  onChange={(e) => { setCountry(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                  <option value="Malaysia">Malaysia</option>
                  <option value="US">US</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>
            </div>
            <div className="flex  flex-col gap-[20px] lg:flex-row">
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>User type *</label>
                <select
                  value={Type}
                  onChange={(e) => { setType(e.target.value) }}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md'>
                  <option value="Organization">Organization</option>
                  <option value="Personal">Personal</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              {Type=='Organization'&&
              <div className="flex flex-col basis-[50%] gap-2">
                <label htmlFor="" className='text-gray-500 text-lg font-normal'>Organization *</label>
                <input
                  type="text"
                  placeholder='Your Organization Name'
                  value={organization}
                  onChange={(e) => {setOrganization(e.target.value)}}
                  className='text-black placeholder:text-gray-400 text-lg py-2 px-4 rounded-md' />
              </div>}
            </div>
            <button 
              className='w-full bg-darkblue text-white border-2 border-darkblue hover:bg-transparent  py-2  rounded-lg ease-in-out duration-300 hover:text-darkblue text-xl font-medium'
              onClick={()=>{
                updateUser()
              }}
            >
                Submit
            </button>
          </div>
        </div>
      </div>

      <PasswordUpdate/>
    </>
  )
}

export default UserAccount