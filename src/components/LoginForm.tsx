import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
  Input,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { isValidEmail } from "../utils/string";

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

const errorMap: {
  [key: string]: {
    message: string;
    validation: (value1: string) => boolean;
  };
} = {
  email: {
    message: "This field must contain a valid email address.",
    validation: (text: string) => !isValidEmail(text),
  },
  password: {
    message: "This field is required.",
    validation: (text: string) => !text.length,
  },
};

const getErrorData = (
  enabled: boolean,
  key: keyof typeof errorMap,
  value1: any
) => {
  const { message, validation } = errorMap[key];
  return {
    message,
    state: enabled && validation(value1),
    valid: validation(value1),
  };
};

export interface ILoginFormData {
  email: string;
  password: string;
}

interface ILoginFormProps {
  onSubmit?: (formData: ILoginFormData) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }) => {
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

  const emailError = getErrorData(true, "email", values.email);
  const passwordError = getErrorData(true, "password", values.password);

  const validationState = [emailError.valid, passwordError.valid];

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = values;

    const isValid = validationState.filter((state) => state).length === 0;

    if (isValid && onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.subtitle} variant="h2">
          Account login
        </Typography>
        <Box marginBottom={1} />
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <TextField
            onChange={handleChange("email")}
            id="emailAddress"
            error={emailError.state}
            helperText={emailError.state && emailError.message}
            label="Email address"
          />
          <Box marginBottom={2} />
          <FormControl error={passwordError.state}>
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
            <FormHelperText>
              {passwordError.state && passwordError.message}
            </FormHelperText>
          </FormControl>
          <Box marginBottom={2} />
          <Button
            type="submit"
            className={styles.submit}
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
