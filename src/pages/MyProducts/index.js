import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DeleteForever, Edit, Visibility } from '@material-ui/icons';
import { globalStyles } from '../../styles/globalStyles';
import { useMutation, useQuery } from 'react-query';
import { services } from '../../services';
import ButtonReuse from '../../components/ButtonReuse';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { UserContext } from '../../contexts/UserContext';
import { io } from 'socket.io-client';

const myProductsStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

function MyProducts() {
  const socket = useRef();
  const classes = globalStyles();
  const localClasses = myProductsStyles();

  const router = useHistory();

  const [page, setPage] = useState(0);
  const [show, setshow] = useState(false);

  const { state: stateUser } = useContext(UserContext);

  const { isSuccess, isLoading, data, refetch } = useQuery(
    ['my-products', page],
    () => services.getMyProducts({ page }),
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const mutation = useMutation(services.deleteProduct, {
    onSuccess: async (data) => {
      console.log(`data edit product`, data);
      setshow(true);
      refetch();
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const handleDeleteProduct = (id) => {
    mutation.mutate({ id });
  };

  useEffect(() => {
    socket.current = io.connect('http://localhost:5000', {
      transports: ['websocket'],
      query: {
        token: stateUser.token,
      },
    });

    socket.current.emit('load-notifications');

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="lg" style={{ height: '75vh' }}>
      <Box pb={1}>
        <Box fontWeight="bold" className={classes.identityColor} mb={1}>
          <ButtonReuse
            variant="contained"
            color="primary"
            style={{ width: 200 }}
            onClick={() => router.push('/admin/my-products/add')}
          >
            Add Product
          </ButtonReuse>
        </Box>

        {isSuccess && data?.data?.length > 0 && (
          <Paper className={localClasses.paper}>
            <TableContainer>
              <Table
                className={localClasses.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow style={{ background: 'lightgrey' }}>
                    <TableCell width="5%" align="left">
                      <Box fontWeight="bold">No</Box>
                    </TableCell>
                    <TableCell width="15%" align="left">
                      <Box fontWeight="bold">Photo</Box>
                    </TableCell>
                    <TableCell width="23%" align="left">
                      <Box fontWeight="bold">Name</Box>
                    </TableCell>
                    <TableCell width="12%" align="left">
                      <Box fontWeight="bold">Price</Box>
                    </TableCell>
                    <TableCell width="15%" align="left">
                      <Box fontWeight="bold">Stock</Box>
                    </TableCell>
                    <TableCell width="17%" align="center">
                      <Box fontWeight="bold">Action</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img alt={row.name} src={row.photo} height={50} />
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.stock}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() =>
                              router.push(`/admin/my-products/detail/${row.id}`)
                            }
                          >
                            <Visibility />
                          </IconButton>

                          <IconButton
                            onClick={() =>
                              router.push(`/admin/my-products/edit/${row.id}`)
                            }
                          >
                            <Edit />
                          </IconButton>

                          <IconButton
                            onClick={() => handleDeleteProduct(row.id)}
                          >
                            <DeleteForever />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={data?.countData}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>
        )}
        <Snackbar
          open={show}
          autoHideDuration={2500}
          onClose={() => setshow(false)}
        >
          <Alert severity="success">Success Delete Product</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default MyProducts;
