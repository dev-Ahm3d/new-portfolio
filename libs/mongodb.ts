import {connect} from 'mongoose'
const  connectMongo = async ()=>{
    try {
        await connect(process.env.DB_URL || "")
        //console.log('conneected successfully !!')
    } catch (error) {
        console.log(error)
    }
}

export default connectMongo