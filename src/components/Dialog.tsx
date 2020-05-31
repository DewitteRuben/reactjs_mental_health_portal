import React from "react";
import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface IDialogProps {
  id?: string;
  visible?: boolean;
  onVisibilityChange?: (visibility: boolean) => void;
  text?: string;
  primaryText: string;
  onClickPrimary: () => void;
  secondaryText?: string;
  onClickSecondary?: () => void;
  closePrimary?: boolean;
  closeSecondary?: boolean;
}

const Dialog: React.FC<IDialogProps> = ({
  id,
  children,
  visible,
  onVisibilityChange,
  text,
  primaryText,
  onClickPrimary,
  secondaryText,
  onClickSecondary,
  closePrimary,
  closeSecondary,
}) => {
  const [dialog, setDialog] = React.useState(visible || false);

  React.useEffect(() => {
    setDialog(visible || false);
  }, [visible]);

  const handleClose = React.useCallback(() => {
    setDialog(false);
    if (onVisibilityChange) {
      onVisibilityChange(false);
    }
  }, [onVisibilityChange]);

  const handleOnClickPrimary = () => {
    onClickPrimary();
    if (closePrimary) {
      handleClose();
    }
  };

  const handleOnClickSecondary = () => {
    if (onClickSecondary) {
      onClickSecondary();
    }
    if (closeSecondary) {
      handleClose();
    }
  };

  return (
    <MUIDialog open={dialog} onClose={handleClose} aria-labelledby={id}>
      <DialogTitle id={id}>Link client to professional</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {secondaryText && (
          <Button onClick={handleOnClickSecondary} color="primary">
            {secondaryText}
          </Button>
        )}
        <Button onClick={handleOnClickPrimary} color="primary">
          {primaryText}
        </Button>
      </DialogActions>
    </MUIDialog>
  );
};
export default Dialog;
