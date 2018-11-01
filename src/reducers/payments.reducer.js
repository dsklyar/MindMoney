import {
  SAVE_PAYMENT,
  PURGE_PAYMENTS,
  DELETE_PAYMENT,
  ADD_DUMMY_DATA
} from "../actions/types";
import { generateMonthData } from "../helpers/payments.helper";
import { Actions } from "react-native-router-flux";
import shortid from "shortid";
import _ from "lodash";
import datefns from "date-fns";
import implement, { Interface, type } from "implement-js";

const IPaymentBase = Interface("IPaymentBase")({
  comment: type("string"),
  date: type("string"),
  amount: type("number")
}, {
  error: true
});
const IPaymentIDied = Interface("IPaymentIDied")({
  id: type("string")
}, {
  extend: IPaymentBase,
  error: true
});
const IPaymentMapEntry = Interface("IPaymentMapEntry")({
  id: type("string"),
  data: type("object"),
  metadata: type("object")
}, {
  error: true
});


class PaymentItem {
  constructor(payment) {
    const item = implement(IPaymentBase)(payment);
    if (item) {
      this.date = item.date;
      this.comment = item.comment;
      this.amount = item.amount;
      this.id = shortid.generate();
    }
  }
}

class PaymentsMap {
  constructor () {
    this.dataMap = {};
    this.yearMap = {};
    this.monthMap = {};
    this.mapping = {
      MONTH: this.monthMap,
      YEAR: this.yearMap
    }
  }
  addPayment(paymentItem) {
    const item = implement(IPaymentIDied)(paymentItem);
    if (!item) return;
    const { day, month, year } = DateHelper.getDateIdentifiers(item.date);
    const yearID = this._verifyEntry(year, this.mapping.YEAR);
    const monthID = this._verifyEntry(month, this.mapping.MONTH, yearID);
    this.dataMap[yearID][monthID].data[item.id] = item;
  }
  addPayments(data) {
    data.forEach((element) => this.addPayment(element));
    console.log("larp");
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
    console.log(this.dataMap, this.monthMap, this.yearMap);
  }
  // TODO:
  // refactor to not expect one or the other
  // refactor so that month will create year if missing
  _verifyEntry(item, type, options) {
    if (this.mapping[type]) {
      return (this.mapping[type][item]) ? this.mapping[type][item] : _createEntry(item, type, options);
    } else {
      throw new Error(`Cannot verify entry for ${item} type of ${type}`)
    }
  }
  _createEntry(item, type, options) {
    const struct = implement(IPaymentMapEntry)({
      id: shortid.generate(),
      metadata: {},
      data: {}
    });
    this.mapping[type][item] = struct.id;
    if (options.yearId) {
      this.dataMap[options.yearId][struct.id] = struct;
    } else {
      this.dataMap[struct.id] = struct;
    }
    return struct.id;
  }
}

class DateHelper {
  static getDateIdentifiers(dateString) {
    const date = this._checkDate(dateString);
    return {
      day: datefns.getDay(date),
      month: datefns.getMonth(date),
      year: datefns.getYear(date),
    }
  }
  static getYear(dateString) {
    return datefns.getYear(this._checkDate(dateString));
  }
  static getMonth(dateString) {
    return datefns.getMonth(this._checkDate(dateString));
  }
  static _checkDate(dateString) {
    if (!datefns.isDate(dateString)) {
      throw new Error("String is not a date! [DateHelper]");
    }
    return new Date(dateString);
  }
}

const paymentsOperator = new PaymentsMap();

const payments = (state = [], action) => {
  // Sanity check here
  if (action.type === undefined) {
    throw new Error("Payment reducer recieved an undefined action!");
  }
  switch (action.type) {
    case SAVE_PAYMENT: {
      Actions.appView();
      return [payment, ...state];
    }
    case DELETE_PAYMENT: {
      const data = _.cloneDeep(state);
      if (index) {
        data.splice(index, 1);
      }
      return [...data];
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
      paymentsOperator.addPayments(data);
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
