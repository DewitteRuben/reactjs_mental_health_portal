import {
  MoodActions,
  MOOD_ACTIONS,
  ISetMoodEntriesAction,
  IUpdateLoadingStateAction,
  ISetMoodErrorAction,
} from "../actions/moodActions";
import { SmileyType } from "../../components/Smiley";

interface IExperience {
  name: string;
  positive: boolean;
}

export interface IMoodEntry {
  entryId: string;
  userId: string;
  date: Date;
  mood: SmileyType;
  emotions: string[];
  experiences: IExperience[];
  hoursOfSleep: number;
  thoughts?: string;
  weight: string;
}

export type IMoodStatus = "IDLE" | "FETCHING" | "FINISHED" | "FAILED";

export interface IMoodStore {
  status: IMoodStatus;
  loading: boolean;
  error?: Error;
  entries: IMoodEntry[];
  userId?: string;
}

const initialState: IMoodStore = {
  userId: undefined,
  status: "IDLE",
  loading: false,
  error: undefined,
  entries: [],
};

const moodReducer = (
  state: IMoodStore = initialState,
  action: MoodActions
): IMoodStore => {
  switch (action.type) {
    case MOOD_ACTIONS.SET_MOOD_ENTRIES_ACTION:
      const { entries, userId } = action as ISetMoodEntriesAction;
      return { ...state, userId, entries, loading: false, status: "FINISHED" };
    case MOOD_ACTIONS.UPDATE_MOOD_LOADING_STATE_ACTION:
      const { loading, status } = action as IUpdateLoadingStateAction;
      return { ...state, loading, status };
    case MOOD_ACTIONS.SET_MOOD_ERROR_ACTION:
      const { error } = action as ISetMoodErrorAction;
      return { ...state, error, loading: false, status: "FAILED" };
    case MOOD_ACTIONS.CLEAR_MOOD_ENTRIES_ACTION:
      return { ...state, entries: [], loading: false, status: "IDLE" };
    default:
      return state;
  }
};

export { moodReducer };
