import { Box, IconButton, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import { cartStyles } from '../_cartStyles';

export default function PlusMinCart({
  addHandle,
  minHandle,
  product_id,
  qty,
  stock,
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
        disabled={stock === 0}
      >
        <Remove />
      </IconButton>
      <Box
        className={
          (classes.identityColor,
          stock === 0 ? localClasses.qtyZero : localClasses.qty)
        }
      >
        {qty}
      </Box>
      <IconButton
        aria-label="add quantity"
        onClick={() => addHandle(product_id)}
        className={classes.identityColor}
        disabled={stock === 0}
      >
        <Add />
      </IconButton>
      {stock === 0 && <Typography>Stock Product 0</Typography>}
    </Box>
  );
}
