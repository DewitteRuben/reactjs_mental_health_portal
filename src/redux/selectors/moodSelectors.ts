import { IRootState } from "../store";
import { IMoodEntry } from "../reducers/moodReducer";

const selectMoodEntries = (state: IRootState) => state.mood.entries;

const selectMoodEntriesDateAsc = (state: IRootState) =>
  state.mood.entries.sort(
    (a: IMoodEntry, b: IMoodEntry) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const selectMoodStatus = (state: IRootState) => state.mood.status;

const selectMoodLoading = (state: IRootState) => state.mood.loading;

export {
  selectMoodEntries,
  selectMoodStatus,
  selectMoodLoading,
  selectMoodEntriesDateAsc,
};
