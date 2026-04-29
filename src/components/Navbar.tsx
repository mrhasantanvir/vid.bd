'use client';

import Link from 'next/link';
import { Download, FileText, Settings, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ 
      margin: '20px auto', 
      maxWidth: '1200px', 
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Download size={20} color="white" />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
          vid<span style={{ color: 'var(--primary)' }}>.bd</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div className="hide-mobile" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="#downloader" className="nav-link">ডাউনলোডার</Link>
          <Link href="#converter" className="nav-link">কনভার্টার</Link>
          <Link href="#tools" className="nav-link">সব টুলস</Link>
        </div>
        <Link href="/admin" style={{ opacity: 0.7 }}><Settings size={20} /></Link>
      </div>

      <style jsx>{`
        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          opacity: 0.8;
        }
        .nav-link:hover {
          opacity: 1;
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
}
