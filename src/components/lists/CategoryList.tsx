import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

import { calcCategoryAmounts } from '../../utils';
import { Transaction } from '../../types';

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

interface Category {
  label: string;
  amount: number;
}

interface IRowProps {
  data: {
    items: Category[];
    currency: string;
  };
  index: number;
  style: React.CSSProperties;
}

interface IListProps {
  currency: string;
  transactions: Transaction[];
}

const renderRow = ({ data, index, style }: IRowProps) => {
  const category = data.items[index];

  return (
    <div className="listItem" key={index} style={style}>
      <Typography className="listItemText" variant="body1">
        {category.label}
      </Typography>
      <Typography
        className={category.amount < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {category.amount < 0
          ? `- ${data.currency} ${Math.abs(category.amount).toFixed(2)}`
          : `${data.currency} ${category.amount.toFixed(2)}`}
      </Typography>
    </div>
  );
};

const CategoryList = ({ currency, transactions }: IListProps) => {
  const classes = useStyles();
  const categories: Category[] = [];
  const categoryAmounts = calcCategoryAmounts(transactions);
  const categoryNames = Object.keys(categoryAmounts);
  for (let i = 0; i < categoryNames.length; i++) {
    categories.push({
      label: categoryNames[i],
      amount: categoryAmounts[categoryNames[i]],
    });
  }
  categories.sort((a, b) => a.amount - b.amount);

  return (
    <div className={classes.root}>
      {categories.length === 0 ? (
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
          itemCount={categories.length}
          itemData={{
            items: categories,
            currency,
          }}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </div>
  );
};

CategoryList.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** An array of Transactions */
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryList;
