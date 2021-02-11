import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {loadingLight, loadingDark} from '../assets/images';
import {Accounts} from '../pages/Accounts';
import {ErrorPage} from '../pages/ErrorPage';
import {Overview} from '../pages/Overview';
import {Settings} from '../pages/Settings';
import {Statistics} from '../pages/Statistics';
import {Subscriptions} from '../pages/Subscriptions';
import {Transactions} from '../pages/Transactions';
import {setActivePage} from '../redux/actions/ui';
import {ReduxState} from '../types';


const useStyles = makeStyles((theme) => ({
  root: {
    'position': 'relative',
    'display': 'flex',
    'flexFlow': 'row wrap',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': 'calc(100% - 200px)',
    'height': '100vh',
    'backgroundColor': theme.palette.background.default,
    '& .loading': {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      zIndex: '99',
    },
  }
}));


interface ITabProps {
  children: any;
  id: number;
  activeId: number;
}

const Tab = ({children, id, activeId}: ITabProps) => {
  return (
    <div style={{width: '100%'}} hidden={id !== activeId}>
      {
        id === activeId &&
        children
      }
    </div>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
  activeId: PropTypes.number.isRequired,
};


const PageContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  let activePage = useSelector((state: ReduxState) => state.activePage);
  const error = useSelector((state: ReduxState) => state.error);
  const isFetching = useSelector((state: ReduxState) => state.isFetching);

  React.useEffect(() => {
    if (error) {
      dispatch(setActivePage(-1));
    }
  }, [error]);

  return (
    <div className={classes.root}>
      {
        isFetching &&
        <div className="loading">
          <img
            src={theme.palette.type === 'light' ? loadingLight : loadingDark }
            alt="loading"
            width="100px"
          />
        </div>
      }
      <Tab id={0} activeId={activePage}>
        <Overview />
      </Tab>
      <Tab id={1} activeId={activePage}>
        <Transactions />
      </Tab>
      <Tab id={2} activeId={activePage}>
        <Subscriptions />
      </Tab>
      <Tab id={3} activeId={activePage}>
        <Accounts />
      </Tab>
      <Tab id={4} activeId={activePage}>
        <Statistics />
      </Tab>
      <Tab id={5} activeId={activePage}>
        <Settings />
      </Tab>
      <Tab id={-1} activeId={activePage}>
        <ErrorPage error={error} />
      </Tab>
    </div>
  );
};

export {PageContainer};
