'use client';

import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdInterim from '@/components/AdInterim';
import { FileVideo, Download, Music, Plus, Loader2 } from 'lucide-react';

export default function VideoTools() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startConversion = () => {
    if (!file) return;
    setShowAd(true);
    setIsProcessing(true);
  };

  const executeConversion = async () => {
    try {
      setStatus('Loading FFmpeg...');
      await loadFFmpeg();
      
      const ffmpeg = ffmpegRef.current!;
      const inputName = 'input_video';
      const outputName = 'output_audio.mp3';

      setStatus('Reading file...');
      await ffmpeg.writeFile(inputName, await fetchFile(file!));

      setStatus('Converting...');
      await ffmpeg.exec(['-i', inputName, '-vn', '-ab', '128k', '-ar', '44100', '-f', 'mp3', outputName]);

      setStatus('Saving result...');
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data as any], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file!.name.split('.')[0]}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsProcessing(false);
      setShowAd(false);
      setStatus('');
      setProgress(0);
    } catch (error) {
      console.error('Conversion Error:', error);
      alert('Failed to convert video. Ensure the file is a valid video format.');
      setIsProcessing(false);
      setShowAd(false);
      setStatus('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <AdInterim isVisible={showAd} onComplete={executeConversion} />

      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            background: 'rgba(236, 72, 153, 0.1)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px' 
          }}>
            <Music size={32} color="var(--secondary)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Video to Audio</h1>
          <p style={{ opacity: 0.7 }}>Extract high-quality MP3 from any video file. 100% Client-side.</p>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <div style={{ 
            border: '2px dashed var(--card-border)', 
            borderRadius: '16px', 
            padding: '40px', 
            textAlign: 'center',
            marginBottom: '32px',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('videoInput')?.click()}
          >
            <input 
              type="file" 
              id="videoInput" 
              accept="video/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <Plus size={40} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <p>{file ? file.name : 'Click to select a video file'}</p>
          </div>

          {isProcessing && (
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <Loader2 className="animate-spin" size={20} />
                <span>{status} {progress > 0 ? `${progress}%` : ''}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }}></div>
              </div>
            </div>
          )}

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={!file || isProcessing}
            onClick={startConversion}
          >
            {isProcessing ? 'Processing...' : <><Download size={20} /> Extract MP3</>}
          </button>
          
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>
            Heavy processing is handled by your browser using WebAssembly. No data is sent to our server.
          </p>
        </div>
      </main>

      <Footer />
      
      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
