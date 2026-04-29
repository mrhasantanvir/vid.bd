'use client';

import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Traffic Analytics</h1>
        <p style={{ opacity: 0.6 }}>Detailed insights into visitor behavior and tool usage.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="premium-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <TrendingUp color="var(--primary)" />
            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>+15% vs last week</span>
          </div>
          <h4 style={{ opacity: 0.6, fontSize: '0.9rem' }}>Total Page Views</h4>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>24,812</h2>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Users color="var(--secondary)" />
            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>+5% vs last week</span>
          </div>
          <h4 style={{ opacity: 0.6, fontSize: '0.9rem' }}>Unique Visitors</h4>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>8,430</h2>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Globe color="var(--accent)" />
            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Top: Bangladesh</span>
          </div>
          <h4 style={{ opacity: 0.6, fontSize: '0.9rem' }}>Avg. Session Duration</h4>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>4m 12s</h2>
        </div>
      </div>

      <div className="premium-card" style={{ padding: '40px' }}>
        <h3 style={{ marginBottom: '32px' }}>Usage by Platform</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { label: 'YouTube Downloader', value: 65, color: '#ff0000' },
            { label: 'Facebook Downloader', value: 45, color: '#1877f2' },
            { label: 'PDF Tools', value: 30, color: 'var(--primary)' },
            { label: 'TikTok Downloader', value: 25, color: '#00f2ea' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <div style={{ width: `${item.value}%`, height: '100%', background: item.color, borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
