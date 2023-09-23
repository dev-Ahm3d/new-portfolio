'use client' 
import callApiHandler from '@/utils/callApi'
import './Login.css'
import { useState , useEffect}from 'react'
import { signIn } from 'next-auth/react'
const page = () => {
    const [password,setPassword] = useState('')
    useEffect(()=>{
        document.title = '404: This page could not be found'
    })
    return (
        <div className="login-page" >
            <form onSubmit={async e =>{
                e.preventDefault()
                const resp = await signIn("credentials",{
                    password , 
                    redirect : false 
                })
                if(resp?.error) alert('incorrect password')
                else window.location.href = '/mannaa/panel'
            }}>
                <div className='notfound'>
                    <span>404</span>
                    <span>This page could not be found.</span>
                </div>
                <input onChange={e => setPassword(e.target.value)}  type='password' className="password-field" />
            </form>
        </div>
    )
}

export default page