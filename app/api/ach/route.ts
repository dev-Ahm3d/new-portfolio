import connectMongo from "@/libs/mongodb"
import { addFun, deleteFun, getFunc, updateFun } from "@/libs/services"
import Achievement from "@/models/Ach"
import { NextRequest } from "next/server"


(async function(){
    await connectMongo()
})()

export async function GET(req:NextRequest){
    return await getFunc(Achievement)
}

export async function POST(req:NextRequest){
    return await addFun(req,Achievement)
}

export async function PATCH(req:NextRequest){
    return await updateFun(req,Achievement)
}

export async function DELETE(req:NextRequest){
    return await deleteFun(req,Achievement)
}