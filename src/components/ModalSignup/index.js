import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { API } from '../../config';
import ButtonReuse from '../ButtonReuse';
import InputReuse from '../InputReuse';

const useStyle = makeStyles((theme) => ({
  btnLink: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ModalSignup = ({ show, handleClose, handleTo, handleSubmitSignup }) => {
  const classes = useStyle();

  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState({ msg: '', status: false });

  const handleSingup = async (data) => {
    const config = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await API.post('register', data, config);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      console.log(`response.data`, response.data);
      return response.data;
    } catch (error) {
      console.log(`err`, error.response.data.message);
      throw error.response.data.message;
    }
  };

  const mutation = useMutation(handleSingup, {
    onSuccess: async ({ data }) => {
      console.log(`data`, data);
      handleSubmitSignup({ isSignUp: false });
    },
    onError: async (error) => {
      console.log(error);
      setErrMsg({ msg: error, status: true });

      handleSubmitSignup({ isSignUp: true });
    },
  });

  const onSubmit = (payload) => {
    // console.log(`payload`, payload);
    mutation.mutate(payload);
  };

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm();

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" component="h2">
          <Box fontWeight="bold" color="#613D2B">
            Register
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
                inputProps={{
                  className: classes.customInput,
                }}
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
            name="fullname"
            control={control}
            rules={{ required: 'Fullname is required' }}
            render={({ field }) => (
              <InputReuse
                required
                margin="dense"
                id="fullname"
                label="fullname"
                type="text"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
          {errors.fullname && errors.fullname.type === 'required' && (
            <ErrMsg msg={errors.fullname.message} />
          )}
          {errors.fullname && errors.fullname.type === 'minLength' && (
            <ErrMsg msg="Min 8 Characters" />
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
            Register
          </ButtonReuse>
        </form>
        <Box style={{ textAlign: 'center', marginTop: '10px' }}>
          {errMsg.status && (
            <Alert
              severity="error"
              onClose={() => setErrMsg({ msg: '', status: false })}
            >
              {errMsg.msg}
            </Alert>
          )}
          <br/>
          <Typography variant="p">
            You already have an account? Klik
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

export default ModalSignup;
