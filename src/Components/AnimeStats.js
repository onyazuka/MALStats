import React, { useState, useEffect, useRef } from 'react';
import {Pie} from 'react-chartjs-2';
import * as CONSTS from '../shared/constants';
import * as Styles from '../shared/styles';
import {StyledUList} from '../shared/styles';
import PropTypes from 'prop-types';

export default function AnimeStats(props) {

    const { className } = props;
    const title = props.title || "Stats";
    const pieRef = useRef();

    /*
      We want to disable legend for small screen sizes
    */
    function onPieResize(pie, sizes) {
      if(sizes.width < 300) {
        pie.options.legend.display = false;
      }
      else {
        pie.options.legend.display = true;
      }
    }

    useEffect(() => {
      pieRef.current.chartInstance.width = pieRef.current.chartInstance.width - 1;
    }, []);

    const {
      completed,
      days_watched, 
      dropped,
      episodes_watched,
      mean_score,
      on_hold,
      plan_to_watch,
      rewatched,
      total_entries,
      watching,
    } = props.stats;

    const statsData = {
      datasets: [{
        data: [completed, dropped, on_hold, plan_to_watch, watching],
        backgroundColor: ["#00ff0055", "#ff000055", "#ffff0055", "#80008055", "#0000ff55"],
        borderColor: "#00000055",
      }],
      labels: [
        "Completed",
        "Dropped",
        "On hold",
        "Plan to watch",
        "Watching"
      ],
    }


    return (
      <Styles.CentralizedContainer 
        className={className}
      >
        <h4>{title}</h4>
        <Pie 
          ref={pieRef}
          data={statsData}
          options={{
            onResize: (pie, sizes) => onPieResize(pie, sizes),
          }}
        />
        <StyledUList
          className={`${className}_other`} 
        >
          <li>Days: {days_watched}</li>
          <li>Episodes: {episodes_watched}</li>
          <li>Mean score: {mean_score}</li>
        </StyledUList>
      </Styles.CentralizedContainer>
      
    );
  }

AnimeStats.propTypes = {
  stats: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["anime", "manga"]).isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
}