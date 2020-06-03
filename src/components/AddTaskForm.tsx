import React from "react";
import { TextField } from "@material-ui/core";

export interface IAddTaskFormData {
  title: string;
  description: string;
}

interface IAddTaskFormProps {
  onChange?: (data: IAddTaskFormData) => void;
}

const AddTaskForm: React.FC<IAddTaskFormProps> = ({ onChange }) => {
  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    if (onChange) {
      onChange({ ...values });
    }
  }, [onChange, values]);

  const onValueChange = (key: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setValues((values) => ({ ...values, [key]: value }));
  };

  return (
    <div>
      <TextField
        onChange={onValueChange("title")}
        label="Title"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={onValueChange("description")}
        label="Description"
        margin="normal"
        fullWidth
      />
    </div>
  );
};

export default AddTaskForm;
