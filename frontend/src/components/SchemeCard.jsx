import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const SchemeCard = ({ scheme, t }) => {
  const handleApply = (e) => {
    e.preventDefault();
    if (scheme.applyLink && scheme.applyLink !== '#') {
      window.alert(t.redirectMessage || "You are being redirected to the official government website.");
      window.open(scheme.applyLink, "_blank");
    } else {
      window.alert("Application link not available.");
    }
  };

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'Agriculture': return '🌾';
      case 'Health': return '🏥';
      case 'Finance': return '💰';
      case 'Housing': return '🏠';
      case 'Employment': return '👷';
      default: return '📋';
    }
  };

  return (
    <div className="card card-hover animate-slide-up delay-200">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <h3 style={{ color: 'var(--dark)', fontSize: '1.25rem', paddingRight: '1rem', margin: 0 }}>{scheme.name}</h3>
        <span className="scheme-badge">
          <span>{getCategoryEmoji(scheme.category)}</span>
          {scheme.category}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
        <CheckCircle2 color="var(--primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ color: 'var(--text)', lineHeight: 1.6, margin: 0 }}><strong>Benefits:</strong> {scheme.benefits}</p>
      </div>
      
      <div className="scheme-inner-bg">
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
          <strong style={{ color: 'var(--text)' }}>Eligibility:</strong> {scheme.eligibilitySummary}
        </p>
      </div>
      
      <button 
        onClick={handleApply} 
        className="btn btn-primary" 
      >
        <span>{t.applyNow}</span>
        <ExternalLink size={18} />
      </button>
    </div>
  );
};

export default SchemeCard;
