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
        let total_price = 0;
        for (let i = 0; i < matchEntry.orders.length; i++) {
            total_price += Number(matchEntry.orders[i].price)*Number(matchEntry.orders[i].quantity);
        }

        console.log(total_price)
        return NextResponse.json({success: true, orders: matchEntry?.orders, total_price: total_price}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}
