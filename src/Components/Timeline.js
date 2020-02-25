import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  const { list, title, classPrefix } = props;
  /*
    Data is stored as:
      year => {score: ..., popularity: ..., bayesian: ...}
      ...
  */
  const [chartData, setChartData] = useState({});

  function updateTimeData() {
    let timeDataScoresTmp = {};
    let newTimeData = {};
    list.map(item => {
      let year = item.start_date ? parseInt(item.start_date.substring(0, 4)) : 0;
      let score = item.score;
      timeDataScoresTmp[year] ? timeDataScoresTmp[year].push(score) : timeDataScoresTmp[year] = [score];
    });
    let totalScore = Object.keys(timeDataScoresTmp).reduce((acc, key) => {
      return acc + timeDataScoresTmp[key].reduce((acc2, score) => {
        return acc2 + score;
      });
    }, 0);
    let totalSize = Object.keys(timeDataScoresTmp).reduce((acc, key) => {
      return acc + timeDataScoresTmp[key].length;
    }, 0);
    let meanScore = totalSize === 0 ? 0 : totalScore / totalSize;
    Object.keys(timeDataScoresTmp).map(year => {
      if(newTimeData[year] === undefined) newTimeData[year] = {};
      newTimeData[year].score = timeDataScoresTmp[year].reduce((acc, val) => acc + val) / timeDataScoresTmp[year].length;
      newTimeData[year].popularity = timeDataScoresTmp[year].length;
    });
    updateChartData(newTimeData, meanScore);
  }

  function updateChartData(newTimeData, meanScore) {
    setChartData({
      labels: Object.keys(newTimeData),
      datasets: [
        {
          label: 'popularity',
          data: Object.keys(newTimeData).map(key => { return { x: key, y: newTimeData[key].popularity }; }),
          pointBackgroundColor: 'rgba(0, 255, 0, 0.3)',
          pointBorderColor: 'rgba(0, 255, 0, 0.5)',
          // transparent font
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 255, 0, 0.3)',
        },
        {
          label: 'scores',
          data: Object.keys(newTimeData).map(key => { return { x: key, y: newTimeData[key].score }; }),
          pointBackgroundColor: 'rgba(255, 0, 0, 0.3)',
          pointBorderColor: 'rgba(255, 0, 0, 0.5)',
          // transparent font
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(255, 0, 0, 0.3)',
        },
        {
          label: 'bayesian',
          data: Object.keys(newTimeData).map(key => { 
            return { 
              x: key, 
              y: (newTimeData[key].popularity / (newTimeData[key].popularity + 5) * newTimeData[key].score) + 
                (5 / (newTimeData[key].popularity + 5) * meanScore),
            }; 
          }),
          pointBackgroundColor: 'rgba(0, 0, 255, 0.3)',
          pointBorderColor: 'rgba(0, 0, 255, 0.5)',
          // transparent font
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 255, 0.3)',
        },
      ],
    });
  }

  useEffect(() => {
    updateTimeData();
  }, [list]);

  return (
    <div className={`${classPrefix}_timeLine`}>
      <h3>{title}</h3>
      <Line 
        data={chartData}
        options={{ 
          maintainAspectRatio: false, 
        }}
      />
    </div>
  );
}