import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';
import * as CONSTS from '../shared/constants';
import PropTypes from 'prop-types';

export default function Scores(props) {

  const { className, type } = props;
  const animes = props.stats || [];
  const title = props.title || "Scores Distribution";
  let scores = new Array(11).fill(0);
  animes.map(elem => scores[elem.score]++);
  const scoresData = {
    labels: ['u/d','1','2','3','4','5','6','7','8','9','10'],
    datasets: [{
      label: 'score',
      data: scores,
      pointBackgroundColor: type === "anime" ? 'rgba(0,100,0,0.1)' : 'rgba(0,0,100,0.1)',
      pointBorderColor: type === "anime" ? 'rgba(0,100,0,0.5)' : 'rgba(0,0,100,0.5)',
      backgroundColor: type === "anime" ? 'rgba(0,255,0,0.1)' : 'rgba(0,0,255,0.1)',
    }],
  }
  return (
    <div 
      className={className}
      style={{height: "250px"}}
    >
      <h4>{title}</h4>
      <Line 
        data={scoresData}
        options={{ 
          maintainAspectRatio: false, 
          legend: {
            display: false,
          },
          }}
      />
    </div>
  );

}

Scores.propTypes = {
  stats: PropTypes.array,
  type: PropTypes.oneOf(["anime", "manga"]).isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
}
  