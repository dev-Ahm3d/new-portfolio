'use client'
import Link from "next/link"
import './CustomButton.css'
import {FaArrowRight , FaDownload} from 'react-icons/fa'
type CustomBtnProps = {
    text:string , 
    page : string , 
    to : string ,
    blank? : boolean
}
const CustomButton = ({text,page,to,blank}:CustomBtnProps) => {
    return (
        <Link target={blank ? '_blank' : "_self"} className="custom-button" href={to}>
            <span>{text}</span>
            {
                page === 'home' && (<FaArrowRight size='2em' />)
            }
            {
                page === 'about' && (<FaDownload size='2em' />)
            }        
        </Link>
    )
}

export default CustomButton