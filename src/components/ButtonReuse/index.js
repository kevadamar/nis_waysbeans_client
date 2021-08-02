import {
  Button,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { brown } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: brown,
  },
});

const customButtonStyle = makeStyles((theme) => ({
  defaultBtn: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
    borderColor: 'transparent !important',
  },
}));

const inlineStyle = {
  button: {
    border: '2px solid',
    borderRadius: '10px',
  },
};

const ButtonReuse = (props) => {
  const classes = customButtonStyle();
  const { children, style, ...others } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button
        {...others}
        disableElevation
        className={classes.defaultBtn}
        style={{ ...inlineStyle.button, ...style }}
        fullWidth
      >
        {children || 'Default Button'}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonReuse;
