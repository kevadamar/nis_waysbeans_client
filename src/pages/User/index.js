import { Box, CircularProgress, Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import CardList from '../../components/CardList';
import Hero from '../../components/Hero';
import { API } from '../../config';

import bannerImage from '../../assets/banner_image.png';

const User = () => {
  const fetchData = async () => {
    const response = await API.get('products');

    if (response.status !== 200) {
      throw new Error('An error has occured');
    }
    return response.data.data;
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    ['products'],
    () => fetchData(),
    // { staleTime: 30000 },
  );

  return (
    <Container maxWidth="md">
      <Box mb={3} position="relative">
        <Hero />
        <Box
          position="absolute"
          style={{
            top: '25px',
            right: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <img alt="gambar" src={bannerImage} width="90%" />
        </Box>
      </Box>
      <Box>
        {isLoading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {isError && <h2>There was an error processing your request....</h2>}
        {isSuccess && <CardList data={data} />}
      </Box>
    </Container>
  );
};

export default User;
