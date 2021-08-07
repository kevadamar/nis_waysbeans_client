import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Slide,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Add, AddShoppingCart, Delete, Remove } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import ButtonReuse from '../../components/ButtonReuse';
import { UserContext } from '../../contexts/UserContext';
import { SET_CART } from '../../contexts/UserContext/action';
import { formatNumberToIDR } from '../../Helpers';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';
import PlusMinCart from './utils/plusMinCart';
import { cartStyles } from './_cartStyles';

const inlineCss = {
  display: 'flex',
  maxHeight: '49vh',
  flexDirection: 'column',
  overflow: 'auto',
};

function Cart() {
  const classes = globalStyles();
  const localClasses = cartStyles();

  const router = useHistory();

  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [disabledBtn, setDisabledBtn] = useState(false);

  const { isLoading, isError, refetch, data, isSuccess } = useQuery(
    ['carts'],
    () => services.getDetailCart(),
  );

  const addCartMutation = useMutation(services.addCart, {
    onSuccess: async (res) => {
      if (res.status === -1) {
        setShowSnackbar(true);
        setErrMsg(res.message);
      } else {
        const data = await services.countCart();
        dispatchUser({ type: SET_CART, payload: data });
        refetch();
      }
    },
    onError: (error) => {
      setShowSnackbar(true);
      setErrMsg(error);
      console.log('error', error);
    },
  });

  const minCartMutation = useMutation(services.minCart, {
    onSuccess: async (res) => {
      const data = await services.countCart();
      dispatchUser({ type: SET_CART, payload: data });

      refetch();
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const deletCartMutation = useMutation(services.deleteCart, {
    onSuccess: async (res) => {
      const data = await services.countCart();
      dispatchUser({ type: SET_CART, payload: data });
      refetch();
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4">
        <Box fontWeight="bold" className={classes.identityColor} mb={5}>
          My Cart
        </Box>
      </Typography>

      {isSuccess && data?.totalPrice > 0 && (
        <Typography variant="body1">
          <Box className={classes.identityColor} mb={1}>
            Review Your Order
          </Box>
        </Typography>
      )}

      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {isSuccess && data?.totalPrice > 0 && (
        <>
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
                        onClick={() => {
                          if (myCart.stock === 0) {
                            return null;
                          } else {
                            router.push(`/product/${myCart.product_id}`);
                          }
                        }}
                      />
                      <Box display="flex" flexDirection="column">
                        <Typography variant="h6">
                          <Box pl={2}>
                            <span
                              style={{
                                color: myCart.stock === 0 ? 'grey' : 'black',
                                textDecoration: myCart.stock === 0 ? 'line-through' : 'none'
                              }}
                            >
                              {myCart.name}
                            </span>
                          </Box>
                        </Typography>
                        <Typography variant="h6">
                          <PlusMinCart
                            addHandle={(product_id) =>
                              addCartMutation.mutate({ product_id })
                            }
                            minHandle={(product_id) =>
                              minCartMutation.mutate({ product_id })
                            }
                            product_id={myCart.product_id}
                            qty={myCart.qty}
                            stock={myCart.stock}
                          />
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
                      <IconButton
                        aria-label="delete cart"
                        onClick={() => {
                          deletCartMutation.mutate({
                            cart_id: myCart.id,
                          });
                        }}
                        className={classes.identityColor}
                      >
                        <Delete />
                      </IconButton>
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
                      {formatNumberToIDR(data.totalPrice)}
                    </Typography>
                  </Box>
                  <Box justifyContent="space-between" display="flex">
                    <Typography className={classes.identityColor}>
                      Qty
                    </Typography>
                    <Typography className={classes.identityColor}>
                      {stateUser.countCart}
                    </Typography>
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
                      <Box fontWeight="bold">
                        {formatNumberToIDR(data.totalPrice)}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <ButtonReuse
                  color="primary"
                  variant="contained"
                  onClick={() => router.push('/cart/shipping')}
                  disabled={data.listStocks.includes(0)}
                >
                  Proceed To Checkout
                </ButtonReuse>
              </Box>
            </Grid>
          </Grid>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            TransitionComponent={(props) => <Slide direction="up" {...props} />}
          >
            <Alert severity="error">{errMsg}</Alert>
          </Snackbar>
        </>
      )}
      {isSuccess && data?.totalPrice === 0 && (
        <Box textAlign="center">
          <Typography variant="h5">
            <Box className={classes.identityColor} mb={1} fontWeight="bold">
              Wah, keranjang belanjamu kosong
            </Box>
          </Typography>
          <IconButton
            className={classes.identityColor}
            onClick={() => router.push('/')}
          >
            <AddShoppingCart className={localClasses.rootCart} />
          </IconButton>
        </Box>
      )}
    </Container>
  );
}

export default Cart;
