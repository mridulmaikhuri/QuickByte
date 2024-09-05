import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import Order from "@/app/lib/models/Order";

export async function POST(req : Request) {
    try {
        await connectToDB();
        const body = await req.json();
        const { userId, order } = body;

        if (!userId || !order) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing user id or order"
                }
            )
        }

        await Order.findOneAndUpdate({userId: userId}, {$push: { orders: order}}, { new: true, upsert: true });

        return NextResponse.json(
            {
                success: true
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        ) 
    }
    
} 