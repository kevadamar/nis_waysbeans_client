import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useMutation, useQueries, useQuery } from 'react-query';
import { services } from '../../services';
import { globalStyles } from '../../styles/globalStyles';
import DefaultPhoto from '../../assets/default_photo.png';
import CardMyTransaction from '../../components/CardMyTransaction';
import { profileStyles } from './_ProfileStyles';
import FormProfile from '../../components/FormProfile';
import ButtonReuse from '../../components/ButtonReuse';

const inlineCss = {
  overflow: 'auto',
  maxHeight: '57vh',
};

function Profile() {
  const classes = globalStyles();

  const localClasses = profileStyles();

  const [showEdit, setShowEdit] = useState(false);

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

    refetch: refetchTransaction,
  } = result[1];

  const mutation = useMutation(services.updateStatusTransaction, {
    onSuccess: () => {
      refetchTransaction();
    },
    onError: async () => {
      console.log('error');
    },
  });

  const handleCompleted = ({ order_id }) => {
    mutation.mutate({ order_id, payload: { status: 'Success' } });
  };

  const handleCbForm = (payload) => {
    const formData = new FormData();
    formData.append('fullname', payload.fullname);
    formData.append('email', payload.email);
    if (payload.password) {
      formData.append('password', payload.password);
    }
    if (payload.file) {
      
      formData.append('imageFile', payload.file, payload.file.name);
    }

    // mutation.mutate({ payload: formData });
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5}>
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
            <>
              {!showEdit ? (
                <Box>
                  <Box mt={3} mb={2} display="flex">
                    <Container className={localClasses.containerImg}>
                      <img
                        alt={dataUser.fullname}
                        src={!dataUser.photo ? DefaultPhoto : dataUser.photo}
                        style={{
                          borderRadius: '5px',
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Container>

                    <Box>
                      <Typography
                        variant="h6"
                        className={classes.identityColor}
                      >
                        <Box fontWeight="bold">Full Name</Box>
                      </Typography>
                      <Typography variant="body1">
                        <Box>{dataUser.fullname}</Box>
                      </Typography>
                      <Typography
                        variant="h6"
                        className={classes.identityColor}
                      >
                        <Box fontWeight="bold">Email</Box>
                      </Typography>
                      <Typography variant="body1">
                        <Box>{dataUser.email}</Box>
                      </Typography>
                    </Box>
                  </Box>
                  {/* <ButtonReuse
                    variant="contained"
                    color="primary"
                    onClick={() => setShowEdit(true)}
                  >
                    update profile
                  </ButtonReuse> */}
                </Box>
              ) : (
                <FormProfile cbForm={handleCbForm} data={dataUser} />
              )}
            </>
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
                    <CardMyTransaction
                      myCart={cart}
                      handleCompleted={handleCompleted}
                    />
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
