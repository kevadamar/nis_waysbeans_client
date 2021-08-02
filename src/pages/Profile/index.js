import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useQueries, useQuery } from 'react-query';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';
import DefaultPhoto from '../../assets/default_photo.png';
import CardMyTransaction from '../../components/CardMyTransaction';

const inlineCss = {
  overflow: 'auto',
  maxHeight: '57vh',
};

function Profile() {
  const classes = globalStyles();

  // const { isLoading, data, isError, isSuccess } = useQuery(
  //   ['profile'],
  //   services.getMe,
  // );
  const result = useQueries([
    {
      queryKey: ['profile'],
      queryFn: services.getMe,
    },
    {
      queryKey: ['my-transaction'],
      queryFn: services.getTransactions,
    },
  ]);

  const {
    data: dataUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    isLoading: isLoadingUser,
  } = result[0];
  const {
    data: dataTransaction,
    isSuccess: isSuccessTransaction,
    isError: isErrorTransaction,
    isLoading: isLoadingTransaction,
  } = result[1];

  const isSuccess = true;

  console.log(result);

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Typography variant="h5" className={classes.identityColor}>
            <Box fontWeight="bold">My Profile</Box>
          </Typography>
          {isLoadingUser && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {isSuccessUser && (
            <Box mt={3} display="flex">
              <Box>
                <img
                  alt={dataUser.fullname}
                  src={!dataUser.photo ? DefaultPhoto : dataUser.photo}
                  style={{ borderRadius: '5px' }}
                />
              </Box>

              <Box ml={3}>
                <Typography variant="h6" className={classes.identityColor}>
                  <Box fontWeight="bold">Full Name</Box>
                </Typography>
                <Typography variant="body1">
                  <Box>{dataUser.fullname}</Box>
                </Typography>
                <Typography variant="h6" className={classes.identityColor}>
                  <Box fontWeight="bold">Email</Box>
                </Typography>
                <Typography variant="body1">
                  <Box>{dataUser.email}</Box>
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="h5" className={classes.identityColor}>
            <Box fontWeight="bold">My Transaction</Box>
          </Typography>
          {isLoadingTransaction && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
          <Box className={classes.secondaryBackgroundColor} mt={3}>
            <Box style={{ ...inlineCss }}>
              {isSuccessTransaction &&
                dataTransaction?.transactions?.map((cart, idx) => (
                  <Box key={idx}>
                    <CardMyTransaction myCart={cart} />
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
