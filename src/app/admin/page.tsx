import { Activity, Users, Download, Zap } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Daily Users', value: '1,284', icon: Users, color: 'var(--primary)' },
    { label: 'Files Processed', value: '5,632', icon: Zap, color: 'var(--accent)' },
    { label: 'Video Downloads', value: '3,410', icon: Download, color: 'var(--secondary)' },
    { label: 'Server Load', value: '12%', icon: Activity, color: '#10b981' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>System Overview</h1>
        <p style={{ opacity: 0.6 }}>Real-time performance and usage metrics for vid.bd</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="premium-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ 
                background: `${stat.color}15`, 
                padding: '10px', 
                borderRadius: '12px' 
              }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>+12% ↑</span>
            </div>
            <h4 style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</h4>
            <h2 style={{ fontSize: '1.8rem' }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="premium-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p style={{ fontSize: '0.95rem' }}>YouTube Video Downloaded</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>1080p MP4 • 12.4 MB</p>
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{i * 2} mins ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Ecosystem Traffic</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {['TKS.bd', 'BusinessConnect', 'RajshahiRam'].map((site) => (
              <div key={site}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>{site}</span>
                  <span style={{ opacity: 0.6 }}>420 clicks</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
