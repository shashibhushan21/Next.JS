import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { error } from "console";


export async function POST(request: NextRequest) {
    await connect()
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" })
        }

        console.log(user);
        user.isVerfied = true;
        user.verifyToken = undefined,
        user.verifyTokenExpiry = undefined,
        await user.save();

        return NextResponse.json({
            message: "Email verifird Successfully",
            success: true
        })
    } catch (error: any) {
        throw NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}