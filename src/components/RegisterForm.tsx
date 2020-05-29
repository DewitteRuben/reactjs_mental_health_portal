import React from "react";
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
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormHelperText } from "@material-ui/core";
import { isValidEmail } from "../utils/string";
import Datepicker from "./Datepicker";

const useStyles = makeStyles({
  title: {
    fontSize: "2.625rem",
  },
  subtitle: {
    fontSize: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    alignSelf: "flex-end",
  },
});

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password: string;
  confirmPassword: string;
}

interface IRegisterFormProps {
  onSubmit?: (formData: IRegisterFormData) => void;
}

const errorMap: {
  [key: string]: {
    message: string;
    validation: (value1: any, value2?: any) => boolean;
  };
} = {
  firstName: {
    message: "This field is required",
    validation: (text: string) => !text.length,
  },
  lastName: {
    message: "This field is required.",
    validation: (text: string) => !text.length,
  },
  email: {
    message: "This field must contain a valid email address.",
    validation: (text: string) => !isValidEmail(text),
  },
  birthDate: {
    message: "This field is required.",
    validation: (date: Date | null) => !date,
  },
  password: {
    message: "This field is required.",
    validation: (text: string) => !text.length,
  },
  confirmPassword: {
    message: "This field must match the previous field.",
    validation: (passw: string, confPassw?: string) =>
      !passw || !confPassw || passw !== confPassw,
  },
};

const getErrorData = (
  enabled: boolean,
  key: keyof typeof errorMap,
  value1: any,
  value2?: any
) => {
  const { message, validation } = errorMap[key];
  return {
    message,
    state: enabled && validation(value1, value2),
    valid: validation(value1, value2),
  };
};

const RegisterForm: React.FC<IRegisterFormProps> = ({ onSubmit }) => {
  const styles = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const { firstName, lastName, email, password, confirmPassword } = values;
  const firstNameError = React.useMemo(
    () => getErrorData(submitted, "firstName", firstName),
    [firstName, submitted]
  );
  const lastNameError = React.useMemo(
    () => getErrorData(submitted, "lastName", lastName),
    [lastName, submitted]
  );
  const birthDateError = React.useMemo(
    () => getErrorData(submitted, "birthDate", selectedDate),
    [selectedDate, submitted]
  );
  const emailError = React.useMemo(
    () => getErrorData(submitted, "email", email),
    [email, submitted]
  );
  const passwordError = React.useMemo(
    () => getErrorData(submitted, "password", password),
    [password, submitted]
  );
  const confirmPasswordError = React.useMemo(
    () => getErrorData(submitted, "confirmPassword", password, confirmPassword),
    [confirmPassword, password, submitted]
  );

  const errorsStates = [
    firstNameError.valid,
    lastNameError.valid,
    birthDateError.valid,
    emailError.valid,
    passwordError.valid,
    confirmPasswordError.valid,
  ];

  const handleOnSubmit = React.useCallback(() => {
    setSubmitted(true);

    const isValid = errorsStates.filter((state) => state).length === 0;

    if (onSubmit && isValid) {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        birthDate: selectedDate as Date,
      };

      onSubmit(formData);
    }
  }, [
    confirmPassword,
    email,
    errorsStates,
    firstName,
    lastName,
    onSubmit,
    password,
    selectedDate,
  ]);

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.subtitle} variant="h2">
          Register professional
        </Typography>
        <form className={styles.form}>
          <Box width="100%" display="flex" justifyContent="space-between">
            <TextField
              error={firstNameError.state}
              fullWidth
              margin="normal"
              helperText={firstNameError.state && firstNameError.message}
              label="First name"
              onChange={handleChange("firstName")}
            />
            <Box marginLeft={1} />
            <TextField
              fullWidth
              margin="normal"
              error={lastNameError.state}
              helperText={lastNameError.state && lastNameError.message}
              label="Last name"
              onChange={handleChange("lastName")}
            />
          </Box>
          <Datepicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="birthdate"
            label="Birthdate"
            value={selectedDate}
            onChange={handleDateChange}
            error={birthDateError.state}
            helperText={birthDateError.state && birthDateError.message}
            fullWidth
          />
          <TextField
            onChange={handleChange("email")}
            margin="normal"
            error={emailError.state}
            helperText={emailError.state && emailError.message}
            id="emailAddress"
            label="Email address"
          />
          <FormControl error={passwordError.state} margin="normal">
            <InputLabel htmlFor="password" error={passwordError.state}>
              Password
            </InputLabel>
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
          <FormControl error={confirmPasswordError.state} margin="normal">
            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
            <Input
              id="confirmPassword"
              onChange={handleChange("confirmPassword")}
              type={values.showPassword ? "text" : "password"}
            />
            <FormHelperText>
              {confirmPasswordError.state && confirmPasswordError.message}
            </FormHelperText>
          </FormControl>
          <Button
            className={styles.submit}
            onClick={handleOnSubmit}
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
