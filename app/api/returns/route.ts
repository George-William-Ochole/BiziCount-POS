import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const returns = await prisma.return.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(returns);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch returns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, itemCount, amount, reason, notes } = body;

    if (!customerId || !itemCount || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ret = await prisma.return.create({
      data: {
        customerId,
        itemCount,
        amount,
        reason,
        notes,
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(ret, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create return' },
      { status: 500 }
    );
  }
}
