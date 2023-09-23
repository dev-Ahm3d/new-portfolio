//export const apiBaseUrl = "http://localhost:3000/api"
export const apiBaseUrl = "http://ahmed-mannaa.vercel.app/api"

export const DB_URL = "mongodb+srv://Ahmed:Professional98@cluster0.ucwoy.mongodb.net/new-portfolio?retryWrites=true&w=majority"


import axios from "axios"
axios.defaults.baseURL = apiBaseUrl

/*
axios.interceptors.request.use(config =>{
    //config.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
    config.headers['Content-Security-Policy'] = "default-src 'self'";
    config.headers['X-Content-Type-Options'] = 'nosniff';
    config.headers['X-Frame-Options'] = 'SAMEORIGIN';
    config.headers['X-XSS-Protection'] = '1; mode=block';
    config.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    return config;
})
*/
const callApiHandler = async (method : string , url:string, headers:any, postData:any) => {
    try {
        let resp 
        if(method === "patch" || method === "put"  || method === "post"){
            resp = await axios[method](url,postData,{headers : headers || {}})
        }else if(method  === 'get' || method === 'delete') {
            resp = await axios[method](url,{headers : headers || {}})
        }
        return resp 
    } catch (error) {
        console.log(error)
        //window.location.href = '/error'
    }
}       


export default callApiHandler