'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdInterim from '@/components/AdInterim';
import { Download, Link as LinkIcon, FileVideo, FileType, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'input' | 'ad' | 'result'>('input');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalUsage: 0, currentVisitors: 0 });

  useEffect(() => {
    // Initial stats fetch
    fetch('/api/stats').then(res => res.json()).then(setStats);
    
    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      fetch('/api/stats').then(res => res.json()).then(setStats);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setError('');
    setIsProcessing(true);
    setStep('ad');

    try {
      const response = await fetch('/api/downloader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      setStep('input');
      setIsProcessing(false);
    }
  };

  const onAdComplete = () => {
    setStep('result');
    setIsProcessing(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <AdInterim isVisible={step === 'ad'} onComplete={onAdComplete} />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 20px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '40px 0' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '16px' }} className="text-gradient">
            আপনার প্রয়োজনীয় সব টুল, <br /> এখন এক জায়গায়।
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto 40px' }}>
            উচ্চমানের ভিডিও ডাউনলোড এবং ফাইল কনভার্ট করুন কোনো সার্ভার লোড ছাড়াই।
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '40px' }}>
            <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{stats.currentVisitors}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>এখন অনলাইনে</div>
            </div>
            <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>{stats.totalUsage.toLocaleString()}+</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>মোট ডাউনলোড</div>
            </div>
          </div>

          <div id="downloader" className="premium-card animate-fade-in" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '32px',
            background: 'var(--card-bg)',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {step === 'input' && (
              <>
                <form onSubmit={handleDownload} className="mobile-stack" style={{ gap: '12px' }}>
                  <div style={{ 
                    flex: 1, 
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinkIcon style={{ position: 'absolute', left: '16px', opacity: 0.4 }} size={20} />
                    <input 
                      type="text" 
                      placeholder="ভিডিও লিঙ্কটি এখানে দিন (YouTube, FB, TikTok...)" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 16px 16px 48px',
                        borderRadius: '12px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        color: 'var(--foreground)',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: '0 32px' }} disabled={isProcessing}>
                    {isProcessing ? 'খুঁজছি...' : <><Download size={20} /> ডাউনলোড করুন</>}
                  </button>
                </form>
                {error && <p style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.9rem' }}>{error}</p>}
              </>
            )}

            {step === 'result' && !result && !error && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '3px solid rgba(139, 92, 246, 0.1)', 
                  borderTopColor: 'var(--primary)', 
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ opacity: 0.6 }}>তথ্য প্রস্তুত করা হচ্ছে...</p>
              </div>
            )}

            {step === 'result' && error && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>
                <button onClick={() => setStep('input')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', boxShadow: 'none' }}>
                  আবার চেষ্টা করুন
                </button>
              </div>
            )}

            {step === 'result' && result && (
              <div style={{ textAlign: 'left' }} className="animate-fade-in">
                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                  <img src={result.thumbnail} alt={result.title} style={{ width: '200px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{result.title}</h3>
                    <p style={{ opacity: 0.6 }}>আপলোডার: {result.uploader}</p>
                    <button onClick={() => setStep('input')} style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                      ← অন্য লিঙ্ক দিন
                    </button>
                  </div>
                </div>

                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                        <th style={{ padding: '12px' }}>Resolution</th>
                        <th style={{ padding: '12px' }}>Format</th>
                        <th style={{ padding: '12px' }}>Size</th>
                        <th style={{ padding: '12px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.formats.filter((f: any) => f.url).map((format: any, idx: number) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '12px' }}>{format.resolution || 'N/A'}</td>
                          <td style={{ padding: '12px' }}>{format.ext} {format.quality ? `(${format.quality})` : ''}</td>
                          <td style={{ padding: '12px' }}>{format.filesize ? (format.filesize / (1024 * 1024)).toFixed(1) + ' MB' : 'N/A'}</td>
                          <td style={{ padding: '12px' }}>
                            <a href={format.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', justifyContent: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
              <span>✓ 4K Quality</span>
              <span>✓ No Watermark</span>
              <span>✓ MP3 Extract</span>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="tools" style={{ padding: '80px 0' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '48px' }}>Powerful Web-Native Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <Link href="/tools/video" className="premium-card" style={{ padding: '32px', display: 'block' }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <FileVideo color="var(--primary)" />
              </div>
              <h3>Video Converter</h3>
              <p style={{ opacity: 0.7, marginTop: '12px', lineHeight: '1.6' }}>
                Change video formats, trim clips, and extract audio. All processing happens in your browser using WebAssembly.
              </p>
            </Link>

            <Link href="/tools/pdf" className="premium-card" style={{ padding: '32px', display: 'block' }}>
              <div style={{ background: 'rgba(236, 72, 153, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <FileType color="var(--secondary)" />
              </div>
              <h3>PDF Utility</h3>
              <p style={{ opacity: 0.7, marginTop: '12px', lineHeight: '1.6' }}>
                Merge, split, and compress PDF files instantly. Your files never leave your computer, ensuring total privacy.
              </p>
            </Link>

            <div className="premium-card" style={{ padding: '32px' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 color="var(--accent)" />
              </div>
              <h3>Zero Persistence</h3>
              <p style={{ opacity: 0.7, marginTop: '12px', lineHeight: '1.6' }}>
                No tracking, no storage. We process what you need and forget it immediately. Pure utility, zero clutter.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
}
