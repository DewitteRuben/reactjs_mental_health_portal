import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
  Toolbar,
  Button,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

const TaskTable = () => {
  const styles = useStyles();

  return (
    <>
      <Toolbar className={styles.toolbar}>
        <Button startIcon={<AddIcon />}>Assign Task</Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <TableSortLabel>Title</TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel>Description</TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel>Has been completed</TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel>Date of completion</TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">Activity</TableCell>
              <TableCell align="right">Clean up your room today.</TableCell>
              <TableCell align="right">Yes</TableCell>
              <TableCell align="right">
                {new Date().toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
