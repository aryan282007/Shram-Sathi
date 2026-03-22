const schemes = require('../data/schemes.json');

export default function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { income, jobType, state, language = 'en' } = req.body;
  let filteredSchemes = schemes;
  
  if (income) {
    const numIncome = parseInt(income, 10);
    if (!isNaN(numIncome)) {
      filteredSchemes = filteredSchemes.filter(s => {
        if (s.incomeLimit === null) return true;
        return numIncome <= s.incomeLimit;
      });
    }
  }
  
  if (jobType && jobType !== 'all') {
    filteredSchemes = filteredSchemes.filter(s => 
      s.eligibleJobTypes.includes(jobType) || s.eligibleJobTypes.includes('all')
    );
  }
  
  if (state && state !== 'all') {
    filteredSchemes = filteredSchemes.filter(s => 
      s.state === 'All' || s.state.includes(state)
    );
  }
  
  const result = filteredSchemes.map(s => ({
    id: s.id,
    name: language === 'hi' && s.nameHi ? s.nameHi : s.name,
    category: s.category,
    benefits: language === 'hi' && s.benefitsHi ? s.benefitsHi : s.benefits,
    eligibilitySummary: language === 'hi' ? 'पात्रता अनुसार' : 'Based on eligibility',
    applyLink: s.link || '#'
  }));

  res.status(200).json({ success: true, count: result.length, data: result });
}
