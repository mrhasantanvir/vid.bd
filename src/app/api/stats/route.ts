import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const stats = await prisma.stats.findUnique({
      where: { id: 1 }
    });
    
    // Simulate real-time visitors (random between 5-50)
    const currentVisitors = Math.floor(Math.random() * 45) + 5;
    
    return NextResponse.json({ 
      totalUsage: stats?.totalUsage || 1250, 
      currentVisitors 
    });
  } catch (error) {
    return NextResponse.json({ totalUsage: 1250, currentVisitors: 8 });
  }
}

export async function POST() {
  try {
    await prisma.stats.upsert({
      where: { id: 1 },
      update: { totalUsage: { increment: 1 } },
      create: { id: 1, totalUsage: 1251 }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}
