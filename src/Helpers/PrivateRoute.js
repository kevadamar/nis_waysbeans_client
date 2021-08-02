import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return state.isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: props.location,
              }}
            />
          );
        }}
      />
    </>
  );
};

export default PrivateRoute;
