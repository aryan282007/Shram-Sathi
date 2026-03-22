import React, { useState, useEffect } from 'react';
import { translations } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import SchemeCard from './components/SchemeCard';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shramSathiTheme') || 'dark';
  });
  const [language, setLanguage] = useState('en');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  const t = translations[language];

  useEffect(() => {
    const cachedData = localStorage.getItem('shramSathiCache');
    if (cachedData) {
      try {
        const { schemes, language: cachedLang, searchParams: cachedParams } = JSON.parse(cachedData);
        setSchemes(schemes || []);
        setLanguage(cachedLang || 'en');
        setSearchParams(cachedParams || null);
        if ((schemes && schemes.length > 0) || cachedParams) {
          setHasSearched(true);
        }
      } catch (e) {
        console.error('Error parsing cache', e);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shramSathiTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    if (searchParams) {
      fetchSchemes(searchParams, newLang);
    } else {
      const cachedData = localStorage.getItem('shramSathiCache');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          localStorage.setItem('shramSathiCache', JSON.stringify({ ...parsed, language: newLang }));
        } catch(e) {}
      }
    }
  };

  const fetchSchemes = async (formData, lang = language) => {
    setLoading(true);
    setHasSearched(true);
    setSearchParams(formData);

    try {
      const response = await fetch('/api/get-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, language: lang }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSchemes(data.data);
        localStorage.setItem('shramSathiCache', JSON.stringify({
          schemes: data.data,
          language: lang,
          searchParams: formData
        }));
      }
    } catch (error) {
      console.error('Error fetching schemes:', error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} theme={theme} toggleTheme={toggleTheme} t={t} />
      
      <main className="main-content">
        <div className="hero-text animate-slide-up">
          <h1>{t.appTitle}</h1>
          <p>{t.appDescription}</p>
        </div>

        <SearchForm onSubmit={fetchSchemes} t={t} initialData={searchParams} />

        {loading && (
          <div className="loading-container animate-slide-up delay-100">
            <div className="spinner"></div>
            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '1.1rem' }}>
              {t.loading}
            </div>
          </div>
        )}

        {!loading && hasSearched && (
          <div style={{ marginTop: '3rem' }}>
            {schemes.length > 0 ? (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {schemes.map((scheme, index) => (
                  <SchemeCard key={scheme.id} scheme={scheme} t={t} index={index} />
                ))}
              </div>
            ) : (
              <div className="card animate-slide-up delay-200" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', fontWeight: '500' }}>{t.noSchemesFound}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer t={t} />
    </>
  );
}

export default App;
