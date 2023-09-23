import mongoose,{Schema} from "mongoose";

const skillSchema = new Schema({
    title : String , 
    priority : Number , 
    image : String , 
    disabled : {
        type : Boolean , 
        default : false 
    }
},{
    timestamps : true 
})

const Skill = mongoose.models.Skill || mongoose.model("Skill",skillSchema)

export default Skill 

