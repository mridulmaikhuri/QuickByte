import { NextResponse } from "next/server";
import Order from "@/app/lib/models/Order";
import { connectToDB } from "@/app/lib/db";

export async function GET(req: Request, { params } : { params: {userId: string}}) {
    try {
        await connectToDB();
        const { userId } = params;
        if (!userId) {
            return NextResponse.json({success: false, message: "Missing user id"}, {status: 400});
        }
        const matchEntry: any = await Order.findOne({userId: userId}) ;
        return NextResponse.json({success: true, orders: matchEntry?.orders}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}
