import mongoose,{Schema} from "mongoose";

const achievementSchema = new Schema({
    position : String ,
    company : String ,
    period : String , 
    description : String ,
    disabled : {
        type : Boolean , 
        default : false 
    }
},{
    timestamps : true 
})

const Achievement = mongoose.models.Achievement || mongoose.model("Achievement",achievementSchema)

export default Achievement 

