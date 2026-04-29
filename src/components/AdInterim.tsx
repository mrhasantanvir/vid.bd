'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdInterimProps {
  onComplete: () => void;
  isVisible: boolean;
}

export default function AdInterim({ onComplete, isVisible }: AdInterimProps) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    if (isVisible) {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          const activeAds = data.ads?.filter((a: any) => a.active) || [];
          if (activeAds.length > 0) {
            const randomAd = activeAds[Math.floor(Math.random() * activeAds.length)];
            setAd(randomAd);
          }
        });
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [timeLeft, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="premium-card animate-fade-in" style={{
        width: '90%',
        maxWidth: '500px',
        padding: '40px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          background: 'var(--primary)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {timeLeft}
        </div>

        <h2 style={{ marginBottom: '16px' }} className="text-gradient">Processing Your Request...</h2>
        <p style={{ opacity: 0.7, marginBottom: '32px' }}>
          {ad ? ad.description : 'Preparing your file for download...'}
        </p>

        {ad && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px dashed var(--primary)'
          }}>
            <h4 style={{ color: 'var(--secondary)', marginBottom: '8px' }}>{ad.title}</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
              {ad.description}
            </p>
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.9rem' }}>
              {ad.buttonText} <ExternalLink size={14} />
            </a>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.5, fontSize: '0.8rem' }}>
          <ShieldCheck size={14} /> 100% Virus Free & Secure Processing
        </div>
      </div>
    </div>
  );
}
