import React, { useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import { LineChartData } from '../../types';

interface IProps {
  data: LineChartData;
  height: string;
  width: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const LineChart = ({ data, height, width, xAxisLabel, yAxisLabel }: IProps) => {
  const theme = useTheme();

  useEffect((): (() => void) => {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    const lineChart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: yAxisLabel,
                fontColor: theme.palette.text.primary,
              },
              ticks: {
                fontColor: theme.palette.text.secondary,
              },
              gridLines: {
                color: theme.palette.action.focus,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: xAxisLabel,
                fontColor: theme.palette.text.primary,
              },
              ticks: {
                fontColor: theme.palette.text.secondary,
              },
              gridLines: {
                color: theme.palette.action.focus,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: theme.palette.text.secondary,
          },
        },
      },
    });
    lineChart.update();
    return () => lineChart.destroy();
  });

  return <canvas id="lineChart" width={width} height={height} />;
};

LineChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/line.html) */
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
  /** The label on the x-axis */
  xAxisLabel: PropTypes.string.isRequired,
  /** The label on the y-axis */
  yAxisLabel: PropTypes.string.isRequired,
};

export default LineChart;
