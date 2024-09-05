import { connectToDB } from "@/app/lib/db";
import Cart from "@/app/lib/models/Cart";
import { NextResponse } from "next/server"; 

async function addRecipeToCart(userId: string, itemId: any, qty: any) {
    try {
        const result = await Cart.findOneAndUpdate(
            { userId },
            { $inc: { [`items.${itemId}`]: qty }, },
            { upsert: true, new: true }
        );
        
        if (!result) {
            throw new Error("Failed to add recipe to cart");
        }

        return {
            success: true,
            message: "Recipe added to cart",
        };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.message };
    }
}

export async function POST(req: Request) {
    // Handle POST request
    await connectToDB();
    const body = await req.json();
    const { userId, recipe, qty } = body;
    
    if (!userId && !recipe && !qty) 
        return NextResponse.json({success: false, message: 'Missing userId or recipe or quantity' }, {status: 400});

    try {
        const result = await addRecipeToCart(userId, recipe.id, qty);
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false, message: 'Internal Server Error'}, {status: 500});
    }
}
