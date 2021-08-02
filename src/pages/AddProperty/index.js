import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { API } from '../../config';
import ButtonReuse from '../../components/ButtonReuse';
import { Box, Container } from '@material-ui/core';

const AddProduct = () => {
  const router = useHistory();

  const [isError, setIsError] = useState(false);

  const [show, setshow] = useState(false);
  const [img, setimg] = useState('');

  const postData = async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await API.post(`product`, payload, config);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error('Interval Server Error');
    }
  };

  const mutation = useMutation(postData, {
    onSuccess: async ({ data }) => {
      console.log(`data add product`, data);
      setshow(true);
    },
    onError: async (error) => {
      console.log('error', error);
      setIsError(true);
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
    formData.append('imageFile', img, img.name);

    mutation.mutate(formData);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  // const AlertDialogSucc = ({ show, handleClose, msg, router }) => {
  //   const handleClicked = () => {
  //     router.push('/admin');
  //     handleClose();
  //   };

  //   return (
  //     <Modal show={show} backdrop="static" keyboard={false} centered>
  //       <Modal.Body>{msg}</Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClicked}>
  //           OK
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  return (
    <Container maxWidth="md">
      <Box py={5}>
        <h4>Add Property</h4>
        <Box mt={5}>
          {/* <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Form.Group>
              <Form.Label className="font-weight-bold">Name</Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="text"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <ErrMsg msg={errors.name.message} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Stock</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-identity font-weight-bold"
                {...register('stock', { required: 'Stock is required' })}
              />

              {errors.stock && <ErrMsg msg={errors.stock.message} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Price</Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="text"
                {...register('price', { required: 'Price is required' })}
              />

              {errors.price && <ErrMsg msg={errors.price.message} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-identity font-weight-bold"
                type="text"
                {...register('description', {
                  required: 'Description is required',
                })}
              />

              {errors.description && (
                <ErrMsg msg={errors.description.message} />
              )}
            </Form.Group>

            <input type="file" accept="image/*" onChange={(e) => setimg(e.target.files[0])} />
            <Container
              fluid
              className="px-0 pt-1 d-flex justify-content-center"
            >
              <ButtonReuse
                className="font-weight-bold my-2"
                style={{
                  backgroundColor: '#5A57AB',
                  borderColor: '#5A57AB',
                  color: ' white',
                  width: '50%',
                }}
                type="submit"
              >
                SAVE
              </ButtonReuse>
            </Container>
          </Form> */}
          {isError && <h2 style={{ color: 'red' }}>Error From Server...</h2>}
        </Box>
        {/* {show && (
          <AlertDialogSucc
            show={show}
            router={router}
            handleClose={() => setshow(false)}
            msg="Success Add Product"
          />
        )} */}
      </Box>
    </Container>
  );
};

export default AddProduct;
