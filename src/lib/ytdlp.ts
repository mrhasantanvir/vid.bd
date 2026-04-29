import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const YTDLP_PATH = path.join(process.cwd(), 'bin', 'yt-dlp.exe');

export async function getMetadata(url: string) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(YTDLP_PATH)) {
      return reject(new Error('yt-dlp binary not found'));
    }

    const command = `"${YTDLP_PATH}" --dump-json --no-warnings --no-playlist --format "best" --extractor-args "youtube:player_client=android,tvhtml5,web" --geo-bypass --referer "https://www.google.com/" --force-ipv4 --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36" "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || error.message));
      }
      try {
        const metadata = JSON.parse(stdout);
        resolve(metadata);
      } catch (e) {
        reject(new Error('Failed to parse metadata. The link might be restricted.'));
      }
    });
  });
}

export async function getDownloadUrl(url: string) {
  return new Promise((resolve, reject) => {
    // -g gets the direct URL
    const command = `"${YTDLP_PATH}" -g --no-warnings --no-playlist "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || error.message));
      }
      resolve(stdout.trim());
    });
  });
}
