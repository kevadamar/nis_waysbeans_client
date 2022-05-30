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
  CircularProgress,
} from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { useContext, useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from 'react-query';

import ButtonReuse from '../../components/ButtonReuse';
import ConfirmDialog from '../../components/ConfirmDialog';
import { connectSocketIO, loadNotifications } from '../../config';
import { UserContext } from '../../contexts/UserContext';

import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';

const adminStyles = makeStyles((theme) => ({
  root: {
    borderTop: '0 !important',
    border: '1px solid #828282!important',
  },
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
  const socket = useRef();

  const classes = globalStyles();
  const localClasses = adminStyles();

  const { state: stateUser } = useContext(UserContext);

  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { isLoading, data, refetch, isSuccess } = useQuery(
    ['transactions', page],
    () => services.getTransactions({ page: page }),
    // { staleTime: 30000 },
  );

  const approveMutation = useMutation(services.updateStatusTransaction, {
    onSuccess: () => {
      refetch();
      loadNotifications({ socket });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleButton = (status) => {
    if (status) {
      approveMutation.mutate({
        order_id: selectedRow?.id,
        payload: { status: selectedRow.flag ? 'On The Way' : 'Cancel' },
      });
    }
    setShowModal(false);
  };

  const handleSetOrdered = (row, flag = 1) => {
    setShowModal(true);
    setSelectedRow({ ...row, flag });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    socket.current = connectSocketIO({ token: stateUser.token });

    loadNotifications({ socket });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="lg" style={{ height: '75vh' }}>
      <Box pt={1}>
        <Typography variant="h4">
          <Box fontWeight="bold" className={classes.identityColor} mb={4}>
            Incoming Transaction
          </Box>
        </Typography>
        {isLoading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
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
                  {data?.data?.map((row, index) => {
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
                                onClick={() => handleSetOrdered(row, 0)}
                              >
                                Cancel
                              </ButtonReuse>
                              <ButtonReuse
                                variant="contained"
                                color="primary"
                                style={{ ...btnApprove, marginRight: 0 }}
                                onClick={() => handleSetOrdered(row)}
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
            <TablePagination
              className={localClasses.root}
              rowsPerPageOptions={[5]}
              component="div"
              count={data?.countData}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {showModal && (
              <ConfirmDialog
                cb={(v) => handleButton(v)}
                open={showModal}
                titleBtnFalse="Close"
                titleBtnTrue="Approve"
              />
            )}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Admin;
