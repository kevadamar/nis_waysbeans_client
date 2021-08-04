import { Container } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ButtonReuse from '../ButtonReuse';
import InputReuse from '../InputReuse';
import { formProfileStyles } from './_FormProfileStyles';

function FormProfile({ cbForm, data }) {
  const localClasses = formProfileStyles();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const [file, setFile] = useState({ file: '', fileUrl: '' });
  const [errFile, setErrFile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmited = (payload) => {
    if (!file.file) {
      cbForm({ fullname: payload.fullname, password: payload.password });
    } else {
      cbForm({ ...payload, file: file.file });
    }
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmited)}>
        {!data.photo && !file.file ? (
          <>
            <Container className={localClasses.containerIcon}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="button-file"
                multiple
                type="file"
                onChange={(e) => {
                  setFile({
                    file: e.target.files[0],
                    fileUrl: URL.createObjectURL(e.target.files[0]),
                  });
                  setErrFile(false);
                }}
              />
              <label htmlFor="button-file">
                <Photo className={localClasses.icon} />
              </label>
            </Container>
          </>
        ) : (
          <>
            <Container className={localClasses.containerImg}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="button-filed"
                multiple
                type="file"
                onChange={(e) => {
                  setFile({
                    file: e.target.files[0],
                    fileUrl: URL.createObjectURL(e.target.files[0]),
                  });
                  setErrFile(false);
                }}
              />
              <label htmlFor="button-filed">
                <img
                  alt={data.fullname}
                  src={!file.file ? data.photo : file.fileUrl}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
              </label>
            </Container>
          </>
        )}
        <br />
        <Controller
          name="email"
          control={control}
          defaultValue={data.email}
          rules={{
            required: 'Email is required!',
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }}
          render={({ field }) => (
            <InputReuse
              disabled={true}
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
          name="fullname"
          control={control}
          defaultValue={data.fullname}
          rules={{ required: 'Full Name is required' }}
          render={({ field }) => (
            <InputReuse
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
              required
              {...field}
            />
          )}
        />
        {errors.fullname && errors.fullname.type === 'required' && (
          <ErrMsg msg={errors.fullname.message} />
        )}
        <br />
        <br />

        {showChangePassword && (
          <>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'New Password is required', minLength: 8 }}
              render={({ field }) => (
                <InputReuse
                  required
                  margin="dense"
                  id="password"
                  label="New Password"
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
          </>
        )}

        {!showChangePassword && (
          <>
            <ButtonReuse
              variant="contained"
              color="primary"
              onClick={() => setShowChangePassword(true)}
            >
              change password
            </ButtonReuse>
            <br />
            <br />
          </>
        )}

        <ButtonReuse variant="contained" color="primary" type="submit">
          update
        </ButtonReuse>
      </form>
    </>
  );
}

export default FormProfile;
