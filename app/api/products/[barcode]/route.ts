import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';

export async function GET(
    request: NextRequest,
    { params }: { params: { barcode: string } }
) {
    try {
        await dbConnect();
        const { barcode } = params;

        const product = await Product.findOne({ barcode });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
