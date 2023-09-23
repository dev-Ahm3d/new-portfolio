'use client'
import { Dispatch, SetStateAction } from 'react';
import {BiCodeAlt} from 'react-icons/bi'
import {AiOutlineFileText} from 'react-icons/ai'
import {FiExternalLink } from 'react-icons/fi'
import { AiFillGithub , AiOutlineYoutube} from 'react-icons/ai'
import  { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import './ProjectBox.css'
import Image from 'next/image';
type ProjectBoxProps = {
    handleClick : Dispatch<SetStateAction<any>> , 
    project : any
}
const ProjectBox = ({handleClick,project}:ProjectBoxProps) => {
    return (
        <div className='project-box'>
            <div className='project-overlay'></div>
            <div className='data-box'>
                <div className='close-project'><span onClick={()=>{handleClick(null)}}>X</span></div>
                <div className='pr-data'>
                    <h2>{project?.title}</h2>
                    <ul>
                        <li>
                            <span>
                                <AiOutlineFileText size='1.5em' />
                            </span>
                            <p>
                                <span>Description : </span>
                                <span>{project?.description}</span>
                            </p>
                        </li>
                        <li>
                            <span>
                                <BiCodeAlt size='1.5em' />
                            </span>
                            <p>
                                <span>Languages & Technologies : </span>
                                <span>{[project?.techs.join(' , ')]}</span>
                            </p>
                        </li>
                        {
                            project?.liveVersion && <li>
                                <span>
                                    <FiExternalLink size='1.5em' />
                                </span>
                                <p>
                                    <span>Preview : </span>
                                    <a title={project?.liveVersion} href={project?.liveVersion} target='_blank'>
                                        {project?.liveVersion} 
                                    </a>
                                </p>
                            </li>
                        }
                        {
                            project?.github && <li>
                                <span>
                                    <AiFillGithub size='1.5em' />
                                </span>
                                <p>
                                    <span>Github : </span>
                                    <a title={project?.github} href={project?.github} target='_blank'>
                                        {project?.github}
                                    </a>
                                </p>
                            </li>
                        }
                        {
                            project?.youtube && <li>
                                <span>
                                    <AiOutlineYoutube size='1.5em' />
                                </span>
                                <p>
                                    <span>Youtube : </span>
                                    <a title={project?.youtube} href={project?.youtube} target='_blank'>
                                        {project?.youtube}
                                    </a>
                                </p>
                            </li>
                        }
                    </ul>
                    {
                        project?.images?.length != 0  && <div className='my-swiper'>
                            <Swiper 
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation
                                slidesPerView={1}
                                autoplay={true}
                                
                            >
                                {
                                    project?.images.toReversed().map((el:any)=>{
                                        return(
                                            <SwiperSlide key={el} className='my-swiper-slide'>
                                                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill alt='image' src={el}/>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectBox









