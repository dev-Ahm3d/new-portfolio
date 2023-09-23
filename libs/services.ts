import bcrypt from 'bcrypt'
import User from "../models/User"
import { NextRequest, NextResponse } from 'next/server'
import uploader from './uploader'


export const getFunc = async (Model:any) => {
    const docs = await Model.find({},'-createdAt -updatedAt -__v').sort({'priority':1})
    return NextResponse.json({docs},{status:200})
}

export const addFun = async (req:any , Model:any) =>{
    const dataToAdded = await uploader(req)
    if(dataToAdded.err) throw new Error(dataToAdded.err)
    const newInstance = await Model.create(dataToAdded)
    return NextResponse.json({newInstance},{status:201})
}

export const updateFun = async (req: any , Model:any)=>{
    const dataToUpdated = await uploader(req)
    if(dataToUpdated.err) throw new Error(dataToUpdated.err)
    const id = req.nextUrl.searchParams.get('id') || ""
    const updatedInstance = await Model.findByIdAndUpdate(id , dataToUpdated ,{new:true})
    return NextResponse.json({updatedInstance})
}

export const deleteFun = async (req:NextRequest , Model:any)=> {
    const id = req.nextUrl.searchParams.get('id') || ''
    await Model.findByIdAndDelete(id)
    return new Response(null,{status:204})
}


// user
export const getUserInfo = async () => {
    const userData = await User.findOne({},'-password')
    return userData
}

export const updateUserInfo = async (data: any) =>{
    let user = await User.findOneAndUpdate({},data,{new:true})
    return user 
}

