import PageTitle from "@/components/pageTitle/PageTitle"
import './About.css'
import CustomButton from "@/components/cutomButton/CustomButton"
import Image from "next/image"
import 'animate.css';
import SectionTitle from "@/components/SectionTitle";
import {PiBagSimpleFill} from 'react-icons/pi'
import { Metadata } from "next";
import React from "react";
import { apiBaseUrl } from "@/utils/callApi";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: 'Ahmed Ehab | about',
    description: 'About Ahmed Ehab'
}

const getData = async ()=>{
    try {
        const resp = await fetch(`${apiBaseUrl}/about`,{cache:"no-cache"})
        const data = await resp.json()
        return data
    } catch (error) {
        //console.log(error)
        redirect('/error')
    }
}
export const runtime = 'edge'

export default async function About() {
    const data = await getData()
    return (
        <section className="about-cont animate__animated animate__slideInDown">
            <PageTitle word1='resume' word2="about" word3="me"/>
            <article className="my-container info-deps animate__animated animate__fadeIn animate__slower">
                <div className="person-info-cont">
                    <SectionTitle left={true} text="Personal Info"/>
                    <div className="person-info">
                        <div>
                            <span>Name : </span>
                            <span>{data?.info.name}</span>
                        </div>
                        <div>
                            <span>Nationality : </span>
                            <span>Egyptian</span>
                        </div>
                        <div>
                            <span>Military Status : </span>
                            <span style={{color:"rgb(5, 189, 5)"}}>Completed</span>
                        </div>
                        <div>
                            <span>Phone : </span>
                            <span>+2{data?.info.phone}</span>
                        </div>
                        <div>
                            <span>Email : </span>
                            <span>{data?.info.email}</span>
                        </div>
                        <div>
                            <span>Age : </span>
                            <span>
                                {
                                    Math.floor( ( new Date().valueOf() - new Date(data?.info.dateOfBirth).valueOf() ) / (365.25 * 24 * 60 * 60 * 1000) )
                                }                           
                            </span>
                        </div>
                        <div>
                            <span>Languages : </span>
                            <span>Arabic , English</span>
                        </div>
                        <div>
                            <span>Freelance : </span>
                            <span style={{color:"rgb(5, 189, 5)"}}>Available</span>
                        </div>
                    </div>
                    <CustomButton blank={true} to={data?.info.cv} text="download cv" page="about"/>
                </div>
                <div className="about-deps">
                    <div className="dep">
                        <div className="dep-number">
                            <span>{data?.info.experience}</span>
                            <span>+</span>
                        </div>
                        <div className="dep-text">
                            <span>years of</span>
                            <span>experience</span>
                        </div>
                    </div>
                    <div className="dep">
                        <div className="dep-number">
                            <span>{data?.info.projects}</span>
                            <span>+</span>
                        </div>
                        <div className="dep-text">
                            <span>completed</span>
                            <span>projects</span>
                        </div>
                    </div>
                </div>
            </article>

            <hr/>

            <article className="my-container my-skills-cont animate__animated animate__fadeIn animate__slower">
                <SectionTitle text="my skills"/>
                <div className="my-skills">
                    {
                        data?.skills.sort((a:any, b:any) => a.priority - b.priority).map((el:any) =>{
                            return(
                                !el.disabled && <div key={el._id}  className="skill">
                                    <Image width={500} height={500} src={el.image} alt={el.title} title={el.title} />
                                    <span>{el.title}</span>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </article>

            <hr/>

            <article className="my-container exps-cont animate__animated animate__fadeIn animate__slower">
                <SectionTitle text="EXPERIENCE & EDUCATION" />
                <div className="exps">
                    {
                    data?.achievements.map((el:any)=>{
                            return(
                                !el?.disabled && <div className="exp" key={el._id}>
                                    <span className='exp-icon'> <PiBagSimpleFill size='1.2em'/> </span>
                                    <span className="period">{el.period}</span>
                                    <div className="title-place">
                                        <h2>{el.position}</h2>
                                        <h3>- {el.company}</h3>
                                    </div>
                                    <p className="desc">
                                        {
                                            el.description.includes('</br>') ?
                                            <>
                                                {
                                                    el.description.split('</br>').map((el:any,i:number)=>{
                                                        return(
                                                            <React.Fragment key={i}>
                                                                {el}
                                                                <br></br>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                                
                                            </>
                                            :
                                            el.description
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                
            </article>
        </section>
    )
}


