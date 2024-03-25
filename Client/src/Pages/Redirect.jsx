import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') == "Doctor") {
                navigate('/docDashboard')
            }
            else if (localStorage.getItem('role') == 'Radiologist') {
                navigate('/radioDashboard')
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