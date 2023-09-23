import connectMongo from "@/libs/mongodb"
import { addFun, deleteFun, getFunc, updateFun } from "@/libs/services"
import Skill from "@/models/Skill"
import { NextRequest } from "next/server"


(async function(){
    await connectMongo()
})()

export async function GET(){
    return await getFunc(Skill)
}
export async function POST(req:NextRequest){
    return await addFun(req,Skill)
}

export async function PATCH(req:NextRequest){
    return await updateFun(req,Skill)
}

export async function DELETE(req:NextRequest){
    return await deleteFun(req,Skill)
}








