import { SAVE_PAYMENT, PURGE_PAYMENTS } from "../actions/types";
import { Actions } from "react-native-router-flux";
const payments = (state = [], action) => {
  // Sanity check here
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch(action.type) {
    case SAVE_PAYMENT: {
      Actions.appView();
      return [
        action.payload,
        ...state
      ];
    }
    case PURGE_PAYMENTS: {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default payments;
