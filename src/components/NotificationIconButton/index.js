import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { useRef, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  connectSocketIO,
  listenNotifications,
  loadNotifications,
} from '../../config';
import { UserContext } from '../../contexts/UserContext';

import { globalStyles } from '../../styles/globalStyles';
import NotificationsDropdown from '../NotificationsDropdown';

const notificationStyles = makeStyles((theme) => ({
  colorPrimary: {
    '&.MuiBadge-root .MuiBadge-badge': {
      color: 'white',
      backgroundColor: '#D48E48',
    },
  },
}));

function NotificationIconButton() {
  const socket = useRef();

  const classes = globalStyles();
  const localClasses = notificationStyles();

  const router = useHistory();

  const { state: stateUser } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.current = connectSocketIO({ token: stateUser.token });

    listenNotifications({socket, cb: (data) => setNotifications(data)})

    loadNotifications({socket});

    return () => {
      socket.current.disconnect()
    };
  }, []);

  return (
    <>
      <IconButton
        aria-label={`show ${notifications?.length} new orders`}
        color="inherit"
        onClick={() => setShowDropdown((currState) => !currState)}
        style={{ width: '65px', height: '64px' }}
      >
        <Badge
          badgeContent={notifications?.length}
          className={localClasses.colorPrimary}
          overlap="circular"
        >
          <Notifications className={classes.identityColor} />
        </Badge>
      </IconButton>

      {showDropdown && (
        <NotificationsDropdown
          data={notifications}
          onClick={() => {
            setShowDropdown(false);
            router.push('/admin');
          }}
        />
      )}
    </>
  );
}

export default NotificationIconButton;
