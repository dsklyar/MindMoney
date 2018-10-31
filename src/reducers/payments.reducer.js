import { SAVE_PAYMENT, PURGE_PAYMENTS, DELETE_PAYMENT, ADD_DUMMY_DATA } from "../actions/types";
import { generateMonthData } from "../helpers/payments.helper";
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
    case DELETE_PAYMENT: {
      return [
        ...state.slice(1)
      ];
    }
    case ADD_DUMMY_DATA: {
      const payload = action.payload;
      const data = generateMonthData();
      return [
        ...data,
        ...state
      ]
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
