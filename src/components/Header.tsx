import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { selectAuthenticated } from "../redux/selectors/authSelectors";
import { connect } from "react-redux";
import { IRootState } from "../redux/store";

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

interface IHeaderProps {
  authenticated: boolean;
}

const Header: React.FC<IHeaderProps> = ({ authenticated }) => {
  const styles = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            Mental Health Portal
          </Typography>
          {authenticated ? (
            <>
              <Button
                to="/dashboard"
                component={Link}
                color="inherit"
                startIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
              <Button
                to="/profile"
                component={Link}
                color="inherit"
                startIcon={<PersonIcon />}
              >
                Profile
              </Button>
            </>
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

const mapStateToProps = (state: IRootState) => ({
  authenticated: selectAuthenticated(state),
});

export default connect(mapStateToProps)(Header);
