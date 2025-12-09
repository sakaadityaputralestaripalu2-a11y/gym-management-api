// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Hapus data lama (urut child -> parent)
  await prisma.classBooking.deleteMany();
  await prisma.gymClass.deleteMany();
  await prisma.member.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.user.deleteMany();

  const passwordAdmin = await bcrypt.hash('Admin123!', 10);
  const passwordUser = await bcrypt.hash('User123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@gym.com',
      password: passwordAdmin,
      name: 'Admin Gym',
      role: 'ADMIN'
    }
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'member1@gym.com',
      password: passwordUser,
      name: 'Member One',
      role: 'USER'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'member2@gym.com',
      password: passwordUser,
      name: 'Member Two',
      role: 'USER'
    }
  });

  const basicPlan = await prisma.membershipPlan.create({
    data: {
      name: 'Basic Monthly',
      price: 300000,
      durationInDays: 30,
      description: 'Access to gym equipment only'
    }
  });

  const premiumPlan = await prisma.membershipPlan.create({
    data: {
      name: 'Premium Monthly',
      price: 500000,
      durationInDays: 30,
      description: 'Gym equipment + group classes'
    }
  });

  const member1 = await prisma.member.create({
    data: {
      userId: user1.id,
      fullName: 'Member One',
      phoneNumber: '081234567890',
      membershipPlanId: basicPlan.id
    }
  });

  const member2 = await prisma.member.create({
    data: {
      userId: user2.id,
      fullName: 'Member Two',
      phoneNumber: '089876543210',
      membershipPlanId: premiumPlan.id
    }
  });

  const classYoga = await prisma.gymClass.create({
    data: {
      name: 'Morning Yoga',
      description: 'Relaxing yoga for all levels',
      scheduleTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      maxParticipants: 15
    }
  });

  const classHIIT = await prisma.gymClass.create({
    data: {
      name: 'Evening HIIT',
      description: 'High intensity interval training',
      scheduleTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      maxParticipants: 20
    }
  });

  await prisma.classBooking.createMany({
    data: [
      {
        memberId: member1.id,
        gymClassId: classYoga.id,
        status: 'CONFIRMED'
      },
      {
        memberId: member2.id,
        gymClassId: classHIIT.id,
        status: 'CONFIRMED'
      }
    ]
  });

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
