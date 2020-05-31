import React from "react";
import Dialog from "./Dialog";
import { ThunkDispatch } from "redux-thunk";
import { fetchDeleteClient } from "../redux/actions/authActions";
import { connect } from "react-redux";

interface IDeleteClientDialogProps {
  visible?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
  userId: string;
  removeClient: (userId: string) => void;
}

const DeleteClientDialog: React.FC<IDeleteClientDialogProps> = ({
  visible,
  onVisibilityChange,
  userId,
  removeClient,
}) => {
  const onHandleConfirm = () => {
    removeClient(userId);
  };

  return (
    <Dialog
      title={`Unlink Client ${userId}`}
      text={`Do you wish to unlink the client from your account? This will also remove all data related to the client.`}
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
  removeClient: (userId: string) => dispatch(fetchDeleteClient(userId)),
});

export default connect(null, mapDispatchToProps)(DeleteClientDialog);
