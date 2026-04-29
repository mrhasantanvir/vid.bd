'use client';

import { ShieldAlert, Lock, Eye, Key, ShieldCheck } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Security & Logs</h1>
        <p style={{ opacity: 0.6 }}>Manage access control and monitor system security logs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="premium-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={20} color="var(--primary)" /> Change Password
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="password" placeholder="Current Password" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white' }} />
              <input type="password" placeholder="New Password" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white' }} />
              <button className="btn-primary" style={{ marginTop: '8px' }}>Update Password</button>
            </div>
          </div>

          <div className="premium-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} color="#10b981" /> API Status
            </h3>
            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <p style={{ fontSize: '0.9rem', color: '#10b981' }}>All scrapers are working correctly.</p>
            </div>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={20} color="#f59e0b" /> Recent Security Events
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { event: 'Admin Login', ip: '103.145.74.xxx', time: '10 mins ago', status: 'Success' },
              { event: 'Failed API Request', ip: '185.220.101.xxx', time: '2 hours ago', status: 'Rate Limited' },
              { event: 'Admin Password Changed', ip: '103.145.74.xxx', time: 'Yesterday', status: 'Success' },
              { event: 'New IP Access', ip: '192.168.1.1', time: '2 days ago', status: 'Warning' },
            ].map((log, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{log.event}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>IP: {log.ip} • {log.time}</p>
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  background: log.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: log.status === 'Success' ? '#10b981' : '#ef4444'
                }}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
