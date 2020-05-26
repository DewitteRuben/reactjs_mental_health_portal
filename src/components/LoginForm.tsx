import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
  Input,
} from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles({
  title: {
    fontSize: "2.625rem",
  },
  subtitle: {
    fontSize: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    alignSelf: "flex-end",
  },
});

const LoginForm: React.FC = () => {
  const styles = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: string) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.subtitle} variant="h2">
          Account login
        </Typography>
        <Box marginBottom={1} />
        <form className={styles.form}>
          <TextField
            onChange={handleChange("email")}
            id="emailAddress"
            label="Email address"
          />
          <Box marginBottom={2} />
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              onChange={handleChange("password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box marginBottom={2} />
          <Button className={styles.submit} variant="contained" color="primary">
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
