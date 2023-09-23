import connectMongo from "@/libs/mongodb"
import Message from "@/models/Message"
import { NextRequest, NextResponse } from "next/server"

(async function(){
    await connectMongo()
})()

export async function GET(req:NextRequest){
    const messages = await Message.find({}) 
    return NextResponse.json({messages},{status:200})
}

export async function POST(req:NextRequest){
    const msgData = await req.json()
    await Message.create(msgData)
    return NextResponse.json({sent:true},{status:201})
}