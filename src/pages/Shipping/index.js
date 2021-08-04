import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import ButtonReuse from '../../components/ButtonReuse';
import CardShipping from '../../components/CardShipping';
import FormShipping from '../../components/FormShipping';
import { UserContext } from '../../contexts/UserContext';
import { SET_CART } from '../../contexts/UserContext/action';
import { formatNumberToIDR } from '../../Helpers';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';

const inlineCss = {
  overflow: 'auto',
  maxHeight: '59vh',
};

function Shipping() {
  const classes = globalStyles();

  const router = useHistory();
  const { location } = router;

  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [show, setshow] = useState(false);

  const { isLoading, isError, data, isSuccess } = useQuery(['carts'], () =>
    services.getDetailCart(),
  );

  const checkoutMutation = useMutation(services.checkoutProcess, {
    onSuccess: async (res) => {
      console.log(`res pay`, res);

      setshow(true);
      const data = await services.countCart();
      dispatchUser({ type: SET_CART, payload: data });
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const handleCbForm = (payload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('address', payload.address);
    formData.append('possCode', payload.possCode);

    data?.detailCarts?.map((cart) => {
      formData.append('products[]', `${cart.product_id},${cart.qty}`);
      return cart;
    });
    formData.append('imageFile', payload.file, payload.file.name);

    checkoutMutation.mutate({ payload: formData });
  };

  useEffect(() => {
    if (location.state && stateUser.countCart === 0) {
      router.replace(location.state.pathname);
    }
  }, []);

  const DialogSucc = ({ show, handleClose }) => {
    return (
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onClick={handleClose}
        maxWidth='lg'
      >
        <DialogContent style={{ width: '40vw', paddingBottom: '40px' }}>
          <Typography component="span" variant="h6">
            <Box color="green" textAlign="center">
              Thank you for ordering in us, please wait 1 x 24 hours to verify
              you order
            </Box>
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="md">
      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
          <Typography variant="h4" component="span">
            <Box fontWeight="bold" className={classes.identityColor} mb={3}>
              Shipping
            </Box>
          </Typography>
          <FormShipping
            buttonIsClicked={buttonIsClicked}
            cbForm={handleCbForm}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Box className={classes.secondaryBackgroundColor}>
            <Box style={{ ...inlineCss }}>
              {isSuccess && (
                <>
                  {data?.totalPrice > 0 &&
                    data?.detailCarts?.map((cart, idx) => (
                      <Box key={idx}>
                        <CardShipping
                          myCart={cart}
                          subTotal={data.totalPrice}
                        />
                      </Box>
                    ))}
                </>
              )}
            </Box>
            {isSuccess && (
              <>
                <Divider
                  className={classes.identityBackgroundColor}
                  color="#613D2B"
                />
                <Typography variant="body1" component="span">
                  <Box
                    pt={2}
                    pb={2}
                    pl={2}
                    pr={3}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography component="span" variant="body1">
                      <Box fontWeight="bold" className={classes.identityColor}>
                        Total Price :
                      </Box>
                    </Typography>
                    <Typography component="span" variant="body1">
                      <Box fontWeight="bold" className={classes.identityColor}>
                        Rp.
                        {formatNumberToIDR(data?.totalPrice)}
                      </Box>
                    </Typography>
                  </Box>
                </Typography>
              </>
            )}
          </Box>
          <Box mt={2}>
            <ButtonReuse
              color="primary"
              variant="contained"
              onClick={() => setButtonIsClicked(true)}
              onMouseOut={() => setButtonIsClicked(false)}
            >
              Pay
            </ButtonReuse>
          </Box>
        </Grid>
      </Grid>
      {show && (
        <DialogSucc
          show={show}
          handleClose={() => {
            setshow(false);
            router.push('/profile');
          }}
        />
      )}
    </Container>
  );
}

export default Shipping;
