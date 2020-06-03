import { IRootState } from "../store";
import _ from "lodash";

const selectTasks = (state: IRootState) => state.task.tasks;

const selectTaskByTaskId = (taskId: string) => (state: IRootState) =>
  _.find(state.task.tasks, { taskId });

export { selectTasks, selectTaskByTaskId };
