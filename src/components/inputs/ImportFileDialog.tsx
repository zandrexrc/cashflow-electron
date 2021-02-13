import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .list': {
      fontSize: '0.8em',
      color: theme.palette.text.primary,
    },
    '& .inputButton': {
      marginRight: '10px',
    },
  },
}));

interface IProps {
  cancel: () => void;
  importData: (file: File) => void;
  isOpen: boolean;
  sampleFile: string;
}

const ImportFileDialog = ({
  cancel,
  importData,
  isOpen,
  sampleFile,
}: IProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState<{ uploadedFile: File | null }>({
    uploadedFile: null,
  });

  const closeDialog = () => {
    cancel();
    setState({ uploadedFile: null });
  };

  const chooseFile = () => {
    const el: HTMLElement = document.querySelector('#fileInput') as HTMLElement;
    if (el !== null) {
      el.click();
    }
  };

  const submitFile = () => {
    if (state.uploadedFile) {
      importData(state.uploadedFile);
      closeDialog();
    }
  };

  return (
    <Dialog className={classes.root} open={isOpen} onClose={closeDialog}>
      <DialogTitle>Import data from file</DialogTitle>
      <DialogContent>
        <DialogContentText>
          1. Download this&nbsp;
          <Link href={sampleFile} download="sample.csv">
            sample file
          </Link>
          &nbsp;and use it as a template.
        </DialogContentText>
        <ul className="list">
          <li>The first row is the header row, DO NOT delete it!</li>
          <li>Dates must follow the ISO format: YYYY-MM-DD</li>
          <li>Amount and balance must be numerical values</li>
          <li>
            A subscription cycle must be either <i>monthly</i> or <i>yearly</i>
          </li>
          <li>All fields except for category are required</li>
        </ul>
        <DialogContentText>2. Upload your file.</DialogContentText>
        <ul className="list">
          <li>The file must be a valid csv file</li>
          <li>Please DO NOT upload a large file to avoid crashing the app!</li>
          <li>Kindly limit the file to a maximum of 100 rows.</li>
        </ul>
        <input
          id="fileInput"
          type="file"
          accept=".csv"
          hidden
          onChange={(event) =>
            setState({
              uploadedFile: event.target.files ? event.target.files[0] : null,
            })
          }
        />
      </DialogContent>
      <DialogContent>
        <Button
          className="inputButton"
          variant="contained"
          size="small"
          color="primary"
          disableElevation
          onClick={chooseFile}
        >
          Choose a file
        </Button>
        <span>
          {state.uploadedFile ? state.uploadedFile.name : 'No file selected.'}
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={submitFile} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ImportFileDialog.propTypes = {
  /** Function to close the component */
  cancel: PropTypes.func.isRequired,
  /** Function to process the uploaded file */
  importData: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** A CSV file that can be downloaded and used as template */
  sampleFile: PropTypes.string.isRequired,
};

export default ImportFileDialog;
