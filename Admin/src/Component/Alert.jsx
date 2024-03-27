import React, { useContext } from 'react'
import {
    CAlert,
} from '@coreui/react'
import AlertContext from '../Context/Alert/AlertContext';

export default function Alert(s) {
    const Context = useContext(AlertContext);
    const { alert } = Context;

    return (
        alert && 
        <div className={`text-white font-Para text-lg fixed top-2 right-4 z-50 ${alert.type=='success'? 'bg-green-600': 'bg-red-600'} rounded-lg py-4 px-6`}>
            {alert.message}
        </div>
    )
}
