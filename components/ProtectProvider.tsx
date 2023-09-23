'use client' 
import {useSession} from 'next-auth/react'
import React from 'react'
import LoadingSpinner from './Loading'
const ProtectProvider = ({children}:{children:React.ReactNode}) => {
    const {status} = useSession()
    if((status === 'authenticated')) return (
        <>
            {children}
        </>
    )
    else return <LoadingSpinner/> 
}

export default ProtectProvider