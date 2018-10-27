import { SAVE_PAYMENT, FORM_UPDATED, DEV_FLOATING_ACTIVE, FORM_CLEARED } from "./types";

const savePayment = (payment) => {
  return {
    type: SAVE_PAYMENT,
    payload: payment
  };
}
const formChanged = ({ amount, date, comment }) =>  {
  return {
    type: FORM_UPDATED,
    payload: {
      amount,
      date,
      comment
    }
  };
}
const formCleared = () => {
  return {
    type: FORM_CLEARED
  }
}
const devFloatingActivated = () => {
  return {
    type: DEV_FLOATING_ACTIVE
  };
}
export { savePayment, formChanged, devFloatingActivated, formCleared };