import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Box } from '@material-ui/core';
import { getDataLocalStorage } from './Helpers';
import { setAuthToken } from './config';
import Home from './pages/Home';
import PrivateRoute from './Helpers/PrivateRoute';
import Admin from './pages/Admin';
import DetailProduct from './pages/DetailProduct';
import AddProduct from './pages/AddProduct';
import Header from './components/Header';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import './App.css';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';

const token = getDataLocalStorage({ key: 'token' });
if (token) {
  setAuthToken(token);
}

function App() {
  const { state: stateUser } = useContext(UserContext);

  return (
    <Router>
      <Header />
      <Box height="100vh">
        <Box pt={15} pb={5}>
          <Switch>
            {/* default user route before login */}
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={DetailProduct} />

            {/* user route after login */}

            <PrivateRoute
              name="user"
              exact
              path="/profile"
              component={Profile}
            />
            <PrivateRoute name="user" exact path="/cart" component={Cart} />
            <PrivateRoute
              name="user"
              exact
              path="/cart/shipping"
              component={Shipping}
            />

            {/* admin route */}

            <PrivateRoute name="admin" exact path="/admin" component={Admin} />
            <PrivateRoute
              name="admin"
              exact
              path="/admin/add"
              component={AddProduct}
            />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
