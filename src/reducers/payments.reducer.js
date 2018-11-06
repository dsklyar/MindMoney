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


class PaymentItem {
  constructor(payment) {
    const item = this._checkItem(payment);
    this.date = item.date;
    this.comment = item.comment;
    this.amount = item.amount;
    this.id = shortid.generate();
  }
  _checkItem(item) {
    const TYPES = {
      STRING: {
        name: "string"
      },
      NUMBER: {
        name: "number"
      },
    };
    const ITEM_PROPS = {
      COMMENT: {
        propertyName: "comment",
        required: true,
        type: TYPES.STRING
      },
      AMOUNT: {
        propertyName: "amount",
        required: true,
        type: TYPES.NUMBER
      },
      DATE: {
        propertyName: "date",
        required: true,
        type: TYPES.STRING
      }
    };
    Object.keys(ITEM_PROPS).forEach((key, i) => {
      if (ITEM_PROPS[key].required && _.isNil(item[ITEM_PROPS[key].propertyName])) 
        throw new Error(`Item is missing required property ${ITEM_PROPS[key].propertyName}`);
      if (typeof item[ITEM_PROPS[key].propertyName] !== ITEM_PROPS[key].type.name)
        throw new Error(`Item's property ${ITEM_PROPS[key].name} is of the wrong type of ${typeof item[ITEM_PROPS[key].name]}, instead of ${ITEM_PROPS[key].type.name}`);
    });
    return {
      comment: item.comment,
      date: item.date,
      amount: item.amount,
    };
  }
}

class PaymentsMap {
  constructor () {
    this.dataMap = {};
    this.yearMap = {};
    this.monthMap = {};
    this.mapping = {
      MONTH: "monthMap",
      YEAR: "yearMap"
    }
  }
  addPayment(paymentItem) {
    const item = new PaymentItem(paymentItem);
    console.log(item);
    const { day, month, year } = DateHelper.getDateIdentifiers(item.date);
    const yearId = this._verifyEntry(year, this.mapping.YEAR);
    const monthId = this._verifyEntry(month, this.mapping.MONTH, { yearId });
    this.dataMap[yearId].data[monthId].data[item.id] = item;
  }
  addPayments(data) {
    data.forEach((el) => {
      console.log(el);
      this.addPayment(el);
    });
    console.log("larp");
    this.print();
  }
  getPayments() {
    const years = Object.values(this.yearMap);
    const data = years.reduce((acc, year) => {
      Object.values(this.dataMap[year].data).forEach((month) => {
        acc.push(...Object.values(month.data).reduce((acc, item) => {
          acc.push(item);
          return acc;
        }, []));
      });
      return acc;
    }, []);
    console.log(data);
    return data;
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
  _verifyEntry(item, type, options) {
    if (_.isNil(this.mapping[type])) {
      return (this[type][item]) 
        ? this[type][item] 
        : this._createEntry(item, type, options);
    } else {
      throw new Error(`Cannot verify entry for ${item} type of ${type}`)
    }
  }
  _createEntry(item, type, options = {}) {
    const struct = {
      id: shortid.generate(),
      metadata: {},
      data: {}
    };
    this[type][item] = struct.id;

    (options.yearId) ? this.dataMap[options.yearId].data[struct.id] = struct : this.dataMap[struct.id] = struct;
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
    if (!datefns.isDate(new Date(dateString))) {
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
      paymentsOperator.addPayment(data);
      return paymentsOperator.getPayments();
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
      paymentsOperator.addPayments(generateMonthData());
      return paymentsOperator.getPayments();
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
