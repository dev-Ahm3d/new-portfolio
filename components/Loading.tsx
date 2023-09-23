'use client'
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
const LoadingSpinner = () => {
    return (
        <div style={{
                padding:'20px' , 
                display : 'flex' , 
                justifyContent : 'center' , 
                alignItems:'center' ,
                position : 'fixed' , 
                left : '50%' , 
                top : '50%' ,
                transform : 'translate(-50%,-50%)' ,
                width : '100vw' , 
                height : '100vh' ,
                backgroundColor : 'rgba(0,0,0,.5)' ,
                zIndex : 20000 ,
                scrollBehavior : 'auto'
                
            }}>
            <CircularProgress/>
        </div>
    )
}

export default LoadingSpinner