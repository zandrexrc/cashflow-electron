import React from 'react';

import {IconButton, Paper, Slide, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import {Account} from '../../types';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50%)',
    'height': '100vh',
    'minWidth': '500px',
    'maxHeight': '100vh',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'position': 'absolute',
    'right': '0',
    'overflow': 'auto',
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .details': {
      'width': 'calc(100% - 80px)',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'alignItems': 'flex-start',
      'margin': '0 auto',
      '& .pos': {
        color: theme.palette.success.main,
      },
      '& .neg': {
        color: theme.palette.error.main,
      },
      '& .MuiTypography-body1': {
        margin: '20px 0',
        padding: '5px 10px',
        border: `1px solid ${theme.palette.text.secondary}`,
        textTransform: 'uppercase',
      },
      '& .MuiTypography-h5': {
        minHeight: '1.4em',
        maxHeight: '50%',
        margin: '10px 0',
        overflow: 'auto',
      },
      '& .MuiTypography-h3': {
        fontWeight: 'bold',
      },
    },
  },
}));


interface IProps {
  account: Account | null | undefined;
  close: () => void;
  currency: string;
  deleteItem: () => void;
  isOpen: boolean;
  openFormTab: () => void;
};


const AccountDetails = ({
  account,
  close,
  currency,
  deleteItem,
  isOpen,
  openFormTab,
}: IProps) => {
  const classes = useStyles();

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Paper className={classes.root} square elevation={10}>
        <div className="header">
          <IconButton onClick={close}>
            <ChevronLeftIcon />
          </IconButton>
          <div className="actions">
            <IconButton onClick={openFormTab}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={deleteItem}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        {
          account &&
          <div className="details">
            <Typography variant="body1" align="right" color="textSecondary">
              {account.type}
            </Typography>
            <Typography variant="h5">
              {account.name}
            </Typography>
            <Typography
              variant="h3"
              className={account.balance < 0 ? 'neg' : 'pos'}
            >
              {
                account.balance < 0 ?
                `- ${currency}
                  ${Math.abs(account.balance).toFixed(2)}` :
                `${currency} ${account.balance.toFixed(2)}`
              }
            </Typography>
          </div>
        }
      </Paper>
    </Slide>
  );
};

AccountDetails.propTypes = {
  /** The Account to be displayed */
  account: PropTypes.object,
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function called when deleting the Account */
  deleteItem: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to open the corresponding Form for editing the Account */
  openFormTab: PropTypes.func.isRequired,
};

export {AccountDetails};
