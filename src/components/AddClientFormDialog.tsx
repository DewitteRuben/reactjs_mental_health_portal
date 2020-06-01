import React from "react";

import AddClientForm, { IPartialAddClientFormData } from "./AddClientForm";
import Dialog from "./Dialog";

export interface IAddClientFormData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

interface IAddClientFormDialogProps {
  visible?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
  onSubmit?: (formData: IAddClientFormData) => void;
}

const AddClientFormDialog: React.FC<IAddClientFormDialogProps> = ({
  visible,
  onVisibilityChange,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<IPartialAddClientFormData>({
    birthDate: null,
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleOnFormDataChange = React.useCallback(
    (formData: IPartialAddClientFormData) => {
      setFormData(formData);
    },
    []
  );

  const handleOnSubmit = () => {
    const { birthDate } = formData;
    if (onSubmit && birthDate) {
      onSubmit(formData as IAddClientFormData);
    }
  };

  return (
    <Dialog
      id="add-client-form-dialog"
      visible={visible}
      title="Link client to professional"
      text="Please add the following details of your client:"
      onVisibilityChange={onVisibilityChange}
      onClickPrimary={handleOnSubmit}
      primaryText="Register"
      secondaryText="Close"
      closePrimary
      closeSecondary
    >
      <AddClientForm onChange={handleOnFormDataChange} />
    </Dialog>
  );
};

export default AddClientFormDialog;
