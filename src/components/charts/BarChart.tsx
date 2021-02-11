import React, {useEffect} from 'react';

import Chart from 'chart.js';
import PropTypes from 'prop-types';


interface IProps {
  data: object;
  height: string;
  width: string;
}

const BarChart = ({data, height, width}: IProps) => {
  useEffect(function (): () => void {
      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: data,
        options: {
          responsive: false,
          animation: {
            duration: 0,
          },
          hover: {
            animationDuration: 0,
          },
          responsiveAnimationDuration: 0,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                suggestedMin: 0,
                display: false,
              },
            }],
          },
        },
      });
      barChart.update();
      return () => barChart.destroy();
    });

  return (
    <canvas
      id="barChart"
      width={width}
      height={height}
    ></canvas>
  );
};

BarChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/bar.html) */
  data: PropTypes.object.isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
};

export {BarChart};
