import { Box, Container } from '@material-ui/core';
import { useContext, useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import User from '../User';

const Home = () => {
  const router = useHistory();
  const { location } = router;

  const { state: stateUser } = useContext(UserContext);

  useEffect(() => {
    if (location.state && stateUser.isLogin) {
      router.replace(location.state.pathname);
    }
  }, []);

  return (
    <>
      {stateUser.user?.role === 'admin' ? <Redirect to="/admin" /> : <User />}
    </>
  );
};

export default Home;
