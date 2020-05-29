import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { AuthContext } from "../store/authStore";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: React.FC = () => {
  const styles = useStyles();

  const { state, dispatch } = React.useContext(AuthContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            Mental Health Portal
          </Typography>
          {state.authenticated ? (
            <Button
              to="/profile"
              component={Link}
              color="inherit"
              startIcon={<PersonIcon />}
            >
              Profile
            </Button>
          ) : (
            <>
              <Button to="/register" component={Link} color="inherit">
                Register
              </Button>
              <Button to="/login" component={Link} color="inherit">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
