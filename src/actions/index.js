import { SAVE_PAYMENT } from "./types";

const savePayment = (payment) => {
  return {
    type: SAVE_PAYMENT,
    payload: payment
  };
}
export { savePayment };