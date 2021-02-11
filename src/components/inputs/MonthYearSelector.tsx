import React from 'react';

import {FormControl, Select, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {MonthNames} from '../../constants';
import {getTransactionYears} from '../../utils';
import {ReduxState} from '../../types';


const useStyles = makeStyles({
  root: {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'marginTop': '20px',
    '& .MuiFormControl-root': {
      margin: '0 5px 20px 5px',
    },
  },
});


interface IProps {
  enableSelectAll: boolean | null;
  selectedDate: {month: number, year:number};
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
}


const MonthYearSelector = ({
  enableSelectAll,
  selectedDate,
  setMonth,
  setYear,
}: IProps) => {
  const transactions = useSelector((state: ReduxState) => state.transactions);
  const transactionYears = getTransactionYears(transactions);
  const currentYear = new Date().getFullYear();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl>
        <Select
          labelId="month-filter-label"
          id="month-filter"
          value={selectedDate.month}
          onChange={(event) => setMonth(event.target.value as number)}
        >
          {
            enableSelectAll &&
            <MenuItem value={-1}>All-year</MenuItem>
          }
          {
            MonthNames.map((month, index) => (
              <MenuItem key={index} value={index}>{month}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl>
        <Select
          labelId="year-filter-label"
          id="year-filter"
          value={selectedDate.year}
          onChange={(event) => setYear(event.target.value as number)}
        >
          {
            !transactionYears.includes(currentYear) &&
            <MenuItem value={currentYear}>
              {currentYear}
            </MenuItem>
          }
          {transactionYears.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

MonthYearSelector.propTypes = {
  /** If true, the option to select all months is enabled */
  enableSelectAll: PropTypes.bool,
  /** An object with the following structure:
   * {
   *  month: (number, 0-12),
   *  year: (number)
   * }
   */
  selectedDate: PropTypes.object.isRequired,
  /** Function to change the selected month */
  setMonth: PropTypes.func.isRequired,
  /** Function to change the selected year */
  setYear: PropTypes.func.isRequired,
};

export {MonthYearSelector};
