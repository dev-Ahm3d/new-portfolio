import React from 'react'
type SectionTitleProps = {
    text : string , 
    left? : boolean
}
const SectionTitle = ({text,left}:SectionTitleProps) => {
    return (
        <h2 style={{
            fontSize:'1.5rem' ,
            margin : '20px auto' ,
            textAlign : `${left ? "left" : "center"}` ,
            textTransform : "uppercase" ,
            fontWeight : "bold"
        }}>
            {text}
        </h2>
    )
}

export default SectionTitle