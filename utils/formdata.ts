const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const handleFormData = async (data:any)=>{
    delete data?.images
    if(typeof data.image == "string" || data.image?.length == 0) delete data.image
    const formData = new FormData()
    for(const key in data){
        if(key == 'image') {
            for(let el of data['image']){
                const res = await readFileAsDataURL(el)
                formData.append('image',res)
            }
        }
        else if(data[key] === null) continue
        else formData.append(key,data[key])
    } 
    return formData
} 

export default handleFormData