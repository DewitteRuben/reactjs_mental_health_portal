import React from "react";
import { TextField } from "@material-ui/core";
import Datepicker from "./Datepicker";

export interface IPartialAddClientFormData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
}

interface IAddClientFormProps {
  onChange?: (formData: IPartialAddClientFormData) => void;
}

const AddClientForm: React.FC<IAddClientFormProps> = ({ onChange }) => {
  const [selectedDate, setDate] = React.useState<Date | null>(null);

  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const onValueChange = (key: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setValues((values) => ({ ...values, [key]: value }));
  };

  const onDateChange = (
    date: Date | null,
    value?: string | null | undefined
  ) => {
    setDate(date);
  };

  React.useEffect(() => {
    if (onChange) {
      onChange({ ...values, birthDate: selectedDate });
    }
  }, [onChange, selectedDate, values]);

  return (
    <div>
      <TextField
        margin="normal"
        id="emailAddress"
        label="Email address"
        type="email"
        onChange={onValueChange("email")}
        fullWidth
      />
      <TextField
        margin="normal"
        id="firstName"
        label="First name"
        onChange={onValueChange("firstName")}
        fullWidth
      />
      <TextField
        margin="normal"
        id="lastName"
        label="Last name"
        onChange={onValueChange("lastName")}
        fullWidth
      />
      <Datepicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="birthdate"
        label="Birthdate"
        value={selectedDate}
        onChange={onDateChange}
        fullWidth
      />
    </div>
  );
};

export default AddClientForm;
