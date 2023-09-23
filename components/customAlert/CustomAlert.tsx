import { useEffect, useState } from 'react'
import './CustomAlert.css'
import {IoCheckmarkDoneSharp} from 'react-icons/io5'
type CustomAlertProps = {
    msg : string ,
}
const CustomAlert = ({msg}:CustomAlertProps) => {
    return (
        <>
            <div className='alert-overlay'></div>
            <div className="custom-alert">
                <h3>{msg}</h3>
                <IoCheckmarkDoneSharp size='2em'/>
            </div>
        </>
        
    )
}

export default CustomAlert