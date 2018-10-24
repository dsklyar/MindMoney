import { FORM_UPDATED } from "../actions/types";

const INITIAL_STATE = {
  amount: "",
  date: "",
  comment: ""
};

const paymentForm = (state = INITIAL_STATE, action) => {
  // Sanity check here
  console.log(action.type);
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch(action.type) {
    case FORM_UPDATED: {
      console.log(action.payload);
      return {
        ...state,
        amount: action.payload.amount,
        date: action.payload.date,
        comment: action.payload.comment
      }
    }
    default: {
      return state;
    }
  }
}

export default paymentForm;