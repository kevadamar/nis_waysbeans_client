import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputReuse from '../InputReuse';

function FormShipping({ buttonIsClicked, cbForm }) {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const [file, setFile] = useState({ file: '', fileUrl: '' });
  const [errFile, setErrFile] = useState(false);

  const onSubmited = (payload) => {
    if (!file.file) {
      setErrFile(true);
    } else {
      cbForm({ ...payload, file: file.file });
    }
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  useEffect(() => {
    if (buttonIsClicked) {
      handleSubmit((payload) => onSubmited(payload))();
    }
  }, [buttonIsClicked, handleSubmit]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <InputReuse
              margin="dense"
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              required
              {...field}
            />
          )}
        />
        {errors.name && errors.name.type === 'required' && (
          <ErrMsg msg={errors.name.message} />
        )}
        <br />
        <br />
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required',
            pattern: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
          }}
          render={({ field }) => (
            <InputReuse
              margin="dense"
              id="phone"
              label="Phone"
              type="number"
              variant="outlined"
              fullWidth
              required
              InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              {...field}
            />
          )}
        />
        {errors.phone && errors.phone.type === 'required' && (
          <ErrMsg msg={errors.phone.message} />
        )}
        {errors.phone && errors.phone.type === 'pattern' && (
          <ErrMsg msg="Phone invalid. Min 11 Digit" />
        )}
        <br />
        <br />
        <Controller
          name="possCode"
          control={control}
          rules={{
            required: 'Poss Code is required',
          }}
          render={({ field }) => (
            <InputReuse
              margin="dense"
              id="possCode"
              label="Poss Code"
              type="number"
              variant="outlined"
              fullWidth
              required
              InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              {...field}
            />
          )}
        />
        {errors.possCode && errors.possCode.type === 'required' && (
          <ErrMsg msg={errors.possCode.message} />
        )}
        <br />
        <br />
        <Controller
          name="address"
          control={control}
          rules={{
            required: 'Address is required',
          }}
          render={({ field }) => (
            <InputReuse
              margin="dense"
              id="address"
              label="Address"
              type="text"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={5}
              rowsMax={7}
              {...field}
            />
          )}
        />
        {errors.address && errors.address.type === 'required' && (
          <ErrMsg msg={errors.address.message} />
        )}
        <br />
        <br />
        <InputReuse
          label={!file.file ? 'Attache of transaction' : file.file?.name}
          margin="dense"
          id="attacheOfTansaction"
          type="text"
          variant="outlined"
          fullWidth
          disabled={true}
          onFileChanged={(e) => {
            setFile({
              file: e.target.files[0],
              fileUrl: URL.createObjectURL(e.target.files[0]),
            });
            setErrFile(false);
          }}
        />
        {errFile && <ErrMsg msg="Attachment is required" />}
        <br />
        <br />
      </form>
    </>
  );
}

export default FormShipping;
