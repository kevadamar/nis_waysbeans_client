import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { formatNumberToIDR } from '../../Helpers';
import { globalStyles } from '../../styles/globalStyles';

const inlineCss = {
  display: 'flex',
  maxHeight: '49vh',
  flexDirection: 'column',
  overflow: 'auto',
};

function PopUpDetailTransaction({ show, handleClose, data }) {
  const classes = globalStyles();

  

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h5" component="h2">
          <Box fontWeight="bold" color="#613D2B">
            Detail Transaction
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Divider className={classes.identityBackgroundColor} color="#613D2B" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} style={{ ...inlineCss }}>
            {data.detailCarts.map((myCart, index) => (
              <Box key={index} flexGrow={1}>
                {index === 0 && (
                  <Divider
                    className={classes.identityBackgroundColor}
                    color="#613D2B"
                  />
                )}
                <Box p={2} display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <img
                      alt={myCart.name}
                      src={myCart.photo}
                      width={80}
                      height={80}
                      style={{ cursor: 'pointer' }}
                      onClick={
                        () => null
                        // router.push(`/product/${myCart.product_id}`)
                      }
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography variant="h6">
                        <Box pl={2}>{myCart.name}</Box>
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    <Typography className={classes.identityColor}>
                      Rp.{formatNumberToIDR(myCart.total_price)}
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  className={classes.identityBackgroundColor}
                  color="#613D2B"
                />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Divider
                className={classes.identityBackgroundColor}
                color="#613D2B"
              />
              <Box p={2}>
                <Box justifyContent="space-between" display="flex" pb={2}>
                  <Typography className={classes.identityColor}>
                    Subtotal
                  </Typography>
                  <Typography className={classes.identityColor}>
                    {formatNumberToIDR(250000)}
                  </Typography>
                </Box>
                <Box justifyContent="space-between" display="flex">
                  <Typography className={classes.identityColor}>Qty</Typography>
                  <Typography className={classes.identityColor}>5</Typography>
                </Box>
              </Box>
              <Divider
                className={classes.identityBackgroundColor}
                color="#613D2B"
              />
              <Box p={2}>
                <Box justifyContent="space-between" display="flex" pb={2}>
                  <Typography className={classes.identityColor}>
                    <Box fontWeight="bold">Total</Box>
                  </Typography>
                  <Typography className={classes.identityColor}>
                    <Box fontWeight="bold">{formatNumberToIDR(250000)}</Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default PopUpDetailTransaction;
