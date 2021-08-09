import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import ButtonReuse from '../../components/ButtonReuse';
import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { globalStyles } from '../../styles/globalStyles';
import InputReuse from '../../components/InputReuse';
import { services } from '../../services';
import { addProductStyles } from './_AddProductStyles';
import { autoCapitalize } from '../../Helpers';

const Product = () => {
  const router = useHistory();

  const { action, id } = useParams();
  console.log(action, id);

  const classes = globalStyles();
  const localClasses = addProductStyles();

  const [show, setshow] = useState(false);

  const [file, setFile] = useState({ file: '', fileUrl: '' });
  const [errFile, setErrFile] = useState(false);
  const [errUpdate, setErrUpdate] = useState({ status: false, msg: '' });

  const { isLoading, data, isError, isSuccess } = useQuery(
    `detail-product-${id}`,
    () => services.getProductAdmin({ id }),
  );

  console.log(data);

  const editMutation = useMutation(services.updateProduct, {
    onSuccess: async (data) => {
      console.log(`data edit product`, data);
      setshow(true);
    },
    onError: async (error) => {
      console.log('error', error);
      setErrUpdate({ status: true, msg: error });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    // data body
    formData.append('name', data.name);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('description', data.description);
    // images
    if (file.file) {
      formData.append('imageFile', file.file, file.file.name);
    }
    editMutation.mutate({ payload: formData, id });
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
        maxWidth="lg"
      >
        <DialogContent style={{ width: '40vw', paddingBottom: '40px' }}>
          <Typography component="span" variant="h6">
            <Box color="green" textAlign="center">
              Success Update Product
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
                  {autoCapitalize(action)} Product
                </Box>
              </Typography>
              <Box mt={2}>
                {isLoading && (
                  <Box textAlign="center">
                    <CircularProgress />
                  </Box>
                )}
                {isSuccess && data?.name && (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={data.name}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <InputReuse
                          margin="dense"
                          id="name"
                          label="Name"
                          type="text"
                          variant="outlined"
                          disabled={action === 'detail'}
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
                      defaultValue={data.stock}
                      rules={{ required: 'Stock is required' }}
                      render={({ field }) => (
                        <InputReuse
                          margin="dense"
                          id="stock"
                          label="Stock"
                          type="number"
                          variant="outlined"
                          disabled={action === 'detail'}
                          fullWidth
                          required
                          InputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
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
                      defaultValue={data.price}
                      rules={{ required: 'Price is required' }}
                      render={({ field }) => (
                        <InputReuse
                          margin="dense"
                          id="price"
                          label="Price"
                          type="number"
                          variant="outlined"
                          disabled={action === 'detail'}
                          fullWidth
                          required
                          InputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
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
                      defaultValue={data.description}
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
                          disabled={action === 'detail'}
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

                    {action === 'edit' && (
                      <InputReuse
                        label={data.namePhoto}
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
                    )}
                    {errFile && <ErrMsg msg="Photo Product is required" />}
                    <br />
                    <br />

                    {isError && <h2 style={{ color: 'red' }}>{data}</h2>}
                    {errUpdate.status && (
                      <h2 style={{ color: 'red' }}>{errUpdate.msg}</h2>
                    )}

                    <ButtonReuse
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        action === 'edit'
                          ? handleSubmit(onSubmit)()
                          : router.push(`/admin/my-products/edit/${id}`)
                      }
                    >
                      {action === 'edit' ? 'Update' : 'Edit'} Product
                    </ButtonReuse>
                  </form>
                )}
              </Box>
              {show && (
                <AlertDialogSucc
                  show={show}
                  handleClose={() => {
                    setshow(false);
                    router.push('/admin/my-products');
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Container className={localClasses.imgSize}>
              {!file.file ? (
                <img
                  alt="preview product"
                  src={data?.photo}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
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

export default Product;
