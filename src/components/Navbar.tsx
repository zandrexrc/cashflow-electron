import React from 'react';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from '../constants';
import { setActivePage } from '../redux/actions/ui';
import { ReduxState } from '../types';
import { cashflowWhite } from '../assets/images';

// Set up navigation icons
const navIcons: { [key: string]: React.ReactElement<SvgIconProps> } = {
  Overview: <AssignmentIcon />,
  Transactions: <CreditCardIcon />,
  Subscriptions: <DateRangeIcon />,
  Accounts: <AccountBalanceIcon />,
  Statistics: <TimelineIcon />,
  Settings: <SettingsIcon />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    '& .logoWrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '200px',
      padding: '16px 0',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    '& .logoText': {
      marginLeft: '5px',
    },
    '& .creds': {
      position: 'absolute',
      left: -1,
      bottom: 0,
      padding: '5px 10px',
      borderRadius: '0 5px 0 0',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out',
    },
    '& .creds:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activePage = useSelector((state: ReduxState) => state.activePage);

  return (
    <Drawer className={classes.root} anchor="left" variant="permanent">
      <Typography className="logoWrapper" variant="h6">
        <img src={cashflowWhite} width="24px" alt="cashflow-logo" />
        <span className="logoText">Cashflow</span>
      </Typography>
      <List>
        {Navigation.map((nav) => (
          <ListItem
            button
            key={nav.id}
            onClick={() => dispatch(setActivePage(nav.id))}
            selected={activePage === nav.id}
          >
            <ListItemIcon>{navIcons[nav.name]}</ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItem>
        ))}
      </List>
      <a
        href="http://zandrexrc.me"
        target="_blank"
        rel="noreferrer"
        className="creds"
      >
        ©
      </a>
    </Drawer>
  );
};

export default Navbar;
