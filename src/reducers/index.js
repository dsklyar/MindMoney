import { combineReducers } from "redux";

import payments from "./payments.reducer";
import paymentForm from "./paymentForm.reducer";
import uiState from "./uiState.reducer";

const rootReducer = combineReducers({
  payments: payments,
  paymentForm: paymentForm,
  uiState: uiState
});

export default rootReducer;
