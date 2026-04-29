import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'src', 'data', 'settings.json');

export async function GET() {
  try {
    const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
    const settings = JSON.parse(data);
    
    // Simulate real-time fluctuation for current visitors
    const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const currentVisitors = Math.max(12, (settings.stats?.currentVisitors || 42) + fluctuation);
    
    return NextResponse.json({
      totalUsage: settings.stats?.totalUsage || 0,
      currentVisitors: currentVisitors
    });
  } catch (error) {
    return NextResponse.json({ totalUsage: 0, currentVisitors: 0 });
  }
}

export async function POST() {
  try {
    const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
    const settings = JSON.parse(data);
    
    if (!settings.stats) settings.stats = { totalUsage: 0, currentVisitors: 42 };
    settings.stats.totalUsage += 1;
    
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}
