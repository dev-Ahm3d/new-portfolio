'use client'
import Loading from '@/components/Loading'
import PanelForm from '@/components/panelForm/PanelForm'
import { apiBaseUrl } from '@/utils/callApi'
import axios from 'axios'
import { useEffect, useState } from 'react'
const page = () => {
    const [techs,setTechs] = useState([])
    useEffect(()=>{
        axios.get(`${apiBaseUrl}/skills`)
        .then(resp =>{
            setTechs(resp?.data.docs)
        })
        .catch(err => console.log(err))
    },[])
    if(techs.length === 0) return <Loading/>
    return (
        <PanelForm
            category="portfolio" 
            header="portfolio" 
            subHeader="project"
            inputFields={[
                {name:'title' , options:[]} ,
                {name:'description' , options:[]},
                {name : 'liveVersion' , options:[] } ,
                {name : 'github' , options:[]} ,
                {name : 'youtube' , options:[]},
                {name : 'disabled' ,  type : 'checkbox' , options:[]} , 
                {name:'image'  , type:'file' , options:[]} ,
                {name:'techs' ,  type:'select' ,options:techs} 
            ]}  
            inputs={[
                {name:'title' , placeholder:'title'} ,
                {name:'description' , placeholder:'description'},
                {name : 'liveVersion' , placeholder:'live version'} ,
                {name : 'github' , placeholder:'github'} ,
                {name : 'youtube' , placeholder:'youtube'},
                {name:'image'  , type:'file'} ,
                {name : 'disabled' ,  type : 'checkbox'} , 
                {name:'techs' ,  type:'select' ,options:techs} 
            ]}
            apiUrl="/projects"
        />
    )
}

export default page