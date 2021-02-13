import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import PieChart from '../charts/PieChart';
import AccountSelector from '../inputs/AccountSelector';
import MonthYearSelector from '../inputs/MonthYearSelector';
import { Filters, PieChartData } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(50% - 1px)',
    height: 'calc(100vh - 64px)',
    minWidth: '500px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    '& .statsContainer': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px 0',
      '& .stats': {
        margin: '0px 10px',
        textTransform: 'uppercase',
      },
      '& .income': {
        color: theme.palette.primary.main,
      },
      '& .expenses': {
        color: theme.palette.error.main,
      },
      '& .net': {
        color: theme.palette.text.primary,
      },
    },
    '& .filters': {
      width: '50%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
  },
}));

interface Stats {
  label: string;
  value: number;
}

interface IProps {
  data: PieChartData;
  filters: Filters;
  setFilters: (f: Filters) => void;
  stats: Stats[];
}

const CategoryStatistics = ({ data, filters, setFilters, stats }: IProps) => {
  const classes = useStyles();

  const setAccount = (account: string) => setFilters({ ...filters, account });

  const setMonth = (month: number) =>
    setFilters({
      ...filters,
      date: { ...filters.date, month },
    });

  const setYear = (year: number) =>
    setFilters({
      ...filters,
      date: { ...filters.date, year },
    });

  return (
    <div className={classes.root}>
      <MonthYearSelector
        selectedDate={filters.date}
        setMonth={setMonth}
        setYear={setYear}
        enableSelectAll
      />
      <PieChart width="auto" height="auto" data={data} type="pie" />
      <div className="statsContainer">
        {stats.map((stat) => (
          <div className="stats" key={stat.label}>
            <Typography variant="overline" color="textSecondary" align="center">
              {stat.label}
            </Typography>
            <Typography className={stat.label} variant="body1" align="center">
              {stat.value.toFixed(2)}
            </Typography>
          </div>
        ))}
      </div>
      <AccountSelector
        selectedAccount={filters.account}
        setAccount={setAccount}
        enableSelectAll
      />
    </div>
  );
};

CategoryStatistics.propTypes = {
  /** The data to be displayed in the chart
   * (refer to utils/graphUtils.js) */
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  /** A Filter object */
  filters: PropTypes.shape({
    account: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number,
    }),
  }).isRequired,
  /** Function to change the filters */
  setFilters: PropTypes.func.isRequired,
  /** An array of objects with the following structure:
   * { label: (string), value: (string | number) } */
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryStatistics;
