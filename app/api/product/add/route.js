import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import connectDB from "@/config/db";

export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId || !(await authSeller(userId))) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        
        // Handling multiple images
        const files = [];
        for (let i = 0; i < 4; i++) {
            const file = formData.get(`image${i}`);
            if (file) {
                files.push(file);
            }
        }

        if (!name || !description || !category || !price || files.length === 0) {
            return NextResponse.json({ success: false, message: "Missing Details" }, { status: 400 });
        }

        await connectDB();

        // In a real application, you would upload files to Cloudinary here.
        // For now, we will use a placeholder since Cloudinary keys are not provided.
        // We will store the file names as placeholders.
        const imageUrls = files.map(file => "https://i.ibb.co.com/kVgwB5kY/apple-earphone-image.png"); // Placeholder

        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image: imageUrls,
            date: Date.now()
        });

        return NextResponse.json({ success: true, message: "Product Added", product: newProduct });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
