import React, { useState, useEffect } from 'react';
import './mystyle.css';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

function App() {
  const [MostWords, setMostWords] = useState([]);
  const [Fetching, setFetching] = useState(false);


  // code for fetching the chart from the provided link
  const doSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const sentence = await response.text();

    const mywords = sentence.split(/\W+/);
    const wordCount = {};

    for (let myword of mywords) {
      if (myword) {
        myword = myword.toLowerCase();
        wordCount[myword] = wordCount[myword] ? wordCount[myword] + 1 : 1;
      }
    }

    const MostOccured = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 20);

    setMostWords(MostOccured);
    setFetching(false);
  };

  //code for getting the most words in the chart in excel format

  const doExport = () => {
    const csv = Papa.unparse(MostWords, { header: ['Word', 'Count'] });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  };

  // displaying the histogram depicting the most words in the chart with the frequency

  useEffect(() => {
    const createHistogram = () => {
      const data = MostWords.map(([word, total]) => total);
      const labels = MostWords.map(([word, total]) => word);


      const histogramElement = document.getElementById('chartHistogram');
      if (histogramElement) {
        const histogram = new Chart(histogramElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              data,
              borderWidth: 2,
              label: 'Frequency of each word ',
              backgroundColor: 'rgba(23, 68, 128, 1)',
              borderColor: 'rgba(52, 131, 235, 1)',
            }]
          },
          options: {
            responsive: true,
          }
        });

        return histogram;
      }

      return null;
    };

    let histogram = createHistogram();

    return () => {
      if (histogram) {
        histogram.destroy();
        histogram = null;
      }
    };
  }, [MostWords]);

//===========================================================================================

  return (
    <><div className='introduction'>Terribly Tiny Tale Assignment By Supriti Vats</div>
      <div className='mycontainer'>

        <form onSubmit={doSubmit}>

          <button type="submit">{Fetching ? 'Fetching...' : 'Submit'}</button>
        </form>

        {
          MostWords.length > 0 && (
            <div style={{ width: '100%', height: '90%', }}>
              <div style={{ width: '70%', height: '65%', marginLeft: '225px', marginTop: '20px' }}>
                <canvas id="chartHistogram"></canvas>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>  X-axis =  Top 20 words with highest Frequency &nbsp; &nbsp;&nbsp;&nbsp;
                Y-axis = Total Frequency
              </div>
              <button className='export-button' onClick={doExport}>Export</button>
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
