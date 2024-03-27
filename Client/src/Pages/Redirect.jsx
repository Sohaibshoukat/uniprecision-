import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('userid')) {
            if (localStorage.getItem('role') == "Doctor" && localStorage.getItem('doctorId')) {
                navigate('/docDashboard')
            }
            else if (localStorage.getItem('role') == 'Radiologist' && localStorage.getItem('RadioId')) {
                navigate('/radioDashboard')
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }

    }, [])

    return (
        <>
        </>
    )
}

export default Redirect