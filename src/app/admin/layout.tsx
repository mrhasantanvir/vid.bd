'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BarChart3, Megaphone, Share2, ShieldAlert, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  if (!isAuthorized) return <div style={{ background: 'var(--background)', minHeight: '100vh' }}></div>;

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="mobile-stack" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '100%',
        maxWidth: '280px', 
        background: 'rgba(255, 255, 255, 0.6)', 
        borderRight: '1px solid var(--card-border)',
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}
      className="hide-mobile"
      >
        <div style={{ padding: '0 12px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>vid<span style={{ color: 'var(--primary)' }}>.bd</span></h2>
          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Admin Control Panel</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/admin" className="admin-nav-link">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin/ads" className="admin-nav-link">
            <Megaphone size={18} /> Ads Manager
          </Link>
          <Link href="/admin/ecosystem" className="admin-nav-link">
            <Share2 size={18} /> Ecosystem
          </Link>
          <Link href="/admin/analytics" className="admin-nav-link">
            <BarChart3 size={18} /> Analytics
          </Link>
          <Link href="/admin/security" className="admin-nav-link">
            <ShieldAlert size={18} /> Security & Logs
          </Link>
          <button onClick={handleLogout} className="admin-nav-link" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.8rem', marginBottom: '8px', opacity: 0.7 }}>Server Status</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#10b981' }}>
            <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
            Healthy
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>

      <style jsx global>{`
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          opacity: 0.7;
          transition: all 0.2s;
        }
        .admin-nav-link:hover {
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
