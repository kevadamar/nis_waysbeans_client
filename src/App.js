import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './Helpers/PrivateRoute';
import Admin from './pages/Admin';
import DetailProduct from './pages/DetailProduct';
import AddProduct from './pages/AddProperty';
import { getDataLocalStorage } from './Helpers';
import { setAuthToken } from './config';
import Header from './components/Header';
import { Box } from '@material-ui/core';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import './App.css';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={DetailProduct} />

            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/cart/shipping" component={Shipping} />

            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/admin/add" component={AddProduct} />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
