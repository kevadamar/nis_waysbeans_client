import { makeStyles } from '@material-ui/core';

export const detailStyles = makeStyles((theme) => ({
  description: {
    lineClamp: 7,
    boxOrient: 'vertical',
    display: 'box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '20px',
  },
  iconSize: {
    height: '3em',
    width: '3em',
    color: 'red'
  },
}));
