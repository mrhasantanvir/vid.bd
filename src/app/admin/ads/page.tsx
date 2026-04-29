'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Plus, Trash2, Save, Power, PowerOff } from 'lucide-react';

export default function AdsManager() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setAds(data.ads || []);
        setLoading(false);
      });
  }, []);

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(id);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        updateAd(id, 'imageUrl', data.url);
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    const res = await fetch('/api/settings');
    const currentData = await res.json();
    
    await fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify({ ...currentData, ads })
    });
    alert('Ads updated successfully!');
  };

  const addAd = () => {
    const newAd = {
      id: Date.now().toString(),
      title: 'নতুন বিজ্ঞাপন',
      description: 'বিজ্ঞাপনের বর্ণনা এখানে দিন',
      link: 'https://',
      buttonText: 'অফারটি দেখুন',
      imageUrl: '',
      active: true
    };
    setAds([...ads, newAd]);
  };

  const removeAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  const updateAd = (id: string, field: string, value: any) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, [field]: value } : ad));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }} className="mobile-stack">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>অ্যাড ম্যানেজার</h1>
          <p style={{ opacity: 0.6 }}>ইউজার যখন ভিডিও প্রসেস হওয়ার জন্য অপেক্ষা করবে, তখন এই বিজ্ঞাপনগুলো দেখানো হবে।</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={addAd} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'black', boxShadow: 'none' }}>
            <Plus size={18} /> নতুন অ্যাড যোগ করুন
          </button>
          <button onClick={handleSave} className="btn-primary">
            <Save size={18} /> সেভ করুন
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {ads.map((ad) => (
          <div key={ad.id} className="premium-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  background: ad.active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  padding: '8px',
                  borderRadius: '10px'
                }}>
                  <Megaphone size={20} color={ad.active ? '#10b981' : '#ef4444'} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>{ad.title}</h3>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => updateAd(ad.id, 'active', !ad.active)}
                  style={{ background: 'none', border: 'none', color: ad.active ? '#10b981' : '#ef4444', cursor: 'pointer' }}
                >
                  {ad.active ? <Power size={20} /> : <PowerOff size={20} />}
                </button>
                <button 
                  onClick={() => removeAd(ad.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Title</label>
                  <input 
                    type="text" 
                    value={ad.title} 
                    onChange={(e) => updateAd(ad.id, 'title', e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--card-border)', color: 'var(--foreground)' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Button Text</label>
                  <input 
                    type="text" 
                    value={ad.buttonText} 
                    onChange={(e) => updateAd(ad.id, 'buttonText', e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--card-border)', color: 'var(--foreground)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Ad Banner Image</label>
                <div style={{ 
                  border: '2px dashed var(--card-border)', 
                  borderRadius: '12px', 
                  padding: '20px', 
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.02)',
                  position: 'relative',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {ad.imageUrl ? (
                    <>
                      <img src={ad.imageUrl} alt="Ad Preview" style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '8px' }} />
                      <button 
                        onClick={() => updateAd(ad.id, 'imageUrl', '')}
                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div style={{ cursor: 'pointer' }}>
                      <label style={{ cursor: 'pointer' }}>
                        <Plus size={24} style={{ opacity: 0.3 }} />
                        <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '8px' }}>{uploading === ad.id ? 'Uploading...' : 'Click to Upload Image'}</p>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(ad.id, e)} style={{ display: 'none' }} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Destination Link</label>
                <input 
                  type="text" 
                  value={ad.link} 
                  onChange={(e) => updateAd(ad.id, 'link', e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Description</label>
                <textarea 
                  value={ad.description} 
                  onChange={(e) => updateAd(ad.id, 'description', e.target.value)}
                  rows={2}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white', resize: 'none' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
