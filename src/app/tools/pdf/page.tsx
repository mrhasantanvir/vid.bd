'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdInterim from '@/components/AdInterim';
import { FileText, Plus, Trash2, Download, Layers } from 'lucide-react';

export default function PdfTools() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    
    setShowAd(true);
    setIsProcessing(true);
  };

  const executeMerge = async () => {
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsProcessing(false);
      setShowAd(false);
    } catch (error) {
      console.error('PDF Merge Error:', error);
      alert('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
      setIsProcessing(false);
      setShowAd(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <AdInterim isVisible={showAd} onComplete={executeMerge} />

      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px' 
          }}>
            <Layers size={32} color="var(--primary)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>PDF Merger</h1>
          <p style={{ opacity: 0.7 }}>Combine multiple PDF files into one. Fast, secure, and private.</p>
        </div>

        <div className="premium-card" style={{ padding: '32px' }}>
          <div style={{ 
            border: '2px dashed var(--card-border)', 
            borderRadius: '16px', 
            padding: '40px', 
            textAlign: 'center',
            marginBottom: '32px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input 
              type="file" 
              id="fileInput" 
              multiple 
              accept=".pdf" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <Plus size={40} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <p>Click or drag PDF files here to upload</p>
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ marginBottom: '16px', opacity: 0.8 }}>Selected Files ({files.length})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {files.map((file, idx) => (
                  <div key={idx} className="glass-panel" style={{ 
                    padding: '12px 20px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={20} style={{ opacity: 0.5 }} />
                      <span style={{ fontSize: '0.9rem' }}>{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(idx)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={files.length < 2 || isProcessing}
            onClick={mergePdfs}
          >
            {isProcessing ? 'Processing...' : <><Download size={20} /> Merge & Download</>}
          </button>
          
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>
            Processing happens locally in your browser. Your files are never uploaded to our server.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
