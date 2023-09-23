'use client'
import React, { useEffect, useState } from 'react'
import './PanelForm.css'
import ImageFile from '@/components/imageFile/ImageFile'
import axios from 'axios'
import {useForm} from 'react-hook-form'

import CustomAlert from '../customAlert/CustomAlert'
import handleFormData from '@/utils/formdata'
import callApiHandler from '@/utils/callApi'
import LoadingSpinner from '../Loading'

type InputField = {
    name : string , 
    type? : string , 
    options : string[]
}
type Input = {
    name : string
    placeholder? :string ,
    type? : string ,
    value? : string ,
    options? : string []
}
type PanelFormProps = {
    category : string ,
    inputFields : InputField[] ,
    header : string , 
    subHeader : string , 
    inputs : Input[] ,
    apiUrl : string ,
}
const PanelForm = ({category,header,subHeader,inputs,inputFields,apiUrl}:PanelFormProps) => {
    const [loading,setLoading] = useState<boolean>(false)
    const [action,setAction] = useState('add')
    const [data,setData] = useState<any[]>([])
    const [selectedEl,setSelectedEl] = useState<any>(null)

    // handle alert msg
    const [msg,setMsg] = useState<string>('') 
    const handleAlert = (alertMsg:string)=>{
        setMsg(alertMsg)
        setTimeout(()=>{
            setMsg('')
        },2000)
    }
    
    // when select action
    useEffect(()=>{
        if( data?.length == 0  && (action === 'update' || action === 'delete')){
            setLoading(true)
            axios.get(apiUrl)
            .then(resp =>{
                setLoading(false)
                setData(resp.data?.docs)
            })
            .catch(() => window.location.href = '/500')
        }
    },[action])

    // when select item to edit
    useEffect(()=>{
        if(selectedEl?._id && action === 'update'){
            for (const key in selectedEl){
                editForm.setValue(key,selectedEl[key])
            }
        }        
    },[selectedEl])
    
    // add form
    const addForm = useForm()
    const addFormSubmit = async (formFields:any)=>{
        
        setLoading(true)
        const formData = handleFormData(formFields)
        const resp = await callApiHandler('post',apiUrl,{},formData)
        setLoading(false)
        if(resp?.status === 201 ){
            handleAlert('created successfully')
            window.location.reload()
        }    
        
    }

    // edit form
    const editForm = useForm()
    const editFormSubmit = async (formFields:any)=>{
        setLoading(true)
        const formData = handleFormData(formFields)
        const resp = await callApiHandler('patch',`${apiUrl}?id=${selectedEl?._id}`,{},formData)
        setLoading(false)
        if(resp?.status === 200){
            const {updatedInstance} = resp.data
            const dataCopy = [...data]
            const itemIndex = dataCopy.findIndex(el => el._id == updatedInstance._id)
            dataCopy[itemIndex] = updatedInstance 
            setData(dataCopy)
            handleAlert('updated successfully')
            setSelectedEl({...updatedInstance})
            editForm.setValue('image','')
            console
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
        } 
    }
    
    return(
        <div className='panel-skills'>
            {loading && <LoadingSpinner/>}
            {msg && <CustomAlert msg={msg}/>}
            <h2>{header}</h2>
            <select value={action} onChange={e =>{
                setAction(e.target.value) 
                setSelectedEl(null)
            }}>
                <option value='add'>add</option>
                <option value='update'>update</option>
                <option value='delete'>delete</option>
            </select>
            {   // add new item 
                action === 'add' && <form className='new-skill' onSubmit={addForm.handleSubmit(addFormSubmit)}>
                    {
                        inputs.map(((el,i)=>{
                            return(
                                <React.Fragment key={i}>
                                    {el.type === 'checkbox' && <label>{el.name}</label>}
                                    {
                                        el.type === 'select' ? 
                                        <select style={{minHeight:'100px'}} multiple {...addForm.register(el.name)} >
                                            {
                                                el?.options?.map((ele:any)=>{
                                                    return(
                                                        <option key={ele?._id} value={ele?.title}>{ele?.title}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        el.type === 'file' ?
                                            <input multiple {...addForm.register(el.name)} placeholder={el.placeholder} type={el.type}/>
                                        :
                                            <input  {...addForm.register(el.name)} placeholder={el.placeholder} type={el.type}/>                                        
                                    }
                                </React.Fragment>
                            )
                        }))
                    }
                    <button type='submit'>Add</button>
                </form>
            }
            {   // update item 
                action === 'update' && <div className='update-skill'>
                    <select onChange={e =>{
                        const item = data.find((el: { _id: string }) => el?._id == e.target.value)
                        setSelectedEl(item)
                    }}>
                        <option value=''>select a {subHeader}</option>
                        {
                            data && data.map((el:any,i:number)=>{
                                return(
                                    <option key={i} value={el._id}>{el.title || el.company}</option>
                                )
                            })
                        }
                    </select>
                    {
                        selectedEl?._id && <form onSubmit={editForm.handleSubmit(editFormSubmit)}>
                            <h3>{subHeader} info</h3>
                            {category === 'skills' && <ImageFile size={100} url={selectedEl?.image} handlingForm={editForm} />}
                        {
                            inputFields.map((el,i)=>{
                                return(
                                    <div className='inp-label' key={i}>
                                        <label>{el.name}</label>
                                        {
                                            el.type === 'select' ? 
                                            <select  defaultValue={el?.options} style={{minHeight:'100px'}} multiple {...editForm.register(el.name)} >
                                                {
                                                    el?.options?.map((ele:any)=>{
                                                        return(
                                                            <option key={ele?._id} value={ele?.title}>{ele?.title}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            :
                                            el.type === 'file' ? 
                                            <input multiple  {...editForm.register(el.name)}  type={el.type || 'text'} />

                                            :
                                            <input  {...editForm.register(el.name)}  type={el.type || 'text'} />
                                        }

                                    </div>
                                )
                            })
                        }
                        <button>update</button>
                    </form>
                    }
                </div>
            }
            {   // delete item 
                action === 'delete' && <div className='delete-skill'>
                    <select onChange={e =>{
                        setSelectedEl({_id:e.target.value})
                    }}>
                        <option value=''>select a {subHeader}</option>
                        {
                            data.map((el:any,i:number)=>{
                                return(
                                    <option key={i} value={el._id}>{el?.title || el?.company }</option>
                                )
                            })
                        }
                    </select>
                    {selectedEl?._id && <button onClick={async ()=>{
                        const resp = await callApiHandler('delete',apiUrl+`?id=${selectedEl._id}`,{},null)
                        if(resp?.status === 204){
                            handleAlert('Deleted Successfully')
                            setSelectedEl(null)
                            setData([...data.filter(el => el._id != selectedEl._id)])
                        }
                    }}>Delete</button>}
                </div> 
            }
        </div>
    )
}

export default PanelForm 




