import { SAVE_PAYMENT, FORM_UPDATED, DEV_FLOATING_ACTIVE } from "./types";

const savePayment = (payment) => {
  return {
    type: SAVE_PAYMENT,
    payload: payment
  };
}
const formChanged = ({ amount, date, comment }) =>  {
  console.log("ti");
  console.log(amount, date, comment);
  return {
    type: FORM_UPDATED,
    payload: {
      amount,
      date,
      comment
    }
  };
}
const devFloatingActivated = () => {
  return {
    type: DEV_FLOATING_ACTIVE
  };
}
export { savePayment, formChanged, devFloatingActivated };