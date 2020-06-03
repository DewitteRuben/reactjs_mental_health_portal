import React from "react";
import Dialog from "./Dialog";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { fetchRemoveTask } from "../redux/actions/taskActions";

interface IDeleteTaskDialogProps {
  visible?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
  taskId: string;
  fetchRemoveTask: (taskId: string) => void;
}

const DeleteTaskDialog: React.FC<IDeleteTaskDialogProps> = ({
  visible,
  onVisibilityChange,
  taskId,
  fetchRemoveTask,
}) => {
  const onHandleConfirm = () => {
    fetchRemoveTask(taskId);
  };

  return (
    <Dialog
      title={`Unassign task`}
      text={`Do you wish to unassign the task from the client?.`}
      primaryText="Confirm"
      visible={visible}
      onVisibilityChange={onVisibilityChange}
      secondaryText="Cancel"
      onClickPrimary={onHandleConfirm}
      closePrimary
      closeSecondary
    />
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchRemoveTask: (taskId: string) => dispatch(fetchRemoveTask(taskId)),
});

export default connect(null, mapDispatchToProps)(DeleteTaskDialog);
