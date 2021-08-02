import { makeStyles } from '@material-ui/core';

export const primaryColor = '#613D2B';
export const secondaryColor = '#F6E6DA';
export const thirdColor = '#974A4A';

export const globalStyles = makeStyles((theme) => ({
  identityColor: {
    color: primaryColor,
  },
  secondaryColor: {
    color: secondaryColor,
  },
  thirdColor: {
    color: thirdColor,
  },
  identityBackgroundColor: {
    backgroundColor: primaryColor,
  },
  secondaryBackgroundColor: {
    backgroundColor: secondaryColor,
  },
}));
