import {
  Box,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';

import { useMutation, useQuery } from 'react-query';
import ButtonReuse from '../../components/ButtonReuse';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';

const adminStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  waiting: {
    color: '#FF9900',
  },
  success: {
    color: '#209a12',
  },
  onTheWay: {
    color: '#00D1FF',
  },
  cancel: {
    color: 'red',
  },
  table: {
    minWidth: 750,
  },
}));

const btnCancel = {
  width: '105px',
  height: '30px',
  fontSize: '11px',
  backgroundColor: 'red',
};

const btnApprove = {
  width: '105px',
  height: '30px',
  fontSize: '11px',
  backgroundColor: '#209a12',
};

const Admin = () => {
  const classes = globalStyles();
  const localClasses = adminStyles();

  const { isLoading, data, isError, refetch, isSuccess } = useQuery(
    ['transactions'],
    services.getTransactions,
    // { staleTime: 30000 },
  );

  const approveMutation = useMutation(services.updateStatusTransaction, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const cancelMutation = useMutation(services.updateStatusTransaction, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleApprove = ({ order_id }) => {
    approveMutation.mutate({ order_id, payload: { status: 'On The Way' } });
  };

  const handleCancel = ({ order_id }) => {
    cancelMutation.mutate({ order_id, payload: { status: 'Cancel' } });
  };

  return (
    <Container maxWidth="lg" style={{ height: '87vh' }}>
      <Box pt={1} pb={4}>
        <Typography variant="h4">
          <Box fontWeight="bold" className={classes.identityColor} mb={4}>
            Incoming Transaction
          </Box>
        </Typography>
        {isSuccess && data?.length > 0 && (
          <Paper className={localClasses.paper}>
            <TableContainer style={{ height: '56vh' }}>
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
                      <Box fontWeight="bold">Name</Box>
                    </TableCell>
                    <TableCell width="23%" align="left">
                      <Box fontWeight="bold">Address</Box>
                    </TableCell>
                    <TableCell width="12%" align="left">
                      <Box fontWeight="bold">Poss Code</Box>
                    </TableCell>
                    <TableCell width="15%" align="left">
                      <Box fontWeight="bold">Products Order</Box>
                    </TableCell>
                    <TableCell width="13%" align="left">
                      <Box fontWeight="bold">Status</Box>
                    </TableCell>
                    <TableCell width="17%" align="center">
                      <Box fontWeight="bold">Action</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.possCode}</TableCell>
                        <TableCell align="left">
                          {row.products
                            .map((product) => product.name)
                            .join(', ')}
                        </TableCell>
                        <TableCell align="left">
                          {row.status.toLowerCase() === 'waiting approve' && (
                            <Box className={localClasses.waiting}>
                              {row.status}
                            </Box>
                          )}
                          {row.status.toLowerCase() === 'on the way' && (
                            <Box className={localClasses.onTheWay}>
                              {row.status}
                            </Box>
                          )}
                          {row.status.toLowerCase() === 'success' && (
                            <Box className={localClasses.success}>
                              {row.status}
                            </Box>
                          )}
                          {row.status.toLowerCase() === 'cancel' && (
                            <Box className={localClasses.cancel}>
                              {row.status}
                            </Box>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.status.toLowerCase() === 'waiting approve' && (
                            <Box display="flex">
                              <ButtonReuse
                                variant="contained"
                                color="primary"
                                style={{ ...btnCancel }}
                                onClick={() =>
                                  handleCancel({ order_id: row.id })
                                }
                              >
                                Cancel
                              </ButtonReuse>
                              <ButtonReuse
                                variant="contained"
                                color="primary"
                                style={{ ...btnApprove, marginRight: 0 }}
                                onClick={() =>
                                  handleApprove({ order_id: row.id })
                                }
                              >
                                Approve
                              </ButtonReuse>
                            </Box>
                          )}
                          {(row.status.toLowerCase() === 'success' ||
                            row.status.toLowerCase() === 'on the way') && (
                            <Box>
                              <CheckCircle style={{ color: '#209a12' }} />
                            </Box>
                          )}
                          {row.status.toLowerCase() === 'cancel' && (
                            <Box>
                              <Cancel style={{ color: 'red' }} />
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Admin;
