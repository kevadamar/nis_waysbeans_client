import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import { UserContext } from '../../contexts/UserContext';
import { LOGIN, LOGOUT } from '../../contexts/UserContext/action';

import {
  getDataLocalStorage,
  removeDataLocalStorage,
  saveToLocalStorage,
} from '../../Helpers';
import CustomDropdown from '../CustomDropdown';
import ModalSignin from '../ModalSignin';
import ModalSignup from '../ModalSignup';
import ButtonReuse from '../ButtonReuse';

import BrandLogo from '../../assets/brand.png';
import IconUser from '../../assets/icon_user.png';
import { Avatar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartIconButton from '../CartIconButton';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    padding: '5px 100px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: '10px',
  },
  sectionDesktop: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '215px',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Header = () => {
  const classes = useStyles();

  // contexts
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);

  // state show dropdown user
  const [userDropdownShow, setUserDropdownShow] = useState(false);

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  // handle submit login
  const handleSubmitSignin = (payload) => {
    const { user, token } = payload;
    dispatchUser({ type: LOGIN, payload: user });
    // console.log(payload);
    saveToLocalStorage({ key: 'user', payload: user });
    saveToLocalStorage({ key: 'token', payload: token });
  };

  // handle submit signup
  const handleSubmitSignup = (data) => {
    const { isSignUp } = data;

    if (!isSignUp) {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    }
  };

  const handleModalTo = ({ name }) => {
    if (name === 'signIn') {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    } else {
      setShow((currentState) => ({
        ...currentState,
        signIn: false,
        signUp: true,
      }));
    }
  };

  const handleModalShow = ({ name }) => {
    setShow((currentState) => ({
      ...currentState,
      [name]: !currentState[name],
    }));
  };

  const handleLogout = () => {
    setShow({
      signIn: false,
      signUp: false,
      nameSignIn: 'signIn',
      nameSignUp: 'signUp',
    });
    setUserDropdownShow(false);
    removeDataLocalStorage({ key: 'user' });
    removeDataLocalStorage({ key: 'token' });
    dispatchUser({ type: LOGOUT });
  };

  // render
  useEffect(() => {
    const auth = getDataLocalStorage({ key: 'user' });

    if (auth) {
      dispatchUser({ type: LOGIN, payload: auth });
    } else {
      dispatchUser({ type: LOGOUT });
    }
  }, []);

  const BtnNotLogin = () => {
    return (
      <>
        {show.signIn && (
          <ModalSignin
            show={show.signIn}
            handleClose={() => handleModalShow({ name: show.nameSignIn })}
            handleTo={() => handleModalTo({ name: show.nameSignUp })}
            handleSubmitLogin={handleSubmitSignin}
          />
        )}
        <Box
          style={{
            width: '100px',
            paddingTop: '12px',
            paddingBottom: '12px',
            marginRight: '10px',
          }}
        >
          <ButtonReuse
            color="primary"
            onClick={() => handleModalShow({ name: show.nameSignIn })}
          >
            Login
          </ButtonReuse>
        </Box>
        {show.signUp && (
          <ModalSignup
            show={show.signUp}
            handleClose={() => handleModalShow({ name: show.nameSignUp })}
            handleTo={() => handleModalTo({ name: show.nameSignIn })}
            handleSubmitSignup={handleSubmitSignup}
          />
        )}
        <Box
          style={{ width: '100px', paddingTop: '12px', paddingBottom: '12px' }}
        >
          <ButtonReuse
            variant="contained"
            color="primary"
            onClick={() => handleModalShow({ name: show.nameSignUp })}
          >
            Register
          </ButtonReuse>
        </Box>
      </>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default" elevation={10}>
        <Toolbar className={classes.appBar}>
          <Link to="/">
            <img alt="Brand Logo" src={BrandLogo} height="42px" />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {stateUser.isLogin ? (
              <>
                {stateUser.user.role === 'user' && <CartIconButton />}
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={() =>
                    setUserDropdownShow((currentState) => !currentState)
                  }
                  color="inherit"
                >
                  <Avatar
                    alt="your name"
                    src={
                      !stateUser.user.photo ? IconUser : stateUser.user.photo
                    }
                  />
                </IconButton>
                {userDropdownShow && (
                  <CustomDropdown
                    handleLogout={handleLogout}
                    hideDropdown={() =>
                      setUserDropdownShow((currentState) => !currentState)
                    }
                  />
                )}
              </>
            ) : (
              <BtnNotLogin />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
