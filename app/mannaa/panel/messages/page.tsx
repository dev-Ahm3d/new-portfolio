'use client'
import { useEffect, useState } from 'react'
import './Messages.css'
import axios from 'axios'
import Loading from '@/components/Loading'
import { apiBaseUrl } from '@/utils/callApi'
const page = () => {
    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${apiBaseUrl}/messages`)
        .then(resp =>{
            setLoading(false)
            setMessages(resp?.data.messages)
        })
        .catch(err => window.location.href = '/500')
    },[])
    if(loading) return <Loading/>
    return (
        <div className='msgs-cont'>
            <h2>Messsages</h2>
            <table className='messages'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        messages.map((el:any)=>{
                            return(
                                <tr key={el._id}>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.subject}</td>
                                    <td>{new Date(el.date).toLocaleString()}</td>
                                    <td>{el.message}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default page