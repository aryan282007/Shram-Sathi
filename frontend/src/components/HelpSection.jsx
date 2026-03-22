import React from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';

const HelpSection = ({ t }) => {
  return (
    <div className="card" style={{ marginTop: '2rem', textAlign: 'center', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
      <HelpCircle size={32} color="var(--primary-color)" style={{ marginBottom: '0.5rem' }} />
      <h3 style={{ marginBottom: '0.5rem', color: '#166534' }}>{t.digitalMitraHelp}</h3>
      <p style={{ marginBottom: '1.5rem', color: '#15803d', fontSize: '0.95rem' }}>
        {t.offlineSupportText}
      </p>
      <a 
        href="https://wa.me/919876543210?text=Hello%20Digital%20Mitra" 
        target="_blank" 
        rel="noreferrer"
        className="btn" 
        style={{ 
          background: '#25D366', 
          color: 'white', 
          textDecoration: 'none',
          display: 'inline-flex',
          gap: '0.5rem',
          width: 'auto'
        }}
      >
        <MessageCircle size={20} />
        {t.chatOnWhatsApp}
      </a>
    </div>
  );
};

export default HelpSection;
