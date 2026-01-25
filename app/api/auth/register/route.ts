import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, role } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase().trim();

    // Check if user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Generate username from email (before @)
    const baseUsername = emailLower.split('@')[0];
    
    // Check if username exists, if so, append a random number
    let username = baseUsername;
    const existingUsername = await prisma.user.findUnique({
      where: { username: baseUsername },
    });
    
    if (existingUsername) {
      username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
    }

    // Hash password with same strength as seed (12 rounds)
    const passwordHash = await bcrypt.hash(password, 12);

    // Validate role (if provided)
    const validRoles = ['ADMIN', 'MANAGER', 'CASHIER', 'SUPPLIER'];
    const userRole = role && validRoles.includes(role.toUpperCase()) 
      ? role.toUpperCase() 
      : 'CASHIER';

    // Create new user
    const user = await prisma.user.create({
      data: {
        fullName: name.trim(),
        email: emailLower,
        username,
        passwordHash,
        phone: phone?.trim() || null,
        role: userRole,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}