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
import AddTaskDialog from "./AddTaskDialog";
import { IAddTaskFormData } from "./AddTaskForm";
import { connect } from "react-redux";
import { ITask } from "../redux/reducers/taskReducer";
import { ThunkDispatch } from "redux-thunk";
import { fetchAddTask } from "../redux/actions/taskActions";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface ITaskTableProps {
  tasks: ITask[];
  userId: string;
  fetchAddTask: (title: string, description: string, userId: string) => void;
}

const TaskTable: React.FC<ITaskTableProps> = React.memo(
  ({ tasks, userId, fetchAddTask }) => {
    const styles = useStyles();

    const [visible, setVisibility] = React.useState(false);

    const displayModal = React.useCallback(() => {
      setVisibility(true);
    }, []);

    const handleOnSubmit = React.useCallback(
      (formData: IAddTaskFormData) => {
        const { title, description } = formData;
        fetchAddTask(title, description, userId);
      },
      [fetchAddTask, userId]
    );

    return (
      <>
        <Toolbar className={styles.toolbar}>
          <Button onClick={displayModal} startIcon={<AddIcon />}>
            Assign Task
          </Button>
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
              {tasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell align="right">{task.title}</TableCell>
                  <TableCell align="right">{task.description}</TableCell>
                  <TableCell align="right">
                    {task.completed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {task.dateOfCompletion
                      ? moment(task.dateOfCompletion).format("LL")
                      : "Not yet completed"}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddTaskDialog
          onVisibilityChange={setVisibility}
          visible={visible}
          onSubmit={handleOnSubmit}
        />
      </>
    );
  }
);

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchAddTask: (title: string, description: string, userId: string) =>
    dispatch(fetchAddTask(title, description, userId)),
});

export default connect(null, mapDispatchToProps)(TaskTable);
