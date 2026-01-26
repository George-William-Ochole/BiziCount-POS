import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const item = await prisma.inventoryItem.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        store: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inventory item' },
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
    const { stock, reorderLevel, supplier, expiryDate, batchNumber, lastRestocked, soldThisMonth } = body;

    const item = await prisma.inventoryItem.update({
      where: { id },
      data: {
        ...(stock !== undefined && { stock }),
        ...(reorderLevel !== undefined && { reorderLevel }),
        ...(supplier && { supplier }),
        ...(expiryDate && { expiryDate }),
        ...(batchNumber && { batchNumber }),
        ...(lastRestocked && { lastRestocked }),
        ...(soldThisMonth !== undefined && { soldThisMonth }),
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
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
    await prisma.inventoryItem.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Inventory item deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    );
  }
}
