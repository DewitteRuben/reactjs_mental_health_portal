import React from "react";
import Dialog from "./Dialog";
import AddTaskForm, { IAddTaskFormData } from "./AddTaskForm";

interface IAddTaskDialogProps {
  visible?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
  onSubmit?: (formData: IAddTaskFormData) => void;
}

const AddTaskDialog: React.FC<IAddTaskDialogProps> = ({
  visible,
  onVisibilityChange,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<IAddTaskFormData>({
    title: "",
    description: "",
  });

  const handleOnSubmit = React.useCallback(() => {
    if (onSubmit) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

  return (
    <Dialog
      id="add-task-form-dialog"
      visible={visible}
      title="Assign a task to your client"
      text="Please provide the details of the task:"
      onVisibilityChange={onVisibilityChange}
      onClickPrimary={handleOnSubmit}
      primaryText="Assign"
      secondaryText="Cancel"
      closePrimary
      closeSecondary
    >
      <AddTaskForm onChange={setFormData} />
    </Dialog>
  );
};

export default AddTaskDialog;
