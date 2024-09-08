import Cart from "@/app/lib/models/Cart";
import { connectToDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;

        await connectToDB();

        const result = await Cart.findOne({ userId });

        if (!result) {
            return NextResponse.json({
                success: true,
                message: "No cart found for this user",
                cart: null
            }, { status: 200 });
        }

        return NextResponse.json({
            success: true,
            cart: result
        }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {

    try {
        await connectToDB();

        const { userId } = params;
        const { searchParams } = new URL(req.url);
        const itemId = searchParams.get('itemId');

        const cart = await Cart.findOne({userId});
        if (!cart) {
            return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
        }

        if (itemId === '-1') {
            console.log("inside if");
            cart.items.clear();
            await cart.save();
            return NextResponse.json({success: true, message: "Cart successfully cleared"}, {status: 200});
        } else if (cart.items.has(itemId)) {
            console.log("inside else if");
            cart.items.delete(itemId);
            await cart.save();  
            return NextResponse.json({success: true, message: "Item successfully deleted"}, {status: 200});
        } else {
            console.log("inside else");
            return NextResponse.json({success: false, message: "Item did not exist in the cart"}, {status: 400});
        }

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}