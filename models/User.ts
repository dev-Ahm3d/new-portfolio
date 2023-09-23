import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name : String ,
    email : String , 
    password : String , 
    dateOfBirth : String ,   
    title : String , 
    description : String , 
    phone : String , 
    experience : Number , 
    projects : Number , 
    facebook : String , 
    github : String , 
    linkedin : String , 
    youtube : String , 
    cv : String  ,
    image : String 
},{
    timestamps : true 
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User 

