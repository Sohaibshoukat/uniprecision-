import React from 'react'
import { useLocation } from 'react-router-dom'
import Image1 from '../../assets/Reports/Image2.jpeg'

const ReportDetail = () => {
  const location = useLocation();
  const { item } = location.state;
  return (
    <div className='w-[100%] min-h-[100vh] h-[100%] m-auto'>
      <div className="flex flex-col lg:flex-row justify-between h-[100%]">
        <div className="basis-[25%] bg-slate-300 py-10 px-5 h-[100%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="" className='text-xl font-Para font-medium'>Previous study: </label>
              <textarea
                name=""
                id=""
                cols="30"
                className='border-[1px] h-20 md:h-44 border-slate-700 rounded-lg py-2 px-4 text-lg font-normal text-black placeholder:text-gray-500'
                placeholder='Enter Patient Previous Study'
              >
              </textarea>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="" className='text-xl font-Para font-medium'>Findings: </label>
              <textarea
                name=""
                id=""
                cols="30"
                className='border-[1px] h-20 md:h-44 border-slate-700 rounded-lg py-2 px-4 text-lg font-normal text-black placeholder:text-gray-500'
                placeholder='What finds in report'
              >
              </textarea>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="" className='text-xl font-Para font-medium'>Summary: </label>
              <textarea
                name=""
                id=""
                cols="30"
                className='border-[1px] h-20 md:h-44 border-slate-700 rounded-lg py-2 px-4 text-lg font-normal text-black placeholder:text-gray-500'
                placeholder='Enter end Summary'
              >
              </textarea>
            </div>
          </div>
          <div className='flex flex-col my-4 xl:flex-row justify-between gap-4'>
            <button
              className='bg-slate-700 border-2 border-slate-700 w-[100%] rounded-lg py-2 px-4 text-xl font-Para  text-white hover:bg-transparent hover:text-slate-700 ease-in-out duration-300'
            >
              Submit Report
            </button>
            <button
              className='bg-slate-700 border-2 border-slate-700 w-[100%] rounded-lg py-2 px-4 text-xl font-Para  text-white hover:bg-transparent hover:text-slate-700 ease-in-out duration-300'
            >
              Save Draft
            </button>
          </div>
        </div>
        <div className="basis-[75%] w-[100%] py-4 px-4 md:py-10 md:px-10 h-[100%]">
          <div className="flex flex-col w-[100%] bg-gray-100 py-4 px-4 md:py-10 md:px-10 rounded-lg">
            <div className='flex flex-col md:flex-row gap-2 justify-between'>
              <div>
                <h2 className='text-black font-medium text-xl'>Image Uploaded</h2>
                <p>Reporte Uploaded by doctor to examine</p>
              </div>
              <button
                className='bg-slate-700 border-2 border-slate-700 w-fit rounded-lg py-2 px-2 md:px-4 text-base md:text-xl font-Para  text-white hover:bg-transparent hover:text-slate-700 ease-in-out duration-300'
              >
                <a 
                  href={Image1}
                  download={'sohaib Report'}
                >
                Download Image
                </a>
              </button>
            </div>
            <img src={Image1} alt="" className='w-[100%] h-[100%] py-5' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportDetail