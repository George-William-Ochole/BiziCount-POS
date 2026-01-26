import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const ret = await prisma.return.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    if (!ret) {
      return NextResponse.json(
        { error: 'Return not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ret);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch return' },
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
    const { status, notes } = body;

    const ret = await prisma.return.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes && { notes }),
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(ret);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Return not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update return' },
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
    await prisma.return.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Return deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Return not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete return' },
      { status: 500 }
    );
  }
}
