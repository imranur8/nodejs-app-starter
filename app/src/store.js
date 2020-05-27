import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger"
import Reducer from "./reducers/index";

const store = createStore(
  Reducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
  ),
);
export default store;
