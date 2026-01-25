import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password with salt rounds of 12 (more secure)
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  console.log('Generated password hash:', hashedPassword.substring(0, 20) + '...');

  const users = [
    {
      email: 'admin@bizicount.com',
      username: 'admin',
      fullName: 'System Administrator',
      role: 'ADMIN' as const,
      phone: '+256 700 000 001',
      status: 'ACTIVE' as const,
    },
    {
      email: 'manager@bizicount.com',
      username: 'manager',
      fullName: 'Store Manager',
      role: 'MANAGER' as const,
      phone: '+256 700 000 002',
      status: 'ACTIVE' as const,
    },
    {
      email: 'cashier@bizicount.com',
      username: 'cashier',
      fullName: 'Cashier User',
      role: 'CASHIER' as const,
      phone: '+256 700 000 003',
      status: 'ACTIVE' as const,
    },
    {
      email: 'supplier@bizicount.com',
      username: 'supplier',
      fullName: 'Supplier User',
      role: 'SUPPLIER' as const,
      phone: '+256 700 000 004',
      status: 'ACTIVE' as const,
    },
  ];

  console.log('\n📋 Creating/Updating users...\n');

  for (const userData of users) {
    try {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          passwordHash: hashedPassword, // Update password to ensure it matches
          fullName: userData.fullName,
          phone: userData.phone,
          status: userData.status,
        },
        create: {
          email: userData.email,
          username: userData.username,
          fullName: userData.fullName,
          passwordHash: hashedPassword,
          role: userData.role,
          phone: userData.phone,
          status: userData.status,
        },
      });
      console.log(`✅ ${user.role.padEnd(10)} | ${user.email.padEnd(30)} | ${user.fullName}`);
    } catch (error) {
      console.error(`❌ Failed to create user ${userData.email}:`, error);
    }
  }

  console.log('\n✨ Database seeded successfully!');
  console.log('\n📝 Test Credentials for BiziCount');
  console.log('═'.repeat(60));
  console.log('│ Role         │ Email                      │ Password      │');
  console.log('├'.repeat(60));
  console.log('│ ADMIN        │ admin@bizicount.com        │ password123   │');
  console.log('│ MANAGER      │ manager@bizicount.com      │ password123   │');
  console.log('│ CASHIER      │ cashier@bizicount.com      │ password123   │');
  console.log('│ SUPPLIER     │ supplier@bizicount.com     │ password123   │');
  console.log('═'.repeat(60));
  console.log('\n💡 Use these credentials to test role-based access');
  console.log('🔐 All passwords are: password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });