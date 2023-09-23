'use client'
import './Contact.css'
import '../../components/cutomButton/CustomButton.css'
import {BiSolidNavigation} from 'react-icons/bi'
import PageTitle from "@/components/pageTitle/PageTitle"
import{BiSolidEnvelopeOpen} from 'react-icons/bi'
import {IoMapSharp} from 'react-icons/io5'
import {FaPhoneAlt ,FaFacebookF , FaLinkedinIn , FaYoutube} from 'react-icons/fa'
import 'animate.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomAlert from '@/components/customAlert/CustomAlert'
import callApiHandler, { apiBaseUrl } from '@/utils/callApi'
const page = () => {

    const [info,setInfo] = useState<any>(null) 
    const [alertMsg,setAlert] = useState('')
    useEffect(()=>{
        document.title = 'Ahmed Ehab | contact'
        axios.get(`${apiBaseUrl}/user`)
        .then(resp => setInfo(resp?.data.info))
        .catch(() => window.location.href = '/error')
    },[])
    const {register,handleSubmit,reset} = useForm()
    const onSubmit = async (fields:any)=>{
        const resp = await callApiHandler('post','/messages',{},fields)
        if(resp?.status === 201){
            reset()
            setAlert('sent successfully')
            setTimeout(()=>{
                setAlert('')
            },2000)
        }
    }
    return (
        <div className="contact-page animate__animated animate__slideInDown">
            {alertMsg && <CustomAlert msg={alertMsg}/>}
            <PageTitle word1="contact" word2="get in" word3="touch"/>
            <div className="my-container info-form">
                <div className="contact-info animate__animated animate__fadeIn animate__slower">
                    <h2>don't be shy !</h2>
                    <p>
                        Feel free to get in touch with me. I am always open to discussing new projects, 
                        creative ideas or opportunities to be part of your visions.
                    </p>
                    <div className='info-address'>
                        <IoMapSharp size='2em'/>
                        <div>
                            <h3>address</h3>
                            <p>10th of ramadan city</p>
                        </div>
                    </div>
                    <div className='info-mail'>
                        <BiSolidEnvelopeOpen size='2em'/>
                        <div>
                            <h3>Mail Me</h3>
                            <p>ahm3dpro98@outlook.com</p>
                        </div>
                    </div>
                    <div className='info-phone'>
                        <FaPhoneAlt size='1.7em'/>
                        <div>
                            <h3>call me</h3>
                            <p>+201067115590</p>
                        </div>
                    </div>
                    <div className='social-icons'>
                        <a href={info?.facebook} target='_blank' className='facebook' title='Facebook'><FaFacebookF size='1.2em'/></a>
                        <a href={info?.linkedin}  target='_blank' className='linkedin' title='Linkedin'><FaLinkedinIn size='1.2em'/></a>
                        <a href={info?.youtube}  target='_blank' className='youtube' title='Youtube'><FaYoutube  size='1.5em'/></a>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                    <div>
                        <input 
                            required
                            maxLength={100}
                            className='form-inp-name'
                            placeholder='name'
                            {...register('name')} 
                        />
                        <input 
                            required
                            type='email'
                            maxLength={100}
                            className='form-inp-email' 
                            placeholder='email'
                            {...register('email')}  
                        />
                    </div>
                    <input 
                        required
                        maxLength={100}
                        className='form-inp-sub' 
                        placeholder='subject'
                        {...register('subject')}  
                        />
                    <textarea 
                        required
                        maxLength={1000}
                        style={{resize:'none'}} 
                        className='form-inp-msg' 
                        placeholder='message'
                        {...register('message')}  
                    />
                    <button className='custom-button'>
                        <span>Send Message</span>
                        <BiSolidNavigation size='2em' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page