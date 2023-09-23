import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import connectMongo from "@/libs/mongodb";
import { getUserInfo , updateUserInfo } from "@/libs/services";
import uploader from "@/libs/uploader";
(async function(){
    await connectMongo()
})()

/*
export async function POST(req:Request){
    const data = await req.json()
    const dd = {...data}
    dd.password = await bcrypt.hash(data.password,10)
    const newUser = await User.create({...dd})
    return NextResponse.json(newUser)
    //return handleErrors(await getUserInfo())
}
*/

export async function GET(){
    const info = await getUserInfo()
    return NextResponse.json({info},{status:200})
}

export async function PATCH(req:NextRequest){
    const data = await uploader(req)
    if(data.err) throw new Error('invalid file type')
    if(data.newPassword) {
        const newPass = await bcrypt.hash(data.newPassword,10)
        data.password = newPass
        delete data.newPassword
    }
    const updatedInfo = await updateUserInfo(data)
    return NextResponse.json({updatedInfo},{status:201})
}