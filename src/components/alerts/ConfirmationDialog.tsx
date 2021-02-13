import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

interface IProps {
  cancel: () => void;
  confirm: () => void;
  isOpen: boolean;
  message: string;
  title: string;
}

const ConfirmationDialog = ({
  cancel,
  confirm,
  isOpen,
  message,
  title,
}: IProps) => {
  return (
    <Dialog open={isOpen} onClose={cancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={confirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  /** Function to cancel/close the dialog */
  cancel: PropTypes.func.isRequired,
  /** Function called when clicking on the 'confirm' button */
  confirm: PropTypes.func.isRequired,
  /** If true, the dialog is open/visible */
  isOpen: PropTypes.bool.isRequired,
  /** The message displayed in the body of the dialog */
  message: PropTypes.string.isRequired,
  /** The text displayed at the top of the dialog */
  title: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
