'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const [ecosystems, setEcosystems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setEcosystems(data.ecosystem || []);
      });
  }, []);

  return (
    <footer style={{ 
      marginTop: '100px',
      padding: '60px 20px',
      borderTop: '1px solid var(--card-border)',
      background: 'rgba(0,0,0,0.2)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>vid.bd</h3>
            <p style={{ opacity: 0.6, lineHeight: '1.6' }}>
              আপনার প্রতিদিনের মিডিয়া ও ফাইল প্রসেসিং সহজ করতে আমরা তৈরি করেছি এই হাব। দ্রুত, নিরাপদ এবং ১০০% ফ্রি।
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>কুইক লিঙ্কস</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link href="#downloader" style={{ opacity: 0.7 }}>ভিডিও ডাওনলোডার</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#converter" style={{ opacity: 0.7 }}>ফাইল কনভার্টার</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#pdf" style={{ opacity: 0.7 }}>পিডিএফ টুলস</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '16px' }}>আমাদের ইকোসিস্টেম</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {ecosystems.map(site => (
                <li key={site.name} style={{ marginBottom: '8px' }}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" style={{ 
                    opacity: 0.7, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    {site.name} <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ 
          marginTop: '60px', 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
          opacity: 0.5,
          fontSize: '0.9rem'
        }}>
          © {new Date().getFullYear()} vid.bd. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
