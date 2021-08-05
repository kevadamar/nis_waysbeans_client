import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { getDataLocalStorage } from './Helpers';
import { setAuthToken } from './config';
import Home from './pages/Home';
import PrivateRoute from './Helpers/PrivateRoute';
import Admin from './pages/Admin';
import DetailProduct from './pages/DetailProduct';
import Product from './pages/Product';
import Header from './components/Header';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import './App.css';

import MyProducts from './pages/MyProducts';
import AddProduct from './pages/AddProduct';

const token = getDataLocalStorage({ key: 'token' });
if (token) {
  setAuthToken(token);
}

function App() {
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
              path="/admin/my-products"
              component={MyProducts}
            />
            <PrivateRoute
              name="admin"
              exact
              path="/admin/my-products/add"
              component={AddProduct}
            />
            <PrivateRoute
              name="admin"
              exact
              path="/admin/my-products/:action/:id"
              component={Product}
            />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
