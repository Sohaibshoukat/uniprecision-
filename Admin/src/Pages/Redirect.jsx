import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
                navigate('/admin-dashboard')
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