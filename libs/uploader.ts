import Project from '@/models/Project'
import Skill from '@/models/Skill'
import {v2 as cloudinary} from 'cloudinary'
import { NextRequest } from 'next/server'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME , 
    api_key : process.env.API_KEY , 
    api_secret : process.env.API_SECRET 
})


const uploader =  async (req:NextRequest)=>{
    const skills = await Project.find({}) 
    skills.forEach(async el =>{
        const images:string[] = []
        el.images.forEach((ele:string) =>{
            images.push(ele.replace('http://','https://'))
        })
        el.images = [...images] 
        await el.save()
    })
    const formData = await req.formData()
    const jsonData:any = {}
    const keys = [...formData.keys()]
    const values = [...formData.values()]
    keys.forEach((key,i) =>{
        if(key == 'techs') jsonData['techs'] = values[i].toString().split(',')
        else jsonData[key] = values[i]
    })
    
    let imgs : any[] = formData.getAll('image')
    let individual = imgs && imgs.length === 1
    let multi = imgs && imgs.length > 1
    let field : string
    if(individual){
        field = 'image'
        jsonData['image'] = ''
    }else if(multi){
        field = 'images'
        jsonData['images'] = []
    }
    
    const handleUpload = async (image:any)=>{
        const {url} =  await cloudinary.uploader.upload(image)  
        if(url && field === 'images') jsonData['images'].push(url.replace('http://','https://'))
        if(url && field === 'image') jsonData['image'] = url.replace('http://','https://') 
    }
    if(individual) await handleUpload(imgs[0])
    else if(multi){
        for(let el of imgs){
            await handleUpload(el)
        }  
    }
    return jsonData
}

export default uploader
