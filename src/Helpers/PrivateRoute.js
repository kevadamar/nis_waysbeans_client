import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, name, ...rest }) => {
  const { state } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return state.isLogin ? (
            <>
              {state.user.role === name ? (
                <Component {...props} />
              ) : (
                <>
                  {state.user.role !== name && state.user.role === 'admin' ? (
                    <Redirect
                      to={{
                        pathname: '/admin',
                        state: props.location,
                      }}
                    />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                      }}
                    />
                  )}
                </>
              )}
            </>
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
