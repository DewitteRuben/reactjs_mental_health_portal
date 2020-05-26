import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
      },
    },
  },
});

export default theme;
