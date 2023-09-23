'use client'
import './ImageFile.css'
import {useState,ChangeEvent} from 'react'
import {BsFillCameraFill} from 'react-icons/bs'

type ImageFileProps = {
    url : string , 
    size : number ,
    handlingForm : any
}
const ImageFile = ({url,size,handlingForm}:ImageFileProps) => {
    const [newImgName,setNewImgName] = useState<string | undefined>(undefined)
    const [img,setImg] = useState<File | null>(null)
    const handleChangeInput =  (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImg(file)
        setNewImgName(file?.name)
    }
    return (
        <div className="pi-image-cont">
            <div className='pi-image' style={{width:size+'px',height:size+'px'}}>
                <label className='img-file-cont'>
                    <input {...handlingForm.register('image')} multiple={false} onChange={handleChangeInput} type="file" />
                    <div className='img-file' style={{backgroundImage:`url('${url}')`}}></div>
                    <div className='img-overlay'>
                        <BsFillCameraFill size='2em'/>
                    </div>
                </label>   
            </div>
            {
                handlingForm.getValues('image') && newImgName && <span>{newImgName}</span>     
            }     
        </div>
    )
}

export default ImageFile