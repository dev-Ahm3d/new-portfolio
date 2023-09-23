"use client"
export default function Error() {
    return (
        <div style={{
            padding:'50px' , 
            textAlign : 'center' , 
        }}>
            <h2>Something went wrong!</h2>
            <button onClick={() => window.location.href = '/'} style={{
                background : 'var(--color2)',
                padding : '10px' ,
                fontSize : '16px' ,
                border : 'none' ,
                borderRadius : '5px' ,
                marginTop : '10px' ,
                fontWeight : 'bold' ,
                cursor : 'pointer'
            }}>Return Home</button>
        </div>
    )
}