import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
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
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  if (action === 'void') {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });

      if (!transaction) {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        );
      }

      if (transaction.status === 'VOIDED') {
        return NextResponse.json(
          { error: 'Transaction is already voided' },
          { status: 400 }
        );
      }

      // Restore inventory
      for (const item of transaction.items) {
        await prisma.inventoryItem.updateMany({
          where: {
            productId: item.productId,
            storeId: transaction.storeId,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // Update transaction status
      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          status: 'VOIDED',
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return NextResponse.json(updatedTransaction);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to void transaction' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Invalid action' },
    { status: 400 }
  );
}
