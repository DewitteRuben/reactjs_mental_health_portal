import { IRootState } from "../store";
import { Dispatch, Action, ActionCreator } from "redux";
import { authUser, getMoodEntries } from "../../api/moodApi";
import { IMoodEntry, IMoodStatus } from "../reducers/moodReducer";

const MOOD_ACTIONS = {
  SET_MOOD_ENTRIES_ACTION: "SET_MOOD_ENTRIES_ACTION",
  SET_MOOD_ERROR_ACTION: "SET_MOOD_ERROR_ACTION",
  UPDATE_MOOD_LOADING_STATE_ACTION: "UPDATE_MOOD_LOADING_STATE_ACTION",
};

export interface ISetMoodEntriesAction extends Action {
  entries: IMoodEntry[];
}

export interface IUpdateLoadingStateAction extends Action {
  status: IMoodStatus;
  loading: boolean;
}

export interface ISetMoodErrorAction extends Action {
  error?: Error;
}

const updateLoadingStateAction: ActionCreator<IUpdateLoadingStateAction> = (
  status: IMoodStatus,
  loading: boolean
) => ({
  status,
  loading,
  type: MOOD_ACTIONS.UPDATE_MOOD_LOADING_STATE_ACTION,
});

const setMoodErrorAction: ActionCreator<ISetMoodErrorAction> = (error: Error) => ({
  type: MOOD_ACTIONS.SET_MOOD_ERROR_ACTION,
  error,
});

const setMoodEntriesAction: ActionCreator<ISetMoodEntriesAction> = (
  entries: IMoodEntry[]
) => ({
  type: MOOD_ACTIONS.SET_MOOD_ENTRIES_ACTION,
  entries,
});

export type MoodActions =
  | ISetMoodEntriesAction
  | ISetMoodErrorAction
  | IUpdateLoadingStateAction;

const fetchMoodEntriesByUserId = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    dispatch(updateLoadingStateAction("FETCHING", true));
    const { token } = await authUser(userId);
    const entries = await getMoodEntries(token);
    dispatch(setMoodEntriesAction(entries));
  } catch (error) {
    dispatch(setMoodErrorAction(error));
  }
};

export {
  MOOD_ACTIONS,
  setMoodEntriesAction,
  updateLoadingStateAction,
  setMoodErrorAction,
  fetchMoodEntriesByUserId,
};
