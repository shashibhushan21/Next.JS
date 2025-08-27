import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {


    await connect()
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody)

        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        //check if user exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 })
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user   
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json({
            message: "User created successfully",
            success: true
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}