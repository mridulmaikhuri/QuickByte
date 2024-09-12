import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        const result = await response.json();
        const data = result?.recipes;

        return NextResponse.json({success: true, data}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false, message: 'Internal Server Error'}, {status: 500});
    }
}