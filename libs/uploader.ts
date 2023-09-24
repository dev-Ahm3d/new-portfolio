import {v2 as cloudinary} from 'cloudinary'
import {readFile, unlink, writeFile } from 'fs/promises'
import getConfig from 'next/config'
import { NextRequest } from 'next/server'
import path from 'path'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME , 
    api_key : process.env.API_KEY , 
    api_secret : process.env.API_SECRET 
})


const uploader =  async (req:NextRequest)=>{
    const formData = await req.formData()
    const jsonData:any = {}
    /*
    const keys = [...formData.keys()]
    const values = [...formData.values()]
    keys.forEach((key,i) =>{
        if(key == 'techs') jsonData['techs'] = values[i].toString().split(',')
        else jsonData[key] = values[i]
    })

    const {publicRuntimeConfig } = getConfig();
    let imgs : any = formData.getAll('image')
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
    /*
    const handleUpload = async (image:any)=>{
        if(image.type.includes('image/')){
            const bytes = await image?.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const imageName = Date.now() + '-' + image.name
            const filePath = path.join(publicRuntimeConfig.uploadsPath, imageName);
            await writeFile(filePath,buffer)
            const file = await readFile(filePath)
            const imgCloud = `data:${image.type};base64,` +  Buffer.from(file).toString('base64')
            const {url} =  await cloudinary.uploader.upload(imgCloud)  
            //await unlink(filePath)          
            if(url && field === 'images') jsonData['images'].push(url)
            if(url && field === 'image') jsonData['image'] = url 
        }else jsonData.err = "invalid image type !!"  
    }
    if(individual) await handleUpload(imgs[0])
    else if(multi){
        for(let el of imgs){
            await handleUpload(el)
        }  
    }
    */
    return jsonData
}

export default uploader

