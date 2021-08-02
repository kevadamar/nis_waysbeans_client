import { makeStyles } from '@material-ui/core';

export const cardStyles = makeStyles(() => ({
  root: {
    maxWidth: 241,
    backgroundColor: '#F6E6DA',
  },
  title: {
    color: '#613D2B',
    lineClamp: 1,
    boxOrient: 'vertical',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subTitle: {
    color: '#974A4A',
  },
}));
