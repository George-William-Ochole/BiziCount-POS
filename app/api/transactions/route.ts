import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const storeId = searchParams.get('storeId');

    const transactions = await prisma.transaction.findMany({
      where: storeId ? { storeId } : {},
      include: {
        items: {
          include: {
            product: true,
          },
        },
        store: true,
        user: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storeId, userId, customerId, totalAmount, payment, items, notes } = body;

    if (!storeId || !totalAmount || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate transaction number
    const txnNumber = `TXN-${Date.now()}`;

    // Create transaction with items
    const transaction = await prisma.transaction.create({
      data: {
        transactionNumber: txnNumber,
        storeId,
        userId,
        customerId,
        totalAmount,
        payment,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update inventory for each item
    for (const item of items) {
      await prisma.inventoryItem.updateMany({
        where: {
          productId: item.productId,
          storeId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Update customer loyalty points if applicable
    if (customerId && payment !== 'CASH') {
      const pointsEarned = Math.floor(totalAmount / 10); // 1 point per 10 units
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          loyaltyPoints: {
            increment: pointsEarned,
          },
          totalSpent: {
            increment: totalAmount,
          },
        },
      });
    }

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
