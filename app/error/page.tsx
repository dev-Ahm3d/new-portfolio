import { Metadata } from "next"

export const metadata: Metadata = {
    title: '500: Internal server error',
    description: '500: Internal server error',
}
const Page = () => {
    return (
        <div style={{
            padding : '20px' , 
            paddingTop : '40px' ,
            textAlign : "center" , 
            display : 'flex' , 
            flexDirection : 'column' ,
            justifyContent : 'center' , 
            alignItems : 'center' , 
        }}>
            <h2>Something went wrong!</h2>
            <a style={{
                margin : '10px' ,
                backgroundColor : 'var(--color2)',
                padding : '10px' ,
                borderRadius : '5px' ,
                fontWeight : '500'

            }} href="/">Return Home</a>
        </div>
    )
}

export default Page