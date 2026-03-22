import React from 'react';
import { MessageCircle, Heart, Shield } from 'lucide-react';

const Footer = ({ t }) => {
  return (
    <footer className="footer animate-slide-up delay-300">
      <div className="footer-content">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Shield size={28} color="var(--primary-light)" style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>100% Secure</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Heart size={28} color="var(--primary-light)" style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Built for You</span>
          </div>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{t.digitalMitraHelp}</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
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
              maxWidth: '300px',
              margin: '0 auto'
            }}
          >
            <MessageCircle size={22} />
            {t.chatOnWhatsApp}
          </a>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Shram Sathi. Empowering Workers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
