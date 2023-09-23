import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema({
    name : String , 
    email : String , 
    subject : String ,
    message : String ,
    date : {
        type : Date , 
        default : new Date(Date.now())
    } ,
    seen : {
        type : Boolean ,
        default : false 
    }
},{
    timestamps : true 
})

const Message = mongoose.models.Message || mongoose.model("Message",messageSchema)

export default Message 

