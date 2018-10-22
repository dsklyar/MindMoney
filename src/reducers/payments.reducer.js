import { SAVE_PAYMENT } from "../actions/types";
const payments = (state = [], action) => {
  // Sanity check here
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch(action.type) {
    case SAVE_PAYMENT: {
      return [
        ...state,
        action.payload
      ];
    }
    default: {
      return state;
    }
  }
};

export default payments;
