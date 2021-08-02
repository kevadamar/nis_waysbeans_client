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
}));
