"use client"
import ImageFile from "@/components/imageFile/ImageFile"
import { useState } from "react"
import {useForm} from 'react-hook-form'
import CustomAlert from "@/components/customAlert/CustomAlert"
import callApiHandler from "@/utils/callApi"
import handleFormData from "@/utils/formdata"
import './Panel.css'
import LoadingSpinner from "@/components/Loading"
import {signOut} from 'next-auth/react'
type PersonInfo = {
    name  : string , 
    email : string , 
    image? : string ,
    description : string ,
    newPassword : string , 
    phone : number ,
    title : string , 
    freelance : boolean , 
    experience : number ,
    projects : number , 
    facebook ? : string ,
    youtube? : string , 
    linkedin? : string , 
    github? : string , 
    cv : string 
}

const page = () => {
    const [image,setImage] = useState('') 
    const [msg,setMsg] = useState<string>('') 
    const [loading,setLoading] = useState<boolean>(true)
    const handleAlert = (alertMsg:string)=>{
        setMsg(alertMsg)
        setTimeout(()=>{
            setMsg('')
        },3000)
    }
    const userForm = useForm<PersonInfo>({
        defaultValues : async ()=>{
            const resp = await callApiHandler('get','/user',{},null)
            setLoading(false)
            if(resp?.data?.info?.image) setImage(resp.data.info.image)
            return resp?.data.info
        }
    })
    const onSubmit = async (formFields:any)=>{
        setLoading(true)
        const formData = await handleFormData(formFields)
        const resp = await callApiHandler('patch','/user',{},formData)
        setLoading(false)
        if(resp?.status === 201){
            const {updatedInfo} = resp.data
            handleAlert('updated successfully')
            userForm.setValue('image','')
            setImage(updatedInfo.image)
            if(formFields.newPassword){
                await signOut({
                    callbackUrl : '/mannaa/login'
                })
            }
        }
    }
    
    if(loading) return <LoadingSpinner/>
    return (
        <form onSubmit={userForm.handleSubmit(onSubmit)} className="panel-personal-info">
            {msg && <CustomAlert msg={msg}/>}
            <ImageFile handlingForm={userForm}  size={200} url={image || ""}/>
            <div>
                <label htmlFor="name">name</label>
                <input  id='name' {...userForm.register('name')}/>
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input id='email' {...userForm.register('email')} />
            </div>
            <div>
                <label htmlFor="title">title</label>
                <input id='title' {...userForm.register('title')}/>
            </div>
            <div>
                <label htmlFor="description">description</label>
                <input  id='description' {...userForm.register('description')} />
            </div>
            <div>
                <label htmlFor="newPassword">new password</label>
                <input  id='newPassword' type='password' {...userForm.register('newPassword')} />
            </div>
            <div>
                <label htmlFor="phone">phone</label>
                <input  id='phone' type='number' {...userForm.register('phone')} />
            </div>
            <div>
                <span style={{paddingRight:'10px'}} >Freelance</span>
                <input type='checkbox' {...userForm.register('freelance')}  />
            </div>
            <div>
                <label htmlFor="experience">experience</label>
                <input  id='experience' type='number' {...userForm.register('experience')}  />
            </div>
            <div>
                <label htmlFor="projects">projects</label>
                <input  id="projects" type='number' {...userForm.register('projects')}  />
            </div>
            <div>
                <label htmlFor="facebook">facebook</label>
                <input id="facebook" {...userForm.register('facebook')} />
            </div>
            <div>
                <label htmlFor="youtube">youtube</label>
                <input  id='youtube' {...userForm.register('youtube')}  />
            </div>
            <div>
                <label htmlFor="linkedin">linkedin</label>
                <input id='linkedin' {...userForm.register('linkedin')} />
            </div>
            <div>
                <label htmlFor="github">github</label>
                <input  id='github' {...userForm.register('github')} />
            </div>
            <div>
                <label htmlFor="cv_link">CV link</label>
                <input id='cv_link' {...userForm.register('cv')} />
            </div>
            <button type='submit'>Update</button>
        </form>
    )
}

export default page






