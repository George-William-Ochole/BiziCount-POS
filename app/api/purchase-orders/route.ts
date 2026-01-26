import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const supplierId = searchParams.get('supplierId');
    const status = searchParams.get('status');

    const orders = await prisma.purchaseOrder.findMany({
      where: {
        ...(supplierId && { supplierId }),
        ...(status && { status: status as any }),
      },
      include: {
        supplier: true,
        createdBy: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch purchase orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplierId, createdById, items, expectedDelivery, notes } = body;

    if (!supplierId || !createdById || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const poNumber = `PO-${Date.now()}`;
    const totalCost = items.reduce((sum: number, item: any) => sum + item.totalCost, 0);

    const order = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        supplierId,
        createdById,
        totalCost,
        expectedDelivery,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitCost: item.unitCost,
            totalCost: item.totalCost,
          })),
        },
      },
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Purchase order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase order' },
      { status: 500 }
    );
  }
}
