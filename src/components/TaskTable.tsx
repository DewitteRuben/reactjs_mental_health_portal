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
  Typography,
  Paper,
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
import DeleteTaskDialog from "./DeleteTaskDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
    noTasks: {
      padding: theme.spacing(2),
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

    const [selectedTask, setSelectedTask] = React.useState("");
    const [visible, setVisibility] = React.useState({
      addDialog: false,
      deleteDialog: false,
    });

    const handleOnDeleteClick = (taskId: string) => () => {
      setSelectedTask(taskId);
      updateVisibility("deleteDialog", true);
    };

    const updateVisibility = React.useCallback(
      (dialog: keyof typeof visible, value: boolean) => {
        setVisibility((visible) => ({ ...visible, [dialog]: value }));
      },
      [visible]
    );

    const handleOnVisibilityChange = (dialog: keyof typeof visible) => (
      value: boolean
    ) => {
      updateVisibility(dialog, value);
    };

    const displayAddModal = React.useCallback(() => {
      updateVisibility("addDialog", true);
    }, [updateVisibility]);

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
          <Button onClick={displayAddModal} startIcon={<AddIcon />}>
            Assign Task
          </Button>
        </Toolbar>
        {tasks.length ? (
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
                      <IconButton onClick={handleOnDeleteClick(task.taskId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper className={styles.noTasks}>
            <Typography>No tasks have been assigned yet.</Typography>
          </Paper>
        )}
        <AddTaskDialog
          onVisibilityChange={handleOnVisibilityChange("addDialog")}
          visible={visible.addDialog}
          onSubmit={handleOnSubmit}
        />
        <DeleteTaskDialog
          onVisibilityChange={handleOnVisibilityChange("deleteDialog")}
          visible={visible.deleteDialog}
          taskId={selectedTask}
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
