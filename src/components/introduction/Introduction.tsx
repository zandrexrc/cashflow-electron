import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

import {AccountForm} from './AccountForm';
import {Offboarding} from './Offboarding';
import {Onboarding} from './Onboarding';
import {SettingsForm} from './SettingsForm';
import {ReduxState} from '../../types';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));


const Introduction = () => {
  const classes = useStyles();
  const settings = useSelector((state: ReduxState) => state.settings);

  const [currency, setCurrency] = React.useState(settings.currency);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className={classes.root}>
      {
        activeIndex === 0 &&
        <Onboarding next={() => setActiveIndex(1)} />
      }
      {
        activeIndex === 1 &&
        <SettingsForm
          currency={currency}
          setCurrency={setCurrency}
          next={() => setActiveIndex(2)}
        />
      }
      {
        activeIndex === 2 &&
        <AccountForm
          currency={currency}
          next={() => setActiveIndex(3)}
        />
      }
      {
        activeIndex === 3 &&
        <Offboarding
          settings={{
            currency: currency,
            dateFormat: settings.dateFormat,
            appTheme: settings.appTheme,
          }}
        />
      }
    </div>
  );
};

export {Introduction};
