'use client';

import { useState, useEffect } from 'react';
import { Share2, Plus, Trash2, Save, ExternalLink } from 'lucide-react';

export default function EcosystemManager() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setLinks(data.ecosystem || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/settings');
    const currentData = await res.json();
    
    await fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify({ ...currentData, ecosystem: links })
    });
    alert('Ecosystem links updated successfully!');
  };

  const addLink = () => {
    setLinks([...links, { name: 'New Site', url: 'https://' }]);
  };

  const removeLink = (idx: number) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const updateLink = (idx: number, field: string, value: string) => {
    setLinks(links.map((link, i) => i === idx ? { ...link, [field]: value } : link));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Ecosystem Links</h1>
          <p style={{ opacity: 0.6 }}>Manage links to your other business platforms in the footer.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={addLink} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', boxShadow: 'none' }}>
            <Plus size={18} /> Add Site
          </button>
          <button onClick={handleSave} className="btn-primary">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="premium-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {links.map((link, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '10px', borderRadius: '10px' }}>
                <Share2 size={20} color="var(--primary)" />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Site Name"
                  value={link.name} 
                  onChange={(e) => updateLink(idx, 'name', e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white' }}
                />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="URL"
                    value={link.url} 
                    onChange={(e) => updateLink(idx, 'url', e.target.value)}
                    style={{ width: '100%', padding: '12px 40px 12px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white' }}
                  />
                  <ExternalLink size={16} style={{ position: 'absolute', right: '12px', opacity: 0.4 }} />
                </div>
              </div>
              <button 
                onClick={() => removeLink(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {links.length === 0 && (
            <p style={{ textAlign: 'center', opacity: 0.5, padding: '40px' }}>No links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
