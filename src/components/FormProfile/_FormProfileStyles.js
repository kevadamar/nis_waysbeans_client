import { makeStyles } from '@material-ui/core';

export const formProfileStyles = makeStyles((thene) => ({
  containerImg: {
    height: '35vh',
    transition: 'ease-in .2s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'lightgrey',
      borderRadius: '10px',
    },
  },
  containerIcon: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'ease-in .2s',
    '&:hover': {
      backgroundColor: 'lightgrey',
      borderRadius: '10px',
    },
  },
  icon: {
    fontSize: '15em',
    cursor: 'pointer',
  },
}));
