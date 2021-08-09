import { useState } from 'react';
import ButtonReuse from '../ButtonReuse';
import { useMutation } from 'react-query';
import { setAuthToken } from '../../config';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';

import InputReuse from '../InputReuse';
import { services } from '../../services';
import { Alert } from '@material-ui/lab';

const useStyle = makeStyles((theme) => ({
  btnLink: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ModalSignin = ({ show, handleClose, handleTo, handleSubmitLogin }) => {
  const classes = useStyle();

  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (payload) => {
    try {
      const response = await services.signIn({ payload });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation(handleLogin, {
    onSuccess: async ({ data }) => {
      setAuthToken(data.token);
      // console.log(`data`, data);
      handleSubmitLogin(data);
    },
    onError: async () => {
      console.log('error');
      setError(true);
    },
  });

  const onSubmit = (payload) => {
    mutation.mutate(payload);
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" component="h2">
          <Box fontWeight="bold" color="#613D2B">
            Login
          </Box>
        </Typography>
      </DialogTitle>
      <DialogContent style={{ width: '350px', paddingBottom: '40px' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required!',
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            render={({ field }) => (
              <InputReuse
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                {...field}
              />
            )}
          />
          {errors.email && errors.email.type === 'required' && (
            <ErrMsg msg="Email is required" />
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <ErrMsg msg="Format email invalid" />
          )}
          <br />
          <br />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required', minLength: 8 }}
            render={({ field }) => (
              <InputReuse
                required
                margin="dense"
                id="password"
                label="Password"
                type={`${showPassword ? 'text' : 'password'}`}
                variant="outlined"
                fullWidth
                showPassword={showPassword}
                handleClicked={() =>
                  setShowPassword((currentState) => !currentState)
                }
                {...field}
              />
            )}
          />
          {errors.password && errors.password.type === 'required' && (
            <ErrMsg msg={errors.password.message} />
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <ErrMsg msg="Min 8 Characters" />
          )}
          <br />
          <br />

          <ButtonReuse
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
          >
            LOGIN
          </ButtonReuse>
        </form>
        <Box style={{ textAlign: 'center', marginTop: '25px' }}>
          {error && (
            <Box mb={1}>
              <Alert severity="error" onClose={() => setError(false)}>
                Username Or Password not valid.
              </Alert>
            </Box>
          )}
          <Typography variant="p">
            Don't have an account? Klik
            <Typography
              variant="p"
              className={classes.btnLink}
              onClick={handleTo}
            >
              &nbsp;Here
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSignin;
