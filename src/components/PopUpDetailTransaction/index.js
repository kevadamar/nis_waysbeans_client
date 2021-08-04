import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { changeFormatDate, formatNumberToIDR } from '../../Helpers';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';
import { popUpStyles } from './_PopUpStyles';

const inlineCss = {
  display: 'flex',
  maxHeight: '55vh',
  flexDirection: 'column',
  overflow: 'auto',
};

function PopUpDetailTransaction({ show, handleClose, order_id }) {
  const classes = globalStyles();
  const localClasses = popUpStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [formatedDate, setFormatedDate] = useState({
    dayName: '',
    formatDate: '',
  });

  const fetchData = async ({ order_id }) => {
    setIsLoading(true);
    const response = await services.getDetailTransaction({ order_id });
    setFormatedDate({ ...changeFormatDate(response.createdAt) });
    setData(response);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData({ order_id });
    return () => {
      setData('');
      setIsLoading(false);
      setFormatedDate({
        dayName: '',
        formatDate: '',
      });
    };
  }, [order_id]);

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h5" component="span">
          <Box fontWeight="bold" color="#613D2B" textAlign="center">
            Detail Transaction
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent className={localClasses.contentSize}>
        <Divider className={classes.identityBackgroundColor} color="#613D2B" />
        {isLoading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex">
            <Box
              style={{ ...inlineCss }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              flexGrow={1}
            >
              {data?.products?.map((product, idx) => (
                <Box key={idx} p={1}>
                  <Box
                    display="flex"
                    p={1}
                    className={localClasses.contentCard}
                    justifyContent="space-between"
                  >
                    <Box display="flex">
                      <img alt={product.name} src={product.photo} width={80} />
                      <Box display="flex" flexDirection="column">
                        <Typography variant="h6">
                          <Box
                            pl={2}
                            className={classes.identityColor}
                            fontWeight="bold"
                          >
                            {product.name}
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box display="flex">
                            <Box
                              pl={2}
                              fontWeight="bold"
                              className={classes.identityColor}
                            >
                              {formatedDate.dayName}
                            </Box>
                            <Box className={classes.identityColor}>
                              , {formatedDate.formatDate}
                            </Box>
                          </Box>
                        </Typography>

                        <Typography variant="body2">
                          <Box className={classes.identityColor} pl={2} pt={1}>
                            Price : Rp.{formatNumberToIDR(product.price)}
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box className={classes.identityColor} pl={2}>
                            Qty : {product.orderQuantity}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      justifyContent="flex-end"
                    >
                      <Typography component="span">SubTotal</Typography>
                      <Typography component="span">
                        <Box fontWeight="bold">
                          Rp.
                          {formatNumberToIDR(
                            product.price * product.orderQuantity,
                          )}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box flexGrow={1} p={1}>
              <Box
                p={1}
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                className={localClasses.contentCard}
              >
                <Typography component="span">
                  <Box>Total Price</Box>
                </Typography>
                <Typography component="span">
                  {data && (
                    <Box fontWeight="bold">
                      Rp.{formatNumberToIDR(data.totalPrice)}
                    </Box>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PopUpDetailTransaction;
