import { FORM_UPDATED, FORM_CLEARED } from "../actions/types";

const INITIAL_STATE = {
  amount: "",
  date: "",
  comment: ""
};

const paymentForm = (state = INITIAL_STATE, action) => {
  // Sanity check here
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch(action.type) {
    case FORM_UPDATED: {
      return {
        ...state,
        amount: action.payload.amount,
        date: action.payload.date,
        comment: action.payload.comment
      };
    }
    case FORM_CLEARED: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}

export default paymentForm;