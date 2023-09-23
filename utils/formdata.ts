const handleFormData = (data:any)=>{
    delete data?.images
    if(typeof data.image == "string" || data.image?.length == 0) delete data.image
    const formData = new FormData()
    for(const key in data){
        if(key == 'image') {
            for(let el of data['image']){
                formData.append('image',el)
            }
        }
        else if(data[key] === null) continue
        else formData.append(key,data[key])
    } 
    return formData
} 

export default handleFormData