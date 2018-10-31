import {
  SAVE_PAYMENT,
  PURGE_PAYMENTS,
  DELETE_PAYMENT,
  ADD_DUMMY_DATA
} from "../actions/types";
import { generateMonthData } from "../helpers/payments.helper";
import { Actions } from "react-native-router-flux";
import shortid from "shortid";

const payments = (state = [], action) => {
  const paymentsMap = new PaymentsMap();
  // Sanity check here
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch (action.type) {
    case SAVE_PAYMENT: {
      Actions.appView();
      const payment = { ...action.payload, id: shortid.generate() };
      paymentsMap.addPayment(payment.id, 0);
      return [payment, ...state];
    }
    case DELETE_PAYMENT: {
      return [...state.slice(1)];
    }
    case ADD_DUMMY_DATA: {
      // TODO:
      // convert paylaod to paramter
      // that genereateDummyData takes to create
      // dummy data
      const payload = action.payload;
      const data = [
        ...generateMonthData().map(el => (el = { ...el, id: shortid.generate() })),
        ...state
      ];
      paymentsMap.addPayments(data);
      return data;
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

class PaymentsMap {
  constructor () {
    this.map = {};
  }
  addPayment(id, index) {
    this.map[id] = {
      ...this.map[id],
      index
    }
  }
  addPayments(data) {
    data.forEach((element, index) => this.addPayment(element.id, index));
    this.print();
  }
  removePayment(payment) {
    if (this.map[payment.id]) {
      const index = this.map[payment.id].index;
      delete this.map[payment.id];
      return index;
    }
    return null;
  }
  print() {
    Object.keys(this.map).forEach((key) => console.log(key, this.map[key].index));
  }
}
