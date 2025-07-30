import { Users } from './../../../dbSchemas/userSchema';
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import {connectMongo} from "@/app/services/mongoService";


export async function GET() {
    await connectMongo();
    Users.find({}).then((users) => {
        console.log(users);})
    return new NextResponse("Hello from the user route!");
    }