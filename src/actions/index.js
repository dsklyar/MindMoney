import {
  SAVE_PAYMENT,
  FORM_UPDATED,
  DEV_FLOATING_ACTIVE,
  FORM_CLEARED,
  DELETE_PAYMENT
} from "./types";

const savePayment = payment => {
  return {
    type: SAVE_PAYMENT,
    payload: payment
  };
};
const deletePayment = payment => {
  return {
    type: DELETE_PAYMENT,
    payload: payment
  };
};
const populateDummyData = data => {
  return {
    type: data.type,
    payload: data.payload
  }
}

const formChanged = ({ amount, date, comment }) => {
  return {
    type: FORM_UPDATED,
    payload: {
      amount,
      date,
      comment
    }
  };
};

const formCleared = () => {
  return {
    type: FORM_CLEARED
  };
};
const devFloatingActivated = () => {
  return {
    type: DEV_FLOATING_ACTIVE
  };
};
export {
  savePayment,
  formChanged,
  devFloatingActivated,
  formCleared,
  deletePayment,
  populateDummyData
};
