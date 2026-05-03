import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Address from "@/models/Address";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const addresses = await Address.find({ userId });

        return NextResponse.json({ success: true, addresses });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
