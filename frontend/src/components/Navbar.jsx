import React from 'react';
import { IndianRupee, Sun, Moon } from 'lucide-react';

const Navbar = ({ language, toggleLanguage, theme, toggleTheme, t }) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          color: 'white', 
          width: '38px', 
          height: '38px', 
          borderRadius: 'var(--radius-md)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: 'var(--glow-btn)'
        }}>
          <IndianRupee size={22} />
        </div>
        <span>Shram Sathi</span>
      </a>
      
      <div className="controls-wrapper">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="lang-toggle">
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
            onClick={() => language !== 'en' && toggleLanguage('en')}
          >
            EN
          </button>
          <button 
            className={`lang-btn ${language === 'hi' ? 'active' : ''}`} 
            onClick={() => language !== 'hi' && toggleLanguage('hi')}
          >
            हिं
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
