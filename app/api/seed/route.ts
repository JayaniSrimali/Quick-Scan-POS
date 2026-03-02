import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';
import { products } from '@/lib/data';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing products to avoid duplicates during seeding
        await Product.deleteMany({});

        // Insert initial data
        const seededProducts = await Product.insertMany(products);

        return NextResponse.json({
            message: 'Database seeded successfully',
            count: seededProducts.length
        });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
