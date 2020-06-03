import React from "react";
import { IRootState } from "../redux/store";
import { ITask } from "../redux/reducers/taskReducer";
import { selectTaskByTaskId } from "../redux/selectors/taskSelectors";
import { connect } from "react-redux";
import AddTaskForm, { IAddTaskFormData } from "./AddTaskForm";

interface IEditTaskFormProps {
  taskId: string;
  onChange?: (data: IAddTaskFormData) => void;
  getTaskById: (taskId: string) => ITask | undefined;
}

const task2AddFormData = (task: ITask) => ({
  title: task.title,
  description: task.description,
});

const EditTaskForm: React.FC<IEditTaskFormProps> = ({
  taskId,
  getTaskById,
  onChange,
}) => {
  const task = getTaskById(taskId);

  if (!task) return null;

  return <AddTaskForm onChange={onChange} data={task2AddFormData(task)} />;
};

const mapStateToProps = (state: IRootState) => ({
  getTaskById: (taskId: string) => selectTaskByTaskId(taskId)(state),
});

export default connect(mapStateToProps)(EditTaskForm);
