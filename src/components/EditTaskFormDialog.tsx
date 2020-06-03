import React from "react";
import Dialog from "./Dialog";
import { IAddTaskFormData } from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";

interface IEditTaskDialogProps {
  visible?: boolean;
  taskId: string;
  onVisibilityChange?: (visibility: boolean) => void;
  onSubmit?: (formData: IAddTaskFormData) => void;
}

const EditTaskDialog: React.FC<IEditTaskDialogProps> = ({
  visible,
  onVisibilityChange,
  onSubmit,
  taskId,
}) => {
  const [formData, setFormData] = React.useState<IAddTaskFormData>();

  const handleOnSubmit = React.useCallback(() => {
    if (onSubmit && formData) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

  return (
    <Dialog
      id="Edit-task-form-dialog"
      visible={visible}
      title="Edit an existing task"
      text="Please provide the details of the task:"
      onVisibilityChange={onVisibilityChange}
      onClickPrimary={handleOnSubmit}
      primaryText="Update"
      secondaryText="Cancel"
      closePrimary
      closeSecondary
    >
      <EditTaskForm onChange={setFormData} taskId={taskId} />
    </Dialog>
  );
};

export default EditTaskDialog;
