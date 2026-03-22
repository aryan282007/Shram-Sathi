const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load schemes data
const schemesPath = path.join(__dirname, 'data', 'schemes.json');
let schemes = [];
try {
  const data = fs.readFileSync(schemesPath, 'utf8');
  schemes = JSON.parse(data);
} catch (error) {
  console.error('Error reading schemes data:', error);
}

// API endpoint to get schemes based on filters
app.post('/api/get-schemes', (req, res) => {
  const { income, jobType, state, language = 'en' } = req.body;
  
  let filteredSchemes = schemes;
  
  // Filter by income (if income is provided and scheme has a limit)
  if (income) {
    const numIncome = parseInt(income, 10);
    if (!isNaN(numIncome)) {
      filteredSchemes = filteredSchemes.filter(s => {
        if (s.incomeLimit === null) return true; // No income limit
        return numIncome <= s.incomeLimit;
      });
    }
  }
  
  // Filter by job type
  if (jobType && jobType !== 'all') {
    filteredSchemes = filteredSchemes.filter(s => 
      s.eligibleJobTypes.includes(jobType) || s.eligibleJobTypes.includes('all')
    );
  }
  
  // Filter by state
  if (state && state !== 'all') {
    filteredSchemes = filteredSchemes.filter(s => 
      s.state === 'All' || s.state.includes(state)
    );
  }
  
  // Map data to the requested language (English vs Hindi)
  const result = filteredSchemes.map(s => ({
    id: s.id,
    name: language === 'hi' && s.nameHi ? s.nameHi : s.name,
    category: s.category,
    benefits: language === 'hi' && s.benefitsHi ? s.benefitsHi : s.benefits,
    eligibilitySummary: language === 'hi' ? 'पात्रता अनुसार' : 'Based on eligibility',
    applyLink: s.link || '#'
  }));

  res.json({ success: true, count: result.length, data: result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
