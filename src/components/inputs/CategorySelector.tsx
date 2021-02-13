import React from 'react';

import { Popper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getCategories } from '../../utils';
import { ReduxState } from '../../types';

interface IProps {
  enableSelectAll: boolean | undefined;
  selectedCategory: string;
  setCategory: (category: string) => void;
  showUncategorized: boolean | undefined;
  type: string;
}

const CategorySelector = ({
  enableSelectAll,
  selectedCategory,
  setCategory,
  showUncategorized,
  type,
}: IProps) => {
  const subscriptions = useSelector((state: ReduxState) => state.subscriptions);
  const transactions = useSelector((state: ReduxState) => state.transactions);
  const categories =
    type === 'subscriptions'
      ? getCategories(subscriptions)
      : getCategories(transactions);
  categories.sort();

  if (showUncategorized) {
    categories.unshift('Uncategorized');
  }

  if (enableSelectAll) {
    categories.unshift('All');
  }

  return (
    <Autocomplete
      disableClearable
      freeSolo
      forcePopupIcon
      selectOnFocus
      options={categories}
      value={selectedCategory}
      onChange={(_event, value) => setCategory(value)}
      renderInput={(params) => <TextField label="Category" {...params} />}
      PopperComponent={(props) => (
        <Popper
          {...props}
          style={{ width: 'fit-content' }}
          placement="bottom-start"
        />
      )}
      style={{ minWidth: '40%' }}
    />
  );
};

CategorySelector.propTypes = {
  /** If true, the option to select all categories is enabled */
  enableSelectAll: PropTypes.bool,
  /** The selected category */
  selectedCategory: PropTypes.string.isRequired,
  /** Function to change the selected category */
  setCategory: PropTypes.func.isRequired,
  /** If true, the option to select items without a category is enabled */
  showUncategorized: PropTypes.bool,
  /** The objects to get categories from ('transactions' | 'subscriptions') */
  type: PropTypes.string.isRequired,
};

CategorySelector.defaultProps = {
  enableSelectAll: false,
  showUncategorized: false,
};

export default CategorySelector;
