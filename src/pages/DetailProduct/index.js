import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { UserContext } from '../../contexts/UserContext';
import {
  ADD_NEW_USER,
  LOGIN,
  SET_CART,
} from '../../contexts/UserContext/action';
import ModalSignin from '../../components/ModalSignin';
import ModalSignup from '../../components/ModalSignup';
import { formatNumberToIDR, saveToLocalStorage } from '../../Helpers';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { globalStyles } from '../../styles/globalStyles';
import ButtonReuse from '../../components/ButtonReuse';
import { detailStyles } from './_detailProduct';
import { services } from '../../services';
import Alert from '@material-ui/lab/Alert';
import { Error } from '@material-ui/icons';

const DetailProduct = () => {
  const classes = globalStyles();
  const classesLocal = detailStyles();

  const { state: userState, dispatch: dispatchUser } = useContext(UserContext);

  const { id } = useParams();

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { isLoading, data, isSuccess, isError, error } = useQuery(
    `detail-product-${id}`,
    async () => await services.getProduct({ id }),
  );

  const mutation = useMutation(services.addCart, {
    onSuccess: async (res) => {
      if (res.status === -1) {
        setShowSnackbar(true);
        setErrMsg(res.message);
      } else {
        const data = await services.countCart();
        dispatchUser({ type: SET_CART, payload: data });
      }
    },
    onError: (error) => {
      setShowSnackbar(true);
      setErrMsg(error);
      console.log('error', error);
    },
  });

  const handleButtonAddCart = () => {
    if (!userState.isLogin) {
      handleModalShow({ name: show.nameSignIn });
    } else {
      mutation.mutate({ product_id: id });
    }
  };

  const handleModalShow = ({ name }) => {
    setShow((currentState) => ({
      ...currentState,
      [name]: !currentState[name],
    }));
  };

  // handle submit login
  const handleSubmitSignin = (payload) => {
    const { user, token } = payload;
    dispatchUser({ type: LOGIN, payload: user });
    saveToLocalStorage({ key: 'user', payload: user });
    saveToLocalStorage({ key: 'token', payload: token });
    handleModalShow({ name: show.nameSignIn });
  };

  // handle submit signup
  const handleSubmitSignup = (payload) => {
    dispatchUser({ type: ADD_NEW_USER, payload });
    handleModalShow({ name: show.nameSignUp });
    if (!userState.isSignUp) {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    }
  };

  const handleModalTo = ({ name }) => {
    if (name === 'signIn') {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    } else {
      setShow((currentState) => ({
        ...currentState,
        signIn: false,
        signUp: true,
      }));
    }
  };

  console.log(error, isError);

  return (
    <Container maxWidth="md" mt={4}>
      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <>
          <Box display="flex" alignItems="center" flexDirection='column'>
            <Error className={classesLocal.iconSize} />
            <Typography variant="h4" component="span">
              {error}
            </Typography>
          </Box>
        </>
      )}
      {isSuccess && (
        <>
          <Grid container spacing={5}>
            <Grid item xs={12} md={5}>
              <img
                src={data.photo}
                alt={data.name}
                height="500px"
                width="100%"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" className={classes.identityColor}>
                <Box fontWeight="bold" mb={2}>
                  {data.name}
                </Box>
              </Typography>
              <Typography style={{ color: '#974A4A' }}>
                <Box mb={2}>Stock : {data.stock}</Box>
              </Typography>
              <Typography align="justify" className={classesLocal.description}>
                <Box>{data.description}</Box>
              </Typography>
              <Typography align="right" className={classes.identityColor}>
                <Box fontWeight="bold">Rp.{formatNumberToIDR(data.price)}</Box>
              </Typography>
              <Box py={4}>
                <ButtonReuse
                  variant="contained"
                  color="primary"
                  onClick={handleButtonAddCart}
                >
                  Add Cart
                </ButtonReuse>
              </Box>
            </Grid>
          </Grid>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={2000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert severity="error">{errMsg}</Alert>
          </Snackbar>
        </>
      )}
      {show.signIn && (
        <ModalSignin
          show={show.signIn}
          handleClose={() => handleModalShow({ name: show.nameSignIn })}
          handleTo={() => handleModalTo({ name: show.nameSignUp })}
          handleSubmitLogin={handleSubmitSignin}
        />
      )}
      {show.signUp && (
        <ModalSignup
          show={show.signUp}
          handleClose={() => handleModalShow({ name: show.nameSignUp })}
          handleTo={() => handleModalTo({ name: show.nameSignIn })}
          handleSubmitSignup={handleSubmitSignup}
        />
      )}
    </Container>
  );
};

export default DetailProduct;
