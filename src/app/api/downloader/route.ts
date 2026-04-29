import { NextRequest, NextResponse } from 'next/server';
import { getMetadata } from '@/lib/ytdlp';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const metadata: any = await getMetadata(url);
    
    // Extract useful info
    const response = {
      title: metadata.title,
      thumbnail: metadata.thumbnail,
      duration: metadata.duration,
      uploader: metadata.uploader,
      formats: metadata.formats
        .filter((f: any) => f.vcodec !== 'none' || f.acodec !== 'none')
        .map((f: any) => ({
          format_id: f.format_id,
          ext: f.ext,
          resolution: f.resolution,
          filesize: f.filesize || f.filesize_approx,
          url: f.url,
          quality: f.format_note
        }))
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Downloader API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
