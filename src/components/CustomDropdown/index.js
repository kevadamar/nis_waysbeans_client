import { useHistory } from 'react-router';

import Styles from './CustomDropdown.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import logoutIcon from '../../assets/icon_logout.png';
import beanIcon from '../../assets/icon_bean.png';
import userIcon from '../../assets/icon_account.png';
import { Divider } from '@material-ui/core';
import { globalStyles } from '../../styles/globalStyles';

const CustomDropdown = ({ handleLogout, hideDropdown }) => {
  const classes = globalStyles();

  const { state: stateUser } = useContext(UserContext);
  const router = useHistory();

  const handleLogoutClick = () => {
    router.push('/');
    handleLogout();
  };

  //dropdown user
  const DropdownUser = () => {
    return (
      <>
        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            hideDropdown();
            router.push('/profile');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={userIcon}
            alt="user icon"
            width="30px"
          />
          <p className={Styles.textMenu}>Profile</p>
        </div>
      </>
    );
  };

  //dropdown owner
  const DropdownOwner = () => {
    return (
      <>
        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            hideDropdown();
            router.push('/admin/add');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={beanIcon}
            alt="user icon"
            width="30px"
          />
          <p className={Styles.textMenu}>Add Product</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={Styles.dropdown}>
        <span className={Styles.caretDown}></span>
        <span className={Styles.caretDown2}></span>

        {stateUser.user.role === 'user' ? <DropdownUser /> : <DropdownOwner />}

        <Divider className={classes.identityBackgroundColor} color="#613D2B" />
        <div className={Styles.dropdownMenu} onClick={handleLogoutClick}>
          <img
            className={Styles.menuIcon}
            src={logoutIcon}
            alt="user icon"
            width="30px"
          />
          <p className={Styles.textMenu}>Logout</p>
        </div>
      </div>
    </>
  );
};

export default CustomDropdown;
