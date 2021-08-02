import {
  IconButton,
  InputAdornment,
  TextField,
  withStyles,
} from '@material-ui/core';
import { AttachFile, Visibility, VisibilityOff } from '@material-ui/icons';

import React, { forwardRef } from 'react';

const InputReuseComp = (props, ref) => {
  const { handleClicked,onFileChanged, showPassword, ...others } = props;

  if (others.id === 'password') {
    return (
      <TextField
        inputRef={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClicked}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...others}
      />
    );
  } 
  else if (others.id === 'attacheOfTansaction') {
    return (
      <>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => onFileChanged(e)}
        />
        <TextField
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Upload Attachment" edge="end">
                  <label
                    htmlFor="contained-button-file"
                    style={{ cursor: 'pointer', paddingTop: '4px' }}
                  >
                    <AttachFile />
                  </label>
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...others}
        />
      </>
    );
  } 
  else {
    return <TextField inputRef={ref} {...others} />;
  }
};

const InputReuse = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(97, 61, 43, 0.25)',
    borderRadius: '5px',
    '& label.Mui-focused': {
      color: '#613D2B',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #613D2B',
      },
      '&:hover fieldset': {
        border: '2px solid #974A4A',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #613D2B',
      },
    },
  },
}))(forwardRef(InputReuseComp));

export default InputReuse;
