import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import ButtonReuse from '../../components/ButtonReuse';
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { globalStyles } from '../../styles/globalStyles';
import InputReuse from '../../components/InputReuse';
import { services } from '../../services';
import { Photo } from '@material-ui/icons';
import { addProductStyles } from './_AddProductStyles';

const AddProduct = () => {
  const router = useHistory();

  const classes = globalStyles();
  const localClasses = addProductStyles();

  const [isError, setIsError] = useState(false);

  const [show, setshow] = useState(false);

  const [file, setFile] = useState({ file: '', fileUrl: '' });
  const [errFile, setErrFile] = useState(false);

  const mutation = useMutation(services.addProduct, {
    onSuccess: async ({ data }) => {
      console.log(`data add product`, data);
      setshow(true);
    },
    onError: async (error) => {
      console.log('error', error);
      setIsError(true);
    },
  });

  const onSubmited = (data) => {
    console.log(data);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    // data body
    formData.append('name', data.name);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('description', data.description);
    // images
    formData.append('imageFile', file.file, file.file.name);

    mutation.mutate({ payload: formData });
  };

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  const AlertDialogSucc = ({ show, handleClose }) => {
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
              Success Add Product
            </Box>
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="md">
      <Box pt={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={7}>
            <Box>
              <Typography variant="h5" component="span">
                <Box fontWeight="bold" className={classes.identityColor}>
                  Add Product
                </Box>
              </Typography>
              <Box mt={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    name="stock"
                    control={control}
                    rules={{ required: 'Stock is required' }}
                    render={({ field }) => (
                      <InputReuse
                        margin="dense"
                        id="stock"
                        label="Stock"
                        type="number"
                        variant="outlined"
                        fullWidth
                        required
                        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        {...field}
                      />
                    )}
                  />
                  {errors.stock && errors.stock.type === 'required' && (
                    <ErrMsg msg={errors.stock.message} />
                  )}
                  <br />
                  <br />

                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: 'Price is required' }}
                    render={({ field }) => (
                      <InputReuse
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        required
                        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        {...field}
                      />
                    )}
                  />
                  {errors.price && errors.price.type === 'required' && (
                    <ErrMsg msg={errors.price.message} />
                  )}
                  <br />
                  <br />

                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: 'Description Product is required',
                    }}
                    render={({ field }) => (
                      <InputReuse
                        margin="dense"
                        id="description"
                        label="Description Product"
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
                  {errors.description &&
                    errors.description.type === 'required' && (
                      <ErrMsg msg={errors.description.message} />
                    )}
                  <br />
                  <br />

                  <InputReuse
                    label={
                      !file.file ? 'Attache of transaction' : file.file?.name
                    }
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

                  <ButtonReuse
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Add Product
                  </ButtonReuse>
                </form>
                {isError && (
                  <h2 style={{ color: 'red' }}>Error From Server...</h2>
                )}
              </Box>
              {show && (
                <AlertDialogSucc
                  show={show}
                  handleClose={() => {
                    setshow(false);
                    router.push('/admin');
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Container className={localClasses.imgSize}>
              {!file.file ? (
                <Container className={localClasses.containerIcon}>
                  <Photo className={localClasses.icon} />
                </Container>
              ) : (
                <img
                  alt="preview product"
                  src={file.fileUrl}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;
