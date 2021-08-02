import { Box, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import { cartStyles } from '../_cartStyles';

export default function PlusMinCart({
  addHandle,
  minHandle,
  isDisabledAdd,
  product_id,
  qty,
}) {
  const classes = globalStyles();
  const localClasses = cartStyles();
  return (
    <Box
      pl={2}
      className={classes.identityColor}
      display="flex"
      alignItems="center"
    >
      <IconButton
        aria-label="minus quantity"
        onClick={() => minHandle(product_id)}
        className={classes.identityColor}
      >
        <Remove />
      </IconButton>
      <Box className={(classes.identityColor, localClasses.qty)}>{qty}</Box>
      <IconButton
        aria-label="add quantity"
        onClick={() => addHandle(product_id)}
        className={classes.identityColor}
      >
        <Add />
      </IconButton>
    </Box>
  );
}
