import React from 'react';

import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreVert from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

import { Account } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(50% - 1px)',
    height: '100vh',
    minWidth: '500px',
    display: 'flex',
    flexFlow: 'column nowrap',
    backgroundColor: theme.palette.background.paper,
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .emptyList': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 'calc(100vh - 64px)',
    },
    '& .list': {
      width: '100%',
      maxHeight: 'calc(100vh - 64px)',
      overflow: 'auto',
      padding: '0',
      margin: '0',
      color: theme.palette.text.primary,
    },
    '& .listItem': {
      minHeight: '69px',
      maxHeight: '69px',
      maxWidth: 'calc(100% - 40px)',
      padding: '0 20px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`,
      cursor: 'pointer',
      transition: 'all 0.1s ease-in-out',
    },
    '& .listItem:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .listItem:focus': {
      outline: 'none',
      backgroundColor: theme.palette.action.focus,
    },
    '& .listItemDate': {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      paddingRight: '20px',
    },
    '& .listItemText': {
      width: '60%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .MuiTypography-h5': {
      marginTop: '-10px',
    },
    '& .pos': {
      color: theme.palette.success.main,
      width: '40%',
    },
    '& .neg': {
      width: '40%',
    },
  },
}));

interface IRowProps {
  data: {
    items: Account[];
    currency: string;
    openDetailsTab: (a: Account) => void;
  };
  index: number;
  style: React.CSSProperties;
}

interface IListProps {
  currency: string;
  exportData: () => void;
  items: Account[];
  openDetailsTab: (a: Account) => void;
  openFormTab: () => void;
  openImportFileDialog: () => void;
}

const renderRow = ({ data, index, style }: IRowProps) => {
  const account = data.items[index];

  return (
    <div
      className="listItem"
      key={index}
      style={style}
      role="button"
      tabIndex={0}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          data.openDetailsTab(account);
        }
      }}
      onClick={() => data.openDetailsTab(account)}
    >
      <Typography className="listItemText" variant="body1">
        {account.name}
      </Typography>
      <Typography
        className={account.balance < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {account.balance < 0
          ? `- ${data.currency} ${Math.abs(account.balance).toFixed(2)}`
          : `${data.currency} ${account.balance.toFixed(2)}`}
      </Typography>
    </div>
  );
};

const AccountList = ({
  currency,
  exportData,
  items,
  openDetailsTab,
  openFormTab,
  openImportFileDialog,
}: IListProps) => {
  const classes = useStyles();

  // Display search matches
  const [displayedItems, setDisplayedItems] = React.useState(items);

  React.useEffect(() => {
    setDisplayedItems(items);
  }, [items, setDisplayedItems]);

  const search = (term: string) => {
    const filter = new RegExp(term, 'i');
    setDisplayedItems(
      items.filter((item: Account) => item.name && filter.test(item.name))
    );
  };

  // Dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(null);

  const showMenu = (event: React.MouseEvent) =>
    setMenuAnchorEl(event.currentTarget);

  const hideMenu = () => setMenuAnchorEl(null);

  return (
    <div className={classes.root}>
      {openFormTab && (
        <div className="header">
          <TextField
            type="search"
            margin="normal"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => search(event.target.value)}
          />
          <div className="buttons">
            <IconButton onClick={openFormTab}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={showMenu}>
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={hideMenu}
            >
              <MenuItem onClick={openImportFileDialog}>
                <PublishIcon fontSize="small" />
                <span style={{ marginLeft: '10px' }}>Import from CSV</span>
              </MenuItem>
              <MenuItem onClick={exportData}>
                <GetAppIcon fontSize="small" />
                <span style={{ marginLeft: '10px' }}>Download as CSV</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}
      {displayedItems.length === 0 ? (
        <div className="emptyList">
          <Typography variant="h6" color="textSecondary">
            No records to display.
          </Typography>
        </div>
      ) : (
        <FixedSizeList
          className="list"
          height={window.innerHeight - 64}
          width="100%"
          itemSize={70}
          itemCount={displayedItems.length}
          itemData={{
            items: displayedItems,
            currency,
            openDetailsTab,
          }}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </div>
  );
};

AccountList.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to export the list into a CSV file */
  exportData: PropTypes.func.isRequired,
  /** An array of Accounts|Subscriptions|Transactions */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Function to open the Details component for the selected item */
  openDetailsTab: PropTypes.func.isRequired,
  /** Function to open the Form component */
  openFormTab: PropTypes.func.isRequired,
  /** Function to open the component for uploading a file */
  openImportFileDialog: PropTypes.func.isRequired,
};

export default AccountList;
