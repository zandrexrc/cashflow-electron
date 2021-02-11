import React from 'react';

import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from 'react-redux';

import {hideToast} from '../../redux/actions/ui';
import {ReduxState} from '../../types';


const Alert = (props: any) => {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
};


const Toast = () => {
  const dispatch = useDispatch();
  const toastState = useSelector((state: ReduxState) => state.toastState);

  const closeToast = () => dispatch(hideToast());

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={toastState.isOpen}
      autoHideDuration={6000}
      onClose={closeToast}
    >
      <Alert onClose={closeToast} severity={toastState.severity}>
        {toastState.message}
      </Alert>
    </Snackbar>
  );
};

export {Toast};
