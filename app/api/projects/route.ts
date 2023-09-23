import connectMongo from "@/libs/mongodb"
import { addFun, deleteFun, getFunc, updateFun } from "@/libs/services"
import Project from "@/models/Project"
import { NextRequest } from "next/server"


(async function(){
    await connectMongo()
})()

export async function GET(){
    return await getFunc(Project)
}
export async function POST(req:NextRequest){
    return await addFun(req,Project)
}

export async function PATCH(req:NextRequest){
    return await updateFun(req,Project)
}

export async function DELETE(req:NextRequest){
    return await deleteFun(req,Project)
}








