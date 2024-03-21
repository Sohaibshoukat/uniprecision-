import React from 'react'

const ResultReports = () => {
    const Data = [
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        },
        {
            ID: "SR000233",
            Type: "Specialist Reporting",
            Status: "Created",
            Date: "16 May 2023 10:56:42 AM",
            Patient: "Frank Gyver Anak Majing",
            StudyDate: "16 May 2023 10:56:42 AM",
            UploadedFile: "uploads/SR000233.dcm",
            Price: 15,
        }
    ]
    return (
        <div className=''>
            <h2 className='font-Para text-3xl font-bold mb-4'>All Recived Request</h2>

            <div className='overflow-x-scroll'>
                <table className='styled-table'>
                    <thead className='font-Lora'>
                        <tr>
                            <th>Request ID</th>
                            <th>Request Type</th>
                            <th>Request Status</th>
                            <th>Request Date</th>
                            <th>Patient name</th>
                            <th>Study date</th>
                            <th>Uploaded file</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((item, index) => (
                            <tr className='font-Para'>
                                <td>{item.ID}</td>
                                <td>{item.Type}</td>
                                <td>{item.Status}</td>
                                <td>{item.Date}</td>
                                <td>{item.Patient}</td>
                                <td>{item.StudyDate}</td>
                                <td className='text-blue-600 underline cursor-pointer'><a download={item.UploadedFile}></a>{item.UploadedFile}</td>
                                <td>{item.Price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ResultReports