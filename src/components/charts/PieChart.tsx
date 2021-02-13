import React, { useEffect } from 'react';

import Chart from 'chart.js';
import PropTypes from 'prop-types';

import { PieChartData } from '../../types';

interface IProps {
  data: PieChartData;
  height: string;
  width: string;
  type: string;
}

const PieChart = ({ data, height, width, type }: IProps) => {
  useEffect((): (() => void) => {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type,
      data,
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
      },
    });
    pieChart.update();
    return () => pieChart.destroy();
  });

  return <canvas id="pieChart" width={width} height={height} />;
};

PieChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/doughnut.html) */
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
  /** The type of the chart ('doughnut' | 'pie') */
  type: PropTypes.string.isRequired,
};

export default PieChart;
