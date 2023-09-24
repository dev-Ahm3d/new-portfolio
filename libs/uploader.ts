import {v2 as cloudinary} from 'cloudinary'
import { NextRequest } from 'next/server'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME , 
    api_key : process.env.API_KEY , 
    api_secret : process.env.API_SECRET 
})


const uploader =  async (req:NextRequest)=>{
    const formData = await req.formData()
    const jsonData:any = {}
    const keys = [...formData.keys()]
    const values = [...formData.values()]
    keys.forEach((key,i) =>{
        if(key == 'techs') jsonData['techs'] = values[i].toString().split(',')
        else jsonData[key] = values[i]
    })
    
    //console.log(jsonData)

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
        /*
        const bytes = await image?.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const imageName = Date.now() + '-' + image.name
        const filePath = path.join(process.cwd(), 'public/uploads', imageName);
        await writeFile(filePath,buffer)
        const file = await readFile(filePath)
        const imgCloud = `data:${image.type};base64,` +  Buffer.from(file).toString('base64')
        */
        const {url} =  await cloudinary.uploader.upload(image)  
        if(url && field === 'images') jsonData['images'].push(url)
        if(url && field === 'image') jsonData['image'] = url 
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

