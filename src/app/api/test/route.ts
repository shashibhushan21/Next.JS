import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("Test API called");
        const body = await request.json();
        console.log("Request body:", body);
        
        return NextResponse.json({
            message: "Test API working",
            receivedData: body
        });
    } catch (error: any) {
        console.error("Test API error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}