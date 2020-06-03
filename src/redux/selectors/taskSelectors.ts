import { IRootState } from "../store";

const selectTasks = (state: IRootState) => state.task.tasks;

export { selectTasks };
