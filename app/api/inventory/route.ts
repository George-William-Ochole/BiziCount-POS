import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const storeId = searchParams.get('storeId');

    const inventory = await prisma.inventoryItem.findMany({
      where: storeId ? { storeId } : {},
      include: {
        product: {
          include: {
            category: true,
          },
        },
        store: true,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, storeId, stock, reorderLevel, supplier, expiryDate, batchNumber } = body;

    if (!productId || !storeId) {
      return NextResponse.json(
        { error: 'Product and store IDs are required' },
        { status: 400 }
      );
    }

    const inventory = await prisma.inventoryItem.create({
      data: {
        productId,
        storeId,
        stock: stock || 0,
        reorderLevel: reorderLevel || 0,
        supplier,
        expiryDate,
        batchNumber,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(inventory, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Product already exists in this store' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}
