import React from "react";
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import InputSearch from "./InputSearch";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface IClientsTableToolbarProps {
  onAdd?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
}

const ClientsTableToolbar: React.FC<IClientsTableToolbarProps> = ({
  onAdd,
  title,
}) => {
  const styles = useStyles();

  return (
    <Toolbar className={styles.toolbar}>
      <Typography variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
      <InputSearch />
      <Button onClick={onAdd} startIcon={<AddIcon />}>
        Add Client
      </Button>
    </Toolbar>
  );
};

export default ClientsTableToolbar;
