import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  // Initial Ad
  await prisma.ad.upsert({
    where: { id: 'initial-ad' },
    update: {},
    create: {
      id: 'initial-ad',
      title: 'vid.bd - Premium Media Hub',
      description: 'আপনার ভিডিও ডাউনলোডার এবং ফাইল ইউটিলিটি হাব। দ্রুত এবং নিরাপদ।',
      link: 'https://vid.bd',
      buttonText: 'এখনই ব্যবহার করুন',
      active: true,
    },
  })

  // Initial Ecosystem Links
  const links = [
    { name: 'TKS.bd', url: 'https://tks.bd' },
    { name: 'BusinessConnect', url: 'https://businessconnect.bd' },
    { name: 'RajshahiRam', url: 'https://rajshahiram.com' },
    { name: 'Pansoft', url: 'https://pansoft.com' }
  ]

  for (const link of links) {
    await prisma.ecosystemLink.create({
      data: link
    })
  }

  // Initial Stats
  await prisma.stats.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      totalUsage: 1250
    }
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
