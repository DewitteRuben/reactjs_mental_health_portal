import {
  ITaskAction,
  TASK_ACTIONS,
  ISetTasksAction,
  IAddTaskAction,
  ISetTaskErrorAction,
} from "../actions/taskActions";

export type ITaskStatus = "IDLE" | "FETCHING" | "FINISHED" | "FAILED";

export interface ITask {
  userId: string;
  taskId: string;
  professionalId: string;
  title: string;
  description: string;
  dateOfCompletion?: Date;
  completed: boolean;
}

interface ITaskStore {
  userId?: string;
  error?: Error;
  status: ITaskStatus;
  tasks: ITask[];
  loading: boolean;
}

const initialState: ITaskStore = {
  status: "IDLE",
  loading: false,
  tasks: [],
};

const taskReducer = (state = initialState, action: ITaskAction): ITaskStore => {
  switch (action.type) {
    case TASK_ACTIONS.SET_TASKS_ACTION: {
      const { tasks, userId } = action as ISetTasksAction;
      return { ...state, tasks, userId, loading: false, status: "FINISHED" };
    }
    case TASK_ACTIONS.ADD_TASK_ACTION: {
      const { tasks } = state;
      const { task } = action as IAddTaskAction;
      return {
        ...state,
        tasks: [...tasks, task],
        loading: false,
        status: "FINISHED",
      };
    }
    case TASK_ACTIONS.SET_TASK_ERROR_ACTION: {
      const { error } = action as ISetTaskErrorAction;
      return { ...state, error, loading: false, status: "FAILED" };
    }
    default:
      return state;
  }
};

export { taskReducer };
