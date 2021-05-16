import { createMuiTheme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1F1F1F',
    },
    secondary: {
      main: '#1F1F1F',
    },
  },
});
