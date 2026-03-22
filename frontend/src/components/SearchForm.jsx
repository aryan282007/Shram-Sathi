import React, { useState, useEffect } from 'react';
import { Mic, Search, IndianRupee, Briefcase, MapPin } from 'lucide-react';

const SearchForm = ({ onSubmit, t, initialData }) => {
  const [formData, setFormData] = useState({
    income: initialData?.income || '',
    jobType: initialData?.jobType || 'all',
    state: initialData?.state || 'all'
  });
  
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const number = transcript.replace(/\D/g, ''); 
      if (number) {
        setFormData(prev => ({ ...prev, income: number }));
      } else {
        alert('Could not detect a valid number. Please try again.');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card animate-slide-up delay-100" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="income">{t.monthlyIncome}</label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="input-icon-wrapper" style={{ flex: 1 }}>
            <IndianRupee className="input-icon" size={20} />
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="input-control"
              placeholder={t.incomePlaceholder}
            />
          </div>
          <button 
            type="button" 
            className={`btn-icon ${isListening ? 'pulse-animation' : ''}`}
            onClick={startVoiceInput}
            title="Speak Income"
          >
            <Mic size={24} />
          </button>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="jobType">{t.jobType}</label>
        <div className="input-icon-wrapper">
          <Briefcase className="input-icon" size={20} />
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="input-control"
          >
            {Object.entries(t.jobs).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="state">{t.state}</label>
        <div className="input-icon-wrapper">
          <MapPin className="input-icon" size={20} />
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-control"
          >
            {Object.entries(t.states).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        <Search size={22} />
        <span>{t.findSchemes}</span>
      </button>
    </form>
  );
};

export default SearchForm;
