import { Action, ActionCreator, Dispatch } from "redux";
import { ITask, ITaskStatus } from "../reducers/taskReducer";
import { IRootState } from "../store";
import { authUser } from "../../api/moodApi";
import { getTasks, addTask, removeTask } from "../../api/taskApi";
import { checkToken } from "./authActions";

const TASK_ACTIONS = {
  ADD_TASK_ACTION: "ADD_TASK_ACTION",
  REMOVE_TASK_ACTION: "REMOVE_TASK_ACTION",
  SET_TASKS_ACTION: "SET_TASKS_ACTION",
  UPDATE_TASK_STATE_ACTION: "UPDATE_TASK_STATE_ACTION",
  SET_TASK_ERROR_ACTION: "SET_TASK_ERROR_ACTION",
};

export interface IAddTaskAction extends Action {
  task: ITask;
}

export interface ISetTasksAction extends Action {
  tasks: ITask[];
  userId: string;
}

export interface IUpdateTaskStateAction extends Action {
  status: ITaskStatus;
  loading: boolean;
}

export interface ISetTaskErrorAction extends Action {
  error?: Error;
}

export interface IRemoveTaskAction extends Action {
  taskId: string;
}

const addTaskAction: ActionCreator<IAddTaskAction> = (task: ITask) => ({
  task,
  type: TASK_ACTIONS.ADD_TASK_ACTION,
});

const setTaskErrorAction: ActionCreator<ISetTaskErrorAction> = (
  error?: Error
) => ({
  error,
  type: TASK_ACTIONS.SET_TASK_ERROR_ACTION,
});

const removeTaskAction: ActionCreator<IRemoveTaskAction> = (
  taskId: string
) => ({
  type: TASK_ACTIONS.REMOVE_TASK_ACTION,
  taskId,
});

const updateTaskStateAction: ActionCreator<IUpdateTaskStateAction> = (
  status: ITaskStatus,
  loading: boolean
) => ({
  status,
  loading,
  type: TASK_ACTIONS.UPDATE_TASK_STATE_ACTION,
});

const fetchTasks = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const prevUserId = getState().task.userId || "";

    if (prevUserId === userId) {
      return;
    }

    dispatch(updateTaskStateAction("FETCHING", true));
    const { token } = await authUser(userId);
    const tasks = await getTasks(token);
    dispatch(setTasksAction(tasks, userId));
  } catch (error) {
    dispatch(setTaskErrorAction(error));
  }
};

const fetchRemoveTask = (taskId: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const { token } = await checkToken(dispatch, getState);
  dispatch(updateTaskStateAction("FETCHING", true));
  try {
    const { task } = await removeTask(token)(taskId);
    dispatch(removeTaskAction(task.taskId));
  } catch (error) {
    dispatch(setTaskErrorAction(error));
  }
};

const fetchAddTask = (
  title: string,
  description: string,
  userId: string
) => async (dispatch: Dispatch, getState: () => IRootState) => {
  const { token } = await checkToken(dispatch, getState);
  dispatch(updateTaskStateAction("FETCHING", true));
  try {
    const { task } = await addTask(token)(title, description, userId);
    dispatch(addTaskAction(task));
  } catch (error) {
    dispatch(setTaskErrorAction(error));
  }
};

const setTasksAction: ActionCreator<ISetTasksAction> = (
  tasks: ITask[],
  userId: string
) => ({
  type: TASK_ACTIONS.SET_TASKS_ACTION,
  tasks,
  userId,
});

export type ITaskAction =
  | IAddTaskAction
  | ISetTasksAction
  | IUpdateTaskStateAction
  | ISetTaskErrorAction;

export { TASK_ACTIONS, fetchAddTask, fetchTasks, fetchRemoveTask };
