import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import LineChart from '../charts/LineChart';
import AccountSelector from '../inputs/AccountSelector';
import CategorySelector from '../inputs/CategorySelector';
import MonthYearSelector from '../inputs/MonthYearSelector';
import { Filters, LineChartData } from '../../types';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .filtersContainer': {
      width: '100%',
      height: '74px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& .filter': {
        marginRight: '30px',
      },
      '& .filter:nth-of-type(2)': {
        minWidth: '200px',
      },
    },
    '& .chartContainer': {
      width: '80%',
      height: 'calc(100vh - 138px)',
      display: 'flex',
      alignItems: 'center',
    },
  },
});

interface IProps {
  data: LineChartData;
  currency: string;
  filters: Filters;
  setFilters: (f: Filters) => void;
}

const ActivityStatistics = ({
  data,
  currency,
  filters,
  setFilters,
}: IProps) => {
  const classes = useStyles();

  const setAccount = (account: string) => setFilters({ ...filters, account });

  const setCategory = (category: string) =>
    setFilters({ ...filters, category });

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
      <div className="filtersContainer">
        <div className="filter">
          <MonthYearSelector
            selectedDate={filters.date}
            setMonth={setMonth}
            setYear={setYear}
            enableSelectAll
          />
        </div>
        <div className="filter">
          <CategorySelector
            type="transactions"
            selectedCategory={filters.category}
            setCategory={setCategory}
            enableSelectAll
            showUncategorized
          />
        </div>
        <div className="filter">
          <AccountSelector
            selectedAccount={filters.account}
            setAccount={setAccount}
            enableSelectAll
          />
        </div>
      </div>
      <div className="chartContainer">
        <LineChart
          width="auto"
          height="auto"
          data={data}
          xAxisLabel={`Date (${filters.date.year})`}
          yAxisLabel={`Amount (${currency})`}
        />
      </div>
    </div>
  );
};

ActivityStatistics.propTypes = {
  /** The data to be displayed in the chart
   * (refer to utils/graphUtils.js) */
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
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
};

export default ActivityStatistics;
