import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const ads = await prisma.ad.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const ecosystems = await prisma.ecosystemLink.findMany();
    
    return NextResponse.json({ ads, ecosystems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // If it's updating ads
    if (body.ads) {
      // For simplicity, we'll sync the ads. In a real app, you might want more granular updates.
      // This is a basic implementation to match the previous JSON logic
      for (const ad of body.ads) {
        await prisma.ad.upsert({
          where: { id: ad.id },
          update: {
            title: ad.title,
            description: ad.description,
            link: ad.link,
            buttonText: ad.buttonText,
            imageUrl: ad.imageUrl,
            active: ad.active
          },
          create: {
            id: ad.id,
            title: ad.title,
            description: ad.description,
            link: ad.link,
            buttonText: ad.buttonText,
            imageUrl: ad.imageUrl,
            active: ad.active
          }
        });
      }
    }

    // If it's updating ecosystems
    if (body.ecosystems) {
      for (const site of body.ecosystems) {
        await prisma.ecosystemLink.upsert({
          where: { id: site.id || 'new' }, // Assuming simple sync
          update: { name: site.name, url: site.url },
          create: { name: site.name, url: site.url }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
