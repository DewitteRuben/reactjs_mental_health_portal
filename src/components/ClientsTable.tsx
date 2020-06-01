import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { IClient } from "../api/authApi";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface IClientsTableProps {
  clients: IClient[];
  onClick?: (client: IClient) => void;
  onDelete?: (client: IClient) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    interactableRow: {
      cursor: "pointer",
    },
    noClients: {
      padding: theme.spacing(2),
    },
  })
);

const ClientsTable: React.FC<IClientsTableProps> = ({
  clients,
  onClick,
  onDelete,
}) => {
  const styles = useStyles();

  const handleOnClientRowClick = (client: IClient) => (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(client);
    }
  };

  const handleOnClickDelete = (client: IClient) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (onDelete) {
      onDelete(client);
    }
  };

  return (
    <>
      {clients.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>UserId</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel>Email</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel>First name</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel>Last name</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel>Birthdate</TableSortLabel>
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client: IClient) => {
                const {
                  userId,
                  firstName,
                  lastName,
                  birthDate,
                  email,
                } = client;

                return (
                  <TableRow
                    key={userId}
                    className={styles.interactableRow}
                    hover
                    onClick={handleOnClientRowClick(client)}
                  >
                    <TableCell component="th" scope="row">
                      {userId}
                    </TableCell>
                    <TableCell align="right">{email}</TableCell>
                    <TableCell align="right">{firstName}</TableCell>
                    <TableCell align="right">{lastName}</TableCell>
                    <TableCell align="right">{birthDate}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={handleOnClickDelete(client)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper className={styles.noClients}>
          <Typography>No clients have been registered yet.</Typography>
        </Paper>
      )}
    </>
  );
};

export default ClientsTable;
