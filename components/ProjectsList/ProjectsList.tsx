'use client'
import React, { useState } from 'react'
import Card from '../card/Card'
import ProjectBox from '../projectBox/ProjectBox'
import './ProjectsList.css'
import 'animate.css'

type ProjectListProps = {
    projects : [any]
} 
const ProjectsList = ({projects}:ProjectListProps) => {
    const [project,setProject] = useState<any | null>(null)
    return (
        <>
            <div className='my-container works animate__animated animate__slideInUp'>
                {
                    projects.map(el =>{
                        return(
                            !el?.disabled && <Card key={el?._id} project={el} handleClick={setProject}/>
                        )
                    })
                }
            </div>
            {
                project?._id && <ProjectBox project={project} handleClick={setProject} />
            }
            
        </>
    )
}

export default ProjectsList