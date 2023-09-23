import mongoose,{Schema} from "mongoose";

const projectSchema = new Schema({
    title : String , 
    description : String ,
    techs : [String] ,
    liveVersion : String , 
    github : String , 
    youtube : String ,
    images : [String] ,
    disabled : {
        type : Boolean , 
        default : false 
    }
},{
    timestamps : true 
})

const Project = mongoose.models.Project || mongoose.model("Project",projectSchema)

export default Project 

