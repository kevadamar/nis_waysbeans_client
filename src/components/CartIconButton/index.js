import { Avatar, Badge, IconButton } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { SET_CART } from '../../contexts/UserContext/action';
import { services } from '../../services';
import IconCart from '../../assets/icon_cart.png';
import { useHistory } from 'react-router-dom';

const CartIconButton = (props) => {
  const router = useHistory();

  // contexts
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);

  const handleCountCart = async () => {
    const data = await services.countCart();
    dispatchUser({ type: SET_CART, payload: data });
  };

  useEffect(() => {
    handleCountCart();
  }, [stateUser.countCart]);

  return (
    <IconButton
      aria-label={`show ${stateUser.countCart} new Carts`}
      color="inherit"
      onClick={() => router.push('/cart')}
    >
      <Badge
        badgeContent={stateUser.countCart}
        color="secondary"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Avatar alt="Cart" style={{ backgroundColor: 'transparent' }}>
          <img alt="cars" src={IconCart} width="75%" />
        </Avatar>
      </Badge>
    </IconButton>
  );
};

export default CartIconButton;
