import PageTitle from "@/components/pageTitle/PageTitle"
import './Portfolio.css'
import ProjectsList from "@/components/ProjectsList/ProjectsList"
import 'animate.css'
import { Metadata } from "next"
import { apiBaseUrl } from "@/utils/callApi"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
    title: 'Ahmed Ehab | portfolio',
    description: 'Ahmed Ehab Portfolio',

}
const getProjects = async ()=>{
    try {
        const resp = await fetch(`${apiBaseUrl}/projects`,{cache:'no-cache'})
        const data = await resp.json()
        return data.docs
    } catch (error) {
        console.log(error)
        //redirect('/error')
    }
}
//export const runtime = 'edge'


const page = async () => {
    const projects = await getProjects()
    return (
        <div className="portfolio-page">
            <PageTitle word1="works" word2="my" word3="portfolio"/>
            <ProjectsList projects={projects || []}/>
        </div>
    )
}

export default page