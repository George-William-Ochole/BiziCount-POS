import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        inventory: true,
      },
    });

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch store' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { name, location, managerId, phone, email, status, revenue, employees } = body;

    const store = await prisma.store.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(location && { location }),
        ...(managerId && { managerId }),
        ...(phone && { phone }),
        ...(email && { email }),
        ...(status && { status }),
        ...(revenue !== undefined && { revenue }),
        ...(employees !== undefined && { employees }),
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.store.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Store deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete store with related data' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete store' },
      { status: 500 }
    );
  }
}
