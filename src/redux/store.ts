import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
});

export type IRootState = ReturnType<typeof reducers>;

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
