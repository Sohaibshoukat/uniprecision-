import React, { useContext, useEffect, useState } from 'react'
import STAMP from "../../assets/stamp.png"
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogOut } from 'react-icons/io'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import AlertContext from '../../Context/Alert/AlertContext';
import { convertDateFormat } from '../DateFunction';

const ReportDetails = ({ handleLogout, toggleMenu }) => {

  const location = useLocation()


  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const itemid = location.state.id
  const [Data, setData] = useState([])
  const [doctor, setdoctor] = useState()
  const [radio, setradio] = useState(null)

  const [name, setname] = useState(Data?.patient_name);
  const [Loading, setLoading] = useState(false)

  const [Organization, setOrganization] = useState('')


  const downloadPDF = () => {
    const capture = document.querySelector('#pdf-content');
    setLoading(true);
    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const ratio = canvas.width / canvas.height;
      const width = doc.internal.pageSize.getWidth();
      const height = width / ratio;
      doc.addImage(imgData, 'PNG', 0, 0, width, height);
      setLoading(false);
      doc.save(`UNIPRECISION-${Data?.patient_name}.pdf`);
    });
  };
  

  const getorder = async () => {
    fetch(`https://backend.uniprecision.com.my/radiologist/getcompleteSingleReprt/${localStorage.getItem('RadioId')}/${itemid}`) // Assuming this is the correct endpoint
      .then(response => {
        if (!response.ok) {
          showAlert('Network response was not ok', 'danger');
        }
        return response.json();
      })
      .then(data => {
        if (data.report) {
          setData(data.report);
          setdoctor(data.doctor);
          setradio(data.radio)
        }
      })
      .catch(error => {
        showAlert('Error fetching categories', 'danger');
      });
  }

  useEffect(() => {
    getorder()
  }, []);


  const fetchDoctorOrganization = async () => {
    try {
      const userId = localStorage.getItem('userid'); // Assuming you have stored userId in localStorage
      const response = await fetch(`https://backend.uniprecision.com.my/guest/getorganization/${userId}`);
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
        <h2 className='text-lg md:text-xl font-normal'>Report Detail</h2>
        <IoIosLogOut className='text-3xl md:text-3xl' onClick={handleLogout} />
      </div>
      <div className='min-h-[100vh] py-10 m-auto'>
        <div className=''>
          <div className='flex flex-row justify-between px-2 md:px-10'>
            <h2 className='font-Para text-3xl font-bold mb-4'>Report Detail</h2>
            <button
              onClick={downloadPDF}
              className={` bg-slate-700 border-2 border-slate-700 text-lg text-white 
                        font-Para py-2 px-4 rounded-lg my-5 float-right ease-in-out duration-300 
                        ${Loading ? 'opacity-45' : ' hover:bg-transparent hover:text-slate-700 '}
                      `}
              disabled={Loading}
            >
              {Loading ? 'Downloading...' : 'Download Report'}
            </button>
          </div>
          <div className='w-[100%] font-Para text-lg' id='pdf-content'>
            <div className="flex flex-row justify-between py-6">
              <div className="basis-[35%] flex justify-center h-auto">
                <img src={'../Logo.png'} alt="" className='w-fit h-[150px]' />
              </div>
              <div className="basis-[60%]">
                <div className='w-[100%] flex flex-col gap-1 text-right py-4 px-10 bg-darkblue rounded-tl-3xl rounded-bl-3xl text-white font-Para text-lg font-light'>
                  <h1 className='text-2xl font-bold'>UNIPRECISION TELERAD SDN. BHD. (1549296)-V</h1>
                  <p>Unisquare Commercial Centre, Sublot 23,</p>
                  <p>Kuching-Samarahan Expressway, 94300 kota Samarahan, Sarawak</p>
                  <p>admin@uniprecision.com.my</p>
                </div>
                <div className='text-right py-2 px-8'>
                  <h2 className='text-darkblue font-Para text-2xl font-bold text-right'>www.uniprecision.com.my</h2>
                  <h3 className='text-black font-Para text-lg font-bold text-right'>PRIVATE & CONFIDENTIAL</h3>
                </div>
              </div>
            </div>


            <div className='flex flex-col my-10 w-[80%] m-auto'>
              <div className="flex flex-row justify-between gap-[10%] items-center">
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Name</h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{Data?.patient_name}</h4>
                </div>
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Examination Date </h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{convertDateFormat(Data?.examination_date)}</h4>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-[10%] items-center">
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Date of Birth</h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{convertDateFormat(Data?.dob)}</h4>
                </div>
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Age</h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{Data?.age}</h4>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-[10%] items-center">
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>NRIC/Passport No</h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{Data?.nric_passport_no}</h4>
                </div>
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Gender</h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{Data?.gender}</h4>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-[10%] items-center">
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Referring Doctor </h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{doctor?.doctor_name}</h4>
                </div>
                <div className="flex font-Para text-lg flex-row justify-between basis-[50%] items-center">
                  <div className='flex flex-row justify-between basis-[60%]'>
                    <h4 className='font-bold'>Clinic/Diagnostic Center </h4>
                    <span className='font-bold'>:</span>
                  </div>
                  <h4>{Data?.clinical_summary_title}</h4>
                </div>
              </div>
            </div>

            <div className='flex w-[80%] flex-col gap-8 m-auto'>
              <h2 className='mb-6'>Clinical Summary</h2>
              <h2>Examination-Date: <span className='ml-5'>{convertDateFormat(Data?.examination_date)}</span></h2>

              <div className='flex flex-col gap-1'>
                <h1>Prvious study:</h1>
                <p className='ml-4 text-lg'>{Data?.previous_study}</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h1>Findings:</h1>
                <p>{Data?.findings}</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h1>Summary:</h1>
                <p>{Data?.summary}</p>
              </div>


              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <h1>Reported by:</h1>
                    <div className='ml-4 '>
                      <p>{radio?.radio_name}</p>
                      <p>{Organization == '' ? 'N/A' : Organization}</p>
                      <p>MMC No: 68832 MD </p>
                      <p>(USU), FRCR (UK) </p>
                    </div>
                  </div>
                  <h2>Date<span className='ml-5'>{convertDateFormat(new Date())}</span></h2>
                </div>
                <div className='w-fit'>
                  <img src={STAMP} alt="" className='w-[200px] h-[200px]' />
                </div>
              </div>

              <div className='text-center my-10'>
                <h2 className='font-bold'>This report is generated from Radiology Information System. No Signature required.</h2>
                <h2 className='font-bold'>www.uniprecision.com.my</h2>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ReportDetails