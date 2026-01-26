import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const stores = await prisma.store.findMany({
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stores' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, managerId, phone, email } = body;

    if (!name || !location) {
      return NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      );
    }

    const store = await prisma.store.create({
      data: {
        name,
        location,
        managerId,
        phone,
        email,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    );
  }
}
