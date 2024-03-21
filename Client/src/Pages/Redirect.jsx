import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            if (sessionStorage.getItem('portal') == "Doctor") {

                navigate('/docDashboard')

            }
            else if (sessionStorage.getItem('portal') == 'Radiologist') {

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