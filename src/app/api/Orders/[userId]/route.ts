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
        const matchEntry: any = await Order.findOne({userId: userId});
        if (!matchEntry.orders) {
            return NextResponse.json({success: true, orders: null, total_price: 0}, {status: 200});
        }

        const sortedOrders = matchEntry.orders.sort((a: any, b: any) => b.time - a.time);
        return NextResponse.json({success: true, orders: sortedOrders}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}
