import { makeStyles } from '@material-ui/core';
import { secondaryColor } from '../../styles/globalStyles';

export const cartStyles = makeStyles((theme) => ({
  qty: {
    width: '30px',
    height: '30px',
    backgroundColor: secondaryColor,
    borderRadius: '5px',
    textAlign: 'center',
  },
  qtyZero: {
    width: '30px',
    height: '30px',
    backgroundColor: '#cfd7e6',
    borderRadius: '5px',
    textAlign: 'center',
  },
  rootCart: {
    height: '3em',
    width: '3em',
  },
}));
