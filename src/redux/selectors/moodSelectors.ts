import { IRootState } from "../store";

const selectMoodEntries = (state: IRootState) => state.mood.entries;

export { selectMoodEntries };
