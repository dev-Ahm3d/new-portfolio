import connectMongo from "@/libs/mongodb"
import { addFun} from "@/libs/services"
import Achievement from "@/models/Ach"
import Skill from "@/models/Skill"
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"


(async function(){
    await connectMongo()
})()

export async function POST(req:NextRequest){
    return await addFun(req,Achievement)
}

export async function GET(req:NextRequest){
    const info = await User.findOne({},'-password')
    const skills = await Skill.find({})
    const achievements = await Achievement.find({})
    return NextResponse.json({info,achievements,skills},{status:200})
}
