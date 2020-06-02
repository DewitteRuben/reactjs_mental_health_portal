import { IRootState } from "../store";
import { Dispatch, Action, ActionCreator } from "redux";
import { authUser, getMoodEntries } from "../../api/moodApi";
import { IMoodEntry, IMoodStatus } from "../reducers/moodReducer";

const MOOD_ACTIONS = {
  SET_MOOD_ENTRIES_ACTION: "SET_MOOD_ENTRIES_ACTION",
  SET_MOOD_ERROR_ACTION: "SET_MOOD_ERROR_ACTION",
  UPDATE_MOOD_LOADING_STATE_ACTION: "UPDATE_MOOD_LOADING_STATE_ACTION",
  CLEAR_MOOD_ENTRIES_ACTION: "CLEAR_MOOD_ENTRIES_ACTION",
};

export interface ISetMoodEntriesAction extends Action {
  entries: IMoodEntry[];
  userId: string;
}

export interface IUpdateLoadingStateAction extends Action {
  status: IMoodStatus;
  loading: boolean;
}

export interface ISetMoodErrorAction extends Action {
  error?: Error;
}

export interface IClearMoodEntries extends Action {}

const clearMoodEntriesAction: ActionCreator<IClearMoodEntries> = () => ({
  type: MOOD_ACTIONS.CLEAR_MOOD_ENTRIES_ACTION,
});

const updateLoadingStateAction: ActionCreator<IUpdateLoadingStateAction> = (
  status: IMoodStatus,
  loading: boolean
) => ({
  status,
  loading,
  type: MOOD_ACTIONS.UPDATE_MOOD_LOADING_STATE_ACTION,
});

const setMoodErrorAction: ActionCreator<ISetMoodErrorAction> = (
  error: Error
) => ({
  type: MOOD_ACTIONS.SET_MOOD_ERROR_ACTION,
  error,
});

const setMoodEntriesAction: ActionCreator<ISetMoodEntriesAction> = (
  entries: IMoodEntry[],
  userId: string
) => ({
  type: MOOD_ACTIONS.SET_MOOD_ENTRIES_ACTION,
  entries,
  userId,
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
    const prevUserId = getState().mood.userId || "";

    if (prevUserId === userId) {
      return;
    }

    dispatch(updateLoadingStateAction("FETCHING", true));
    const { token } = await authUser(userId);
    const entries = await getMoodEntries(token);
    dispatch(setMoodEntriesAction(entries, userId));
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
  clearMoodEntriesAction,
};
