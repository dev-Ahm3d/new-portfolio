import Image from 'next/image'
import './Card.css'
import React, { Dispatch, SetStateAction } from 'react'
type CardProps = {
    handleClick : Dispatch<SetStateAction<boolean>> , 
    project : any
}
const Card = ({handleClick,project}:CardProps) => {
    return (
        <div onClick={() => handleClick(project)} className="custom-card">
            <Image width={500} height={500} alt='title' src={project?.images[project?.images?.length-1]}/>
            <h2 className='project-title'>{project?.title}</h2>
        </div>
    )
}

export default Card