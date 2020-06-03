import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer";
import { moodReducer } from "./reducers/moodReducer";
import { taskReducer } from "./reducers/taskReducer";

const reducers = combineReducers({
  auth: authReducer,
  mood: moodReducer,
  task: taskReducer,
});

export type IRootState = ReturnType<typeof reducers>;

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
