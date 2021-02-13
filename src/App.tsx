import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { loadingLight } from './assets/images';
import Toast from './components/alerts/Toast';
import Introduction from './components/introduction/Introduction';
import Navbar from './components/Navbar';
import PageContainer from './components/PageContainer';
import { getAccounts } from './redux/actions/accounts';
import { getSettings } from './redux/actions/settings';
import { getSubscriptions } from './redux/actions/subscriptions';
import { getTransactions } from './redux/actions/transactions';
import { setDataIsLoaded } from './redux/actions/ui';
import getTheme from './themes';
import { ReduxState } from './types';
import './App.global.css';

// Fetch data from the database
async function loadData(dispatch: ThunkDispatch<ReduxState, void, Action>) {
  await dispatch(getSettings());
  await dispatch(getAccounts());
  await dispatch(getTransactions());
  await dispatch(getSubscriptions());
  await dispatch(setDataIsLoaded());
}

function Main() {
  const dispatch = useDispatch();
  const appTheme = useSelector((state: ReduxState) => state.settings.appTheme);
  const dataIsLoaded = useSelector((state: ReduxState) => state.dataIsLoaded);
  const firstTimeUser = useSelector(
    (state: ReduxState) => state.settings.firstTimeUser
  );

  React.useEffect(() => {
    loadData(dispatch);
  }, [dataIsLoaded, dispatch]);

  return (
    <ThemeProvider theme={getTheme(appTheme)}>
      {!dataIsLoaded && (
        <div className="App">
          <img src={loadingLight} alt="loading" width="100px" />
        </div>
      )}
      {dataIsLoaded && firstTimeUser && <Introduction />}
      {dataIsLoaded && !firstTimeUser && (
        <div className="App">
          <Navbar />
          <PageContainer />
          <Toast />
        </div>
      )}
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
