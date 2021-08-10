import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
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

  // contexts
  const { state: stateUser } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const listenNotifications = () => {
    socket.current.on('new-notifications', (data) => {
      console.log(data, 'data');
      setNotifications(data);
    });
  };

  useEffect(() => {
    socket.current = io.connect('http://localhost:5000', {
      transports: ['websocket'],
      query: {
        token: stateUser.token,
      },
    });

    listenNotifications();
    return () => {
      socket.current.disconnect();
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
