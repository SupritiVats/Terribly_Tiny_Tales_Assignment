import React, { useState } from 'react';
import './mystyle.css';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

function App() {
  const [topWords, setTopWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();

    const words = text.split(/\W+/);
    const wordFreq = {};

    for (let word of words) {
      if (word) {
        word = word.toLowerCase();
        wordFreq[word] = wordFreq[word] ? wordFreq[word] + 1 : 1;
      }
    }

    const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 20);
 
    setTopWords(topWords);
    setLoading(false);
  };

  const handleExport = () => {
    const csv = Papa.unparse(topWords, { header: ['Word', 'Count'] });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  };

  React.useEffect(() => {
    if (topWords.length) {
      const labels = topWords.map(([word, count]) => word);
      const data = topWords.map(([word, count]) => count);

      const histogram = new Chart(document.getElementById('histogram'),
        {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label:'Frequency of each words',
              data,
              borderWidth: 2,
              backgroundColor: 'rgba(23, 68, 128, 1)',
              borderColor: 'rgba(52, 131, 235, 1)',
              
            }]
          },
          options: {
            responsive: true,
          }
        }
      );

      return () => {
        histogram.destroy();
      };
    }
  }, [topWords]);

  return (
    <><div className='introduction'>Terribly Tiny Tale Assignment By Supriti Vats</div>
    <div className='mycontainer'>
      
      <form   onSubmit={handleSubmit}>
        <button type="submit">{loading ? 'Loading...' : 'Submit'}</button>
      </form>

      {
        topWords.length > 0 && (
          <div style={{ width: '100%', height: '100%', }}>
            <div style={{ width: '70%', height: '70%', marginLeft: '250px', marginTop: '30px' }}>
              <canvas id="histogram"></canvas>
            </div>
            <button className='export-button' onClick={handleExport}>Export</button>
          </div>
        )
      }
    </div>
    </>
  );
}

export default App;
