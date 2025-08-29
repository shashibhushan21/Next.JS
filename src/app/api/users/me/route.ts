import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"
import { select } from "framer-motion/client";

export async function GET(request:NextRequest){
    await connect();
    try{
       const userID = await getDataFromToken(request);
      const user = await User.findOne({_id:userID}).select("-password");
       if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
     return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });
    }catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 }); // use 401 for auth errors
  }
}