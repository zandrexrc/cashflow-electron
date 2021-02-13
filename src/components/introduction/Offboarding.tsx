import React from 'react';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { editSettings } from '../../redux/actions/settings';
import { Settings } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    '& .icon': {
      color: theme.palette.primary.main,
      fontSize: '5em',
      marginBottom: '20px',
    },
    '& .button': {
      marginTop: '20px',
    },
  },
}));

interface IProps {
  settings: Settings;
}

const Offboarding = ({ settings }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const saveChanges = () => {
    dispatch(editSettings(settings));
  };

  return (
    <div className={classes.root}>
      <CheckCircleIcon className="icon" />
      <Typography variant="h3" color="primary" gutterBottom>
        You're all set!
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        Go on and explore the app. <br />
        We hope you'll enjoy Cashflow!
      </Typography>
      <Button
        className="button"
        variant="contained"
        color="primary"
        disableElevation
        onClick={saveChanges}
      >
        OK
      </Button>
    </div>
  );
};

Offboarding.propTypes = {
  /** An object with the following structure:
   * {
   *  currency: (string),
   *  dateFormat: (string),
   *  appTheme: (string: 'dark' | 'light')
   * }
   */
  settings: PropTypes.shape({
    currency: PropTypes.string,
    dateFormat: PropTypes.string,
    appTheme: PropTypes.string,
  }).isRequired,
};

export default Offboarding;
