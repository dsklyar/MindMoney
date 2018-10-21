import { combineReducers } from "redux";
import payments from "./payments.reducer";

const rootReducer = combineReducers({
  payments: payments
});

export default rootReducer;
