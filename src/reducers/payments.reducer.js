const def = [
  { id: 1, amount: 1800, date: new Date(), comment: "Payment for October" },
  { id: 2, amount: -100, date: new Date(), comment: "Car payment" },
  { id: 3, amount: -300, date: new Date(), comment: "PS4 Pro Payment" }
];

const payments = (state = def, action) => {
  console.log(action);
  switch(action.type) {
    case "SAVE_PAYMENT": {
      console.log("save?")
      return [
        ...state,
        action.payload
      ];
    }
    default: {
      console.log("return?")
      return state;
    }
  }
};

export default payments;
