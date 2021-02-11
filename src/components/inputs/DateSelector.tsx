import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {isValid, format} from 'date-fns';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {DATE_FORMAT_ISO} from '../../constants';
import {ReduxState} from '../../types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';


interface IProps {
  selectedDate: string;
  setDate: (d: string) => void;
};


const DateSelector = ({selectedDate, setDate}: IProps) => {
  const dateFormat = useSelector((state: ReduxState) => state.settings.dateFormat);
  // const currentDate = format(new Date(), DATE_FORMAT_ISO);
  const datePickerValue = new Date(selectedDate);

  const onChangeHandler = (date: MaterialUiPickersDate) => {
    const dateString = format(date as Date, DATE_FORMAT_ISO);
    setDate(dateString);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format={dateFormat}
        margin="normal"
        id="date-picker-inline"
        label="Date"
        value={datePickerValue}
        onChange={onChangeHandler}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        error={!isValid(new Date(selectedDate))}
      />
    </MuiPickersUtilsProvider>
  );
};

DateSelector.propTypes = {
  /** The selected date (as string) */
  selectedDate: PropTypes.string.isRequired,
  /** Function to change the selected date */
  setDate: PropTypes.func.isRequired,
};

export {DateSelector};
