import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import ButtonReuse from '../ButtonReuse';

const ConfirmDialog = (props) => {
  const {
    cb,
    open = false,
    descriptionDialog,
    titleBtnFalse = 'Cancel',
    titleBtnTrue = 'Yes',
    titleDialog = 'Are You Sure ?',
    maxWidth = 'xs',
  } = props;

  const handleClickDialog = (flag = 1) => {
    cb(flag);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClickDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={maxWidth}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
        {descriptionDialog && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {descriptionDialog}
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <ButtonReuse onClick={() => handleClickDialog(0)}>
            {titleBtnFalse}
          </ButtonReuse>
          <ButtonReuse
            onClick={handleClickDialog}
            autoFocus
            style={{ marginRight: 0 }}
          >
            {titleBtnTrue}
          </ButtonReuse>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
