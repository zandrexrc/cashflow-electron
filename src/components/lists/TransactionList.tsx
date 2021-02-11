import React from 'react';

import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreVert from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import {FixedSizeList} from 'react-window';

import {DATE_FORMAT_SHORT_MONTH} from '../../constants';
import {printDate} from '../../utils';
import {Transaction} from '../../types';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50% - 1px)',
    'height': '100vh',
    'minWidth': '500px',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'backgroundColor': theme.palette.background.paper,
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
    items: Transaction[],
    currency: string,
    openDetailsTab: (t: Transaction) => void,
  };
  index: number;
  style: any;
};

interface IListProps {
  currency: string;
  exportData: () => void;
  items: Transaction[];
  openDetailsTab: (t: Transaction) => void;
  openFormTab: () => void;
  openImportFileDialog: () => void;
}


const renderRow = ({data, index, style}: IRowProps) => {
  const transaction = data.items[index];

  return (
    <div
      className="listItem"
      key={index}
      style={style}
      onClick={() => data.openDetailsTab(transaction)}
    >
      <div className="listItemDate">
        <Typography variant="overline">
          {printDate(transaction.date, DATE_FORMAT_SHORT_MONTH)}
        </Typography>
        <Typography variant="h5">
          {new Date(transaction.date).getDate()}
        </Typography>
      </div>
      <Typography
        className="listItemText"
        variant="body1"
      >
        {transaction.description}
      </Typography>
      <Typography
        className={transaction.amount < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {
          transaction.amount < 0 ?
          `- ${data.currency} ${Math.abs(transaction.amount).toFixed(2)}` :
          `${data.currency} ${transaction.amount.toFixed(2)}`
        }
      </Typography>
    </div>
  );
};


const TransactionList = ({
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
    setDisplayedItems(items.filter((item: Transaction) =>
      item.description && filter.test(item.description)
    ));
  };

  // Dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(null);

  const showMenu = (event: any) =>
    setMenuAnchorEl(event.currentTarget);

  const hideMenu = () =>
    setMenuAnchorEl(null);

  return (
    <div className={classes.root}>
      {
        openFormTab &&
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
                <span style={{marginLeft: '10px'}}>Import from CSV</span>
              </MenuItem>
              <MenuItem onClick={exportData}>
                <GetAppIcon fontSize="small" />
                <span style={{marginLeft: '10px'}}>Download as CSV</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      }
      {
        displayedItems.length === 0 ?
        <div className="emptyList">
          <Typography variant="h6" color="textSecondary">
            No records to display.
          </Typography>
        </div> :
        <FixedSizeList
          className="list"
          height={window.innerHeight - 64}
          width='100%'
          itemSize={70}
          itemCount={displayedItems.length}
          itemData={{
            items: displayedItems,
            currency: currency,
            openDetailsTab: openDetailsTab,
          }}
        >
          {renderRow}
        </FixedSizeList>
      }
    </div>
  );
};

TransactionList.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to export the list into a CSV file */
  exportData: PropTypes.func,
  /** An array of Accounts|Subscriptions|Transactions */
  items: PropTypes.array.isRequired,
  /** Function to open the Details component for the selected item */
  openDetailsTab: PropTypes.func,
  /** Function to open the Form component */
  openFormTab: PropTypes.func,
  /** Function to open the component for uploading a file */
  openImportFileDialog: PropTypes.func,
};

export {TransactionList};
